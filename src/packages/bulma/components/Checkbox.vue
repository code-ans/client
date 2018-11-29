<template>
  <label
    :class="labelClass"
    :style="labelStyle"
    @click="handleClick">
    <span
      :class="spanClass">
      <i :class="'iconfont icon-' + iconName"/>
    </span>
    <slot/>
  </label>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    disabled: Boolean,
    value: [Boolean, String]
  },

  computed: {
    iconName () {
      switch (this.value) {
        case true:
          return 'checkbox-checked'
        case false:
          return 'checkbox-empty'
        case 'minus':
          return 'checkbox-minus'
      }

      return false
    },

    labelClass () {
      return [
        'checkbox',
        this.disabled && 'has-text-grey-light'
      ]
    },

    labelStyle () {
      return {
        display: this.inline ? 'inline' : 'block'
      }
    },

    spanClass () {
      let color = 'info'

      if (this.disabled) color = 'grey-lighter'
      else if (this.value === false) color = 'grey-light'

      return [
        'icon',
        'has-text-' + color
      ]
    }
  },

  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('input', Boolean(!this.value))
      }

      this.$emit('click')
    }
  }
}
</script>
