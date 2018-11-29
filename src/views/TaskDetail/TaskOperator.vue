<template>
  <table class="table is-narrow is-bordered is-fullwidth is-nowrapped">
    <TaskOperatorName
      :index="index"
      :name="name"
      v-on="$listeners"
    />
    <thead>
      <th style="width: 1px">Code</th>
      <th style="width: 1px">Frequence</th>
      <th style="width: 1px">Divider</th>
      <th style="width: 1px">Type</th>
      <th class="is-centered">Description</th>
      <th style="width: 1px">Time</th>
      <th style="width: 1px"></th>
    </thead>

    <template v-for="type in codeTypeList">
      <TaskOperatorCodeType
        :key="type.prop + 'head'"
        :type="type.text"
        @add="$emit('add-code', {
          key: index,
          type: type.prop
        })"
      />
      <tbody :key="type.prop + 'body'">
        <TaskOperatorCodeRow
          v-for="(code, key) in codes[type.prop]" :key="key"
          v-bind="code"
          :total="codes[type.prop].length"
          :codeLib="$attrs.codeLib"
          @remove="$emit('remove-code', {
            key, index,
            type: type.prop
          })"
          @update="$emit('update-code', {
            key, index,
            type: type.prop,
            prop: $event.prop,
            value: $event.value
          })"
        />
      </tbody>
    </template>
  </table>
</template>

<script>
import TaskOperatorName from './TaskOperatorName'
import TaskOperatorCodeRow from './TaskOperatorCodeRow'
import TaskOperatorCodeType from './TaskOperatorCodeType'

export default {
  name: 'TaskOperator',

  components: {
    TaskOperatorName,
    TaskOperatorCodeRow,
    TaskOperatorCodeType
  },

  props: {
    index: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true
    },

    codes: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isHovered: false,

      codeTypeList: [
        { prop: 'out_door', text: 'Out Door' },
        { prop: 'wait_process', text: 'Wait Process' },
        { prop: 'in_door', text: 'In Door' },
        { prop: 'wait_till_end', text: 'Wait Till End' }
      ]
    }
  }
}
</script>
