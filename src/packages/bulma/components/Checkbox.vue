<template>
  <span
    class="icon"
    @click="$emit('click')"
    style="cursor: pointer;"
  >
    <i v-if="value === true"
      :class="`has-text-${color}`"
      class="iconfont icon-checkbox-checked"
    ></i>
    <i v-else-if="value === 'minus'"
      :class="`has-text-${color}`"
      class="iconfont icon-checkbox-minus"
    ></i>
    <i v-else-if="value === false"
      class="iconfont icon-checkbox-empty has-text-grey"
    ></i>
  </span>
</template>

<script>
export default {
  model: {
    prop: 'value'
  },

  props: {
    value: {
      default: true
    },

    disabled: Boolean
  },

  computed: {
    color () {
      return this.disabled ? 'grey-light' : 'info'
    }
  }
}
</script>
