<template>
  <span :class="spanClass">
    <i v-if="value" class="iconfont icon-radio-checked"/>
    <i v-else class="iconfont icon-radio"/>
  </span>
</template>

<script>
export default {
  props: {
    value: {},
    disabled: Boolean
  },

  computed: {
    spanClass () {
      let color = 'info'

      if (this.disabled) color = 'grey-lighter'
      else if (!this.value) color = 'grey-light'

      return [
        'icon',
        'has-text-' + color
      ]
    }
  },

  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('input', this.value)
      }

      this.$emit('click')
    }
  }
}
</script>
