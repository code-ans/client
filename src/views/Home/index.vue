<template>
  <div class="app">
    <TheTopbar @created="isMounted = true"/>

    <router-view v-if="isMounted"/>

    <Loader delay="500" v-else />
  </div>
</template>

<script>
export default {
  name: 'Home',

  components: {
    TheTopbar: () => import('./Topbar')
  },

  data () {
    return {
      isMounted: false
    }
  }
}
</script>

<style lang="sass">
.app
  height: 100vh
  display: flex
  flex-flow: column
</style>
