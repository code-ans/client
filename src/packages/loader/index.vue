<template>
  <VueLoading
    type="spin"
    :style="style"
  />
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'Loader',

  components: {
    VueLoading
  },

  props: {
    color: {
      default: '#118fe4'
    },

    size: {
      default: '4rem'
    }
  },

  computed: {
    style () {
      return {
        'fill': this.color,
        'width': this.size,
        'height': this.size,
        'padding-top': this.marginTop
      }
    }
  }
}
</script>
