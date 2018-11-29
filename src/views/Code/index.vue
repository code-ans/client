<template>
  <div
    class="full-container is-flex is-flex-column"
    style="padding: 0.5rem"
  >
    <Loader v-if="isLoading.length"/>
    <template v-else>
      <div class="is-flex">
        <div class="buttons has-addons" style="margin-bottom: 0">
          <a class="button">
            <span class="icon">
              <i class="iconfont icon-create-item"></i>
            </span>
            <span>Add</span>
          </a>

          <a class="button">
            <span class="icon">
              <i class="iconfont icon-save"></i>
            </span>
            <span>Save</span>
          </a>

          <a
            class="button"
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
            <input type="text" class="input">
          </div>
          <div class="control">
            <a class="button is-info">
              <span class="icon">
                <i class="iconfont icon-search"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="is-flex-auto">
        <div class="table-container">
          <table class="table is-bordered is-fullwidth">
            <thead>
              <th colspan="5"></th>
              <th class="is-centered" colspan="4">TMU</th>
            </thead>
            <thead>
              <td
                style="width: 1px; cursor: pointer"
                @click="handleClickSelect"
              >
                <Checkbox :value="selectStatus"/>
              </td>
              <th>Code</th>
              <th>Pick</th>
              <th>Pnd</th>
              <th>Position</th>
              <th style="width: 1px">1</th>
              <th style="width: 1px">2</th>
              <th style="width: 1px">3</th>
            </thead>
            <tbody>
              <CodeItem
                v-for="(id, key) in items.list" :key="id"
                :index="key"
                v-bind="items.data[id]"
                @select="handleItemSelect"
              />
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from '@/packages/axios'
import { sleep } from '@/utils/async'

import CodeItem from './Item'

export default {
  name: 'Codes',

  components: {
    CodeItem
  },

  data () {
    return {
      items: {
        list: [],
        data: {}
      },

      isLoading: []
    }
  },

  computed: {
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
    }
  },

  methods: {
    getCodes () {
      this.isLoading.push(0)
      axios.post('codes/search')
        .then(response => {
          const data = {}
          const list = []
          response.data.forEach(item => {
            list.push(item.id)

            item.isSelected = false
            data[item.id] = item
          })

          this.items = { data, list }
        })
        .finally(() => this.isLoading.pop())
    },

    handleItemSelect (id) {
      const item = this.items.data[id]
      item.isSelected = !item.isSelected
    },

    handleClickSelect () {
      const items = this.items.list.map(id => this.items.data[id])

      switch (this.selectStatus) {
        case 'minus':
        case false:
          items.forEach(code => code.isSelected = true)
          break
        case true:
          items.forEach(code => code.isSelected = false)
      }
    }
  },

  async created () {
    this.getCodes()

    try {
      this.isLoading.push(0)
      await sleep(666)
    } finally {
      this.isLoading.pop()
    }
  }
}
</script>
