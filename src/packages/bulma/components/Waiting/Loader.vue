<template>
  <div v-show="show" class="modal is-active" style="z-index: 99999">
    <div
      class="modal-background"
      style="background-color: rgba(0, 0, 0, 0.1)"
    ></div>
    <Loader size="5rem"/>
  </div>
</template>

<script>
import Loader from '../Loader'

export default {
  name: 'Waiting',

  components: {
    Loader
  },

  data () {
    return {
      show: false
    }
  }
}
</script>
