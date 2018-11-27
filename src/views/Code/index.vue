<template>
  <div
    class="full-container is-flex is-flex-column"
    style="padding: 0.5rem"
  >
    <Loader v-if="isLoading"/>
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
              <th colspan="3"></th>
              <th class="is-centered" colspan="3">TMU</th>
              <th></th>
            </thead>
            <thead>
              <td
                style="width: 1px; cursor: pointer"
                @click="handleClickSelect"
              >
                <Checkbox :value="selectStatus"/>
              </td>
              <th>Pick And Position</th>
              <th>Code</th>
              <th style="width: 1px">1</th>
              <th style="width: 1px">2</th>
              <th style="width: 1px">3</th>
              <th>Description</th>
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
    </template>
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
      },

      isLoading: false
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
          pickAndPosition: 'Pick And Position ' + i,
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

    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 333);
  }
}
</script>
