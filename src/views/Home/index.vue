<template>
  <div class="app">
    <TheTopbar @created="isMounted = true"/>

    <Loader delay="500" v-if="!isMounted"/>

    <router-view v-else class="is-flex-auto" />
  </div>
</template>

<script>
import MenuList from '@/components/Menus'

export default {
  name: 'Home',

  components: {
    MenuList,
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
  width: 100vw
  height: 100vh
  display: flex
  flex-flow: column
</style>
