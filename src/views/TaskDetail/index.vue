<template>
  <div class="full-container is-flex-auto is-flex">
    <TheRightFields
      :mode="mode"
      v-bind="task"
      @save="$wait(handleSave)"
      @create="$wait(handleCreate)"
      @update="handleUpdateTask"
    />

    <Loader v-if="isLoading" />

    <template v-else>
      <div
        class="is-flex is-flex-column"
        style="width: 300px; height: 100%"
      >
        <nav class="panel" style="margin-bottom: 0">
          <div
            class="panel-block has-text-grey"
            style="font-size: 1rem;"
          >
            <label class="label">
              Codes
            </label>
          </div>

          <div class="panel-block" style="border-bottom: none">
            <p class="control has-icons-left">
              <input
                class="input"
                type="text"
              >
              <span class="icon is-left">
                <i class="iconfont icon-search" aria-hidden="true"></i>
              </span>
            </p>
          </div>
        </nav>

        <div class="is-bordered" style="overflow: auto">
          <div class="is-panel">
            <CodeItem
              v-for="code in codes.list" :key="code"
              :item="codes.data[code]"
            />
          </div>
        </div>
      </div>

      <div
        class="is-flex-auto"
        style="
          display: flex;
          flex-flow: row;
          overflow: auto;
          margin-left: 0.5rem;
        "
      >
          <TaskOperator
            :style="index !== task.operators.length - 1 && 'margin-right: 0.5rem'"
            v-for="(operator, index) in task.operators" :key="index"
            v-bind="operator"
            :index="index"
            :codeLib="codes.data"
            @add="handleAddOperator"
            @remove="handleRemoveOperator"
            @add-code="handleAddOperatorCode"
            @remove-code="handleRemoveOperatorCode"
            @update-code="handleUpdateOperatorCode"
          />
      </div>
    </template>
  </div>
</template>

<script>
import axios from '@/packages/axios'
import cloneDeep from 'lodash/cloneDeep'

import CodeItem from './CodeItem'
import TaskOperator from './TaskOperator'
import TheRightFields from './RightFields'

export default {
  name: 'TaskDetail',

  components: {
    CodeItem,
    TaskOperator,
    TheRightFields
  },

  props: {
    item: {
      type: Object
    },

    codes: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isLoading: false,

      task: {
        id: 0,
        description: '',
        plant: '',
        area: '',
        cost_center: '',
        type: 'Single Station',
        welding_time: 0,
        turning_time: 0,
        setup_time: 0,
        operators: [ this.initOperator(1) ]
      }
    }
  },

  computed: {
    mode () {
      return this.task.id === 0 ? 'create' : 'update'
    }
  },

  methods: {
    initCodeItem () {
      return {
        id: 0,
        code_and_distance: '',
        frequence: '',
        divider: '',
        type: ''
      }
    },

    initOperator (num = 1) {
      const initCodeBlock = (size) => {
        return Array.apply(null, Array(size)).map(() => this.initCodeItem())
      }

      return {
        name: 'Operator ' + num,
        codes: {
          in_door: initCodeBlock(3),
          wait_process: initCodeBlock(3),
          out_door: initCodeBlock(3),
          wait_till_end: initCodeBlock(1)
        }
      }
    },

    handleAddOperator (key) {
      const len = this.task.operators.length

      if (len === 1) {
        this.task.operators.push(this.initOperator(len + 1))
      }
    },

    handleRemoveOperator (key) {
      this.task.operators.splice(key, 1)
    },

    handleAddOperatorCode ({key, type}) {
      this.task.operators[key]
        .codes[type].push(this.initCodeItem())
    },

    handleRemoveOperatorCode ({index, key, type}) {
      const codes = this.task.operators[index].codes[type]
      if (codes.length > 1) {
        codes.splice(key, 1)
      }
    },

    handleUpdateOperatorCode ({index, key, type, prop, value}) {
      this.task.operators[index].codes[type][key][prop] = value
    },

    handleUpdateTask ({prop, value}) {
      this.task[prop] = value
    },

    handleSave () {
      const params = {
        id: this.task.id,
        data: this.task
      }

      const callback = response => {
        this.$emit('save', cloneDeep(this.task))
        this.$message.success('success')
      }

      return axios.post('tasks/update', params)
        .then(callback).catch(error => console.log(error))
    },

    handleCreate () {
      const params = { data: this.task }
      const callback = response => {
        const { id } = response.data

        this.task.id = id

        // todo
        this.task.created_at = ''

        this.$emit('add', cloneDeep(this.task))
        this.$message.success('success')
      }

      return axios.post('tasks/create', params)
        .then(callback).catch(error => console.log(error))
    }
  },

  watch: {
    item: {
      immediate: true,
      handler (value) {
        if (!value) return

        this.task = cloneDeep(value)
      }
    }
  },

  created () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 666)
  }
}
</script>
