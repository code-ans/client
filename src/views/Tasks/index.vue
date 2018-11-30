<template>
  <div
    class="full-container is-flex is-flex-column"
    style="padding: 0.5rem"
  >
    <div
      class="tabs"
      style="margin: -0.5rem -0.5rem 0.5rem -0.5rem"
    >
      <ul>
        <li
          :class="$route.path === '/tasks' && 'is-active'"
          @click="$router.push({ name: 'task list' })"
        >
          <a>Tasks</a>
        </li>
        <li
          v-if="$router.hasMatched({ name: 'task create' })"
          :class="$router.hasMatched({ name: 'task create' }) && 'is-active'"
          @click="$router.push({ name: 'task create' })"
        >
          <a>Create</a>
        </li>
        <li
          v-if="$router.hasMatched({ name: 'task detail' })"
          :class="$router.hasMatched({ name: 'task detail' }) && 'is-active'"
        >
          <a>Detail</a>
        </li>
      </ul>
    </div>

    <router-view
      :item="items.data[$route.params.id]"
      :codes="codes"
      @add="handleTaskAdd"
      @save="handleTaskSave"
    />

    <template v-if="$route.path === '/tasks'" >
      <div class="is-flex">
        <div class="buttons has-addons" style="margin-bottom: 0">
          <a
            class="button"
            @click="$router.push({ name: 'task create' })"
          >
            <span class="icon">
              <i class="iconfont icon-create-item"></i>
            </span>
            <span>Add</span>
          </a>

          <a
            class="button"
            @click="$wait(handleClickDelete)"
            :disabled="selectStatus === false"
          >
            <span class="icon">
              <i class="iconfont icon-delete"></i>
            </span>
            <span>Delete</span>
          </a>
        </div>

        <div style="width: 0.5rem"></div>

        <div class="field has-addons">
          <div class="control">
            <input
              type="text" class="input"
              :value="params.query"
              @input="params.query = $event.target.value.trim()"
              @keypress.enter="handleSearch"
            >
          </div>
          <div class="control">
            <a
              class="button is-info"
              @click="handleSearch"
            >
              <span class="icon">
                <i class="iconfont icon-search"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <Loader v-if="isLoading.length" />

      <template v-else>
        <div class="is-flex-auto">
          <div class="table-container">
            <table class="table is-nowrapped is-bordered is-fullwidth">
              <thead>
                <td
                  style="width: 1px; cursor: pointer"
                  @click="handleClickSelect"
                >
                  <Checkbox :value="selectStatus"/>
                </td>
                <th class="is-centered">Operation</th>
                <th>Discription</th>
                <th>Plant</th>
                <th>Area</th>
                <th>Cost Center</th>
                <th>Work Load</th>
                <th>Utilization</th>
                <th>Time</th>
                <th>Created At</th>
              </thead>
              <tbody>
                <TaskItem
                  v-for="id in items.list" :key="id"
                  v-bind="items.data[id]"
                  @select="handleSelectTask"
                />
              </tbody>
            </table>
          </div>
        </div>
      </template>

      <div style="margin-top: 0.5rem">
        <Pagination
          :page="items.page"
          :total="items.total"
          :perPage="items.perPage"
          @change-page="handleChangePage"
        />
      </div>
    </template>
  </div>
</template>

<script>
import axios from '@/packages/axios'
import { sleep } from '@/utils/async'
import Pagination from '@/components/Pagination'

import TaskItem from './Item'

export default {
  name: 'CodeManage',

  components: {
    TaskItem,
    Pagination
  },

  data () {
    return {
      page: 1,
      query: '',
      perPage: 50,

      items: {
        list: [],
        data: {},
        page: 1,
        total: 0,
        perPage: 50,
      },

      codes: {
        list: [],
        data: {}
      },

      isLoading: []
    }
  },

  computed: {
    params () {
      const res = {}
      const { page, perPage, query } = this

      res.page = page
      res.perPage = perPage
      if (query !== '') {
        res.query = query
      }

      return res
    },

    selectStatus () {
      let hasSelectedItem = false
      let hasNotSelectedItem = false

      for (let key in this.items.data) {
        const code = this.items.data[key]

        if (code.isSelected === true) {
          hasSelectedItem = true
        } else {
          hasNotSelectedItem = true
        }

        if (hasSelectedItem && hasNotSelectedItem) {
          return 'minus'
        }
      }

      if (hasSelectedItem) return true
      else return false
    },

    selectedItems () {
      const res = []
      this.items.list.forEach(id => {
        const item = this.items.data[id]
        item.isSelected && res.push(item)
      })

      return res
    }
  },

  methods: {
    getTasks () {
      this.isLoading.push(0)
      axios.post('tasks/search', this.params)
        .then(response => {
          const data = {}
          const list = []
          const dataSource = response.data
          dataSource.data.forEach(item => {
            list.push(item.id)
            item.isSelected = false
            data[item.id] = item
          })

          this.items = {
            data, list,
            page: dataSource.page,
            total: dataSource.total,
            perPage: dataSource.perPage
          }
        })
        .finally(() => this.isLoading.pop())
    },

    getCodes () {
      this.isLoading.push(0)
      axios.post('codes/search')
        .then(response => {
          const data = {}
          const list = []
          response.data.forEach(item => {
            list.push(item.code)
            data[item.code] = item
          })

          this.codes = { data, list }
        })
        .finally(() => this.isLoading.pop())
    },

    handleClickSelect () {
      const items = this.items.list.map(id => this.items.data[id])

      switch (this.selectStatus) {
        case 'minus':
        case false:
          items.forEach(item => item.isSelected = true)
          break
        case true:
          items.forEach(item => item.isSelected = false)
      }
    },

    handleSelectTask (id) {
      const item = this.items.data[id]

      item.isSelected = !item.isSelected
    },

    handleClickDelete () {
      const ids = this.selectedItems.map(item => item.id)

      if (ids.length === 0) return

      const callback = () => {
        ids.forEach(id => {
          this.items.list.splice(this.items.list.indexOf(id), 1)
          this.$delete(this.items.data, id)
        })
      }

      return axios.post('tasks/delete', { ids })
        .then(callback).catch(error => console.log(error))
    },

    handleTaskAdd (task) {
      this.items.list.unshift(task.id)
      task.isSelected = false

      this.$set(this.items.data, task.id, task)
    },

    handleTaskSave (task) {
      this.$set(this.items.data, task.id, task)
    },

    handleChangePage (page) {
      this.page = page
      this.getTasks()
    },

    handleSearch () {
      this.page = 1
      this.getTasks()
    }
  },

  async created () {
    this.getCodes()
    this.getTasks()

    try {
      this.isLoading.push(0)
      await sleep(666)
    } finally {
      this.isLoading.pop()
    }
  }
}
</script>
