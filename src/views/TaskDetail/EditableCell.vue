<template>
  <td
    class="is-editable"
    contenteditable="true"
    v-html="input"
    @focus="isFocused = true"
    @blur="isFocused = false"
    @input="$emit('input', $event.target.innerText.trim())"
    ref="node"
  />
</template>

<script>
export default {
  name: 'EditableCell',

  props: {
    value: {
      required: true
    }
  },

  data () {
    return {
      input: this.value,
      isFocused: false
    }
  },

  watch: {
    value: {
      handler (value) {
        if (!this.isFocused) {
          this.input = this.value
        }
      }
    }
  }
}
</script>
