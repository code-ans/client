<template>
  <div>
    test
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },

  methods: {
    handleInput (event) {
      const value = event.target.innerText

      this.value = ''
      this.value = value
    }
  }
}
</script>
