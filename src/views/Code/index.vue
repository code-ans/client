<template>
  <div
    class="full-container is-flex is-flex-column"
    style="padding: 0.5rem"
  >
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
            <td
              style="width: 1px; cursor: pointer"
              @click="handleClickSelect"
            >
              <Checkbox :value="selectStatus"/>
            </td>
            <th>Code</th>
            <th>Description</th>
            <th>Time</th>
            <th>TMU</th>
          </thead>
          <tbody>
            <CodeItem
              v-for="id in codes.list" :key="id"
              :code="codes.data[id]"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import CodeItem from './Item'

export default {
  name: 'CodeManage',

  components: {
    CodeItem
  },

  data () {
    return {
      codes: {
        list: [],
        data: {}
      }
    }
  },

  computed: {
    selectStatus () {
      let hasSelectedItem = false
      let hasNotSelectedItem = false

      for (let key in this.codes.data) {
        const code = this.codes.data[key]

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
    initialize () {
      // 假数据
      const list = []
      const data = {}

      for (let i = 0; i < 100; i++) {
        list.push(i)

        data[i] = {
          id: i,
          code: 'Code ' + i,
          description: 'Code Description ' + i,
          time: i / 250,
          TMU: i
        }

        data[i].isSelected = false
      }

      this.codes = {
        list, data
      }
    },

    handleClickSelect () {
      const codes = this.codes.list.map(id => this.codes.data[id])

      switch (this.selectStatus) {
        case 'minus':
        case false:
          codes.forEach(code => code.isSelected = true)
          break
        case true:
          codes.forEach(code => code.isSelected = false)
      }
    }
  },

  created () {
    this.initialize()
  }
}
</script>
