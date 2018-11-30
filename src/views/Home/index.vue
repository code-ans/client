<template>
  <div class="app">
    <TheTopbar @created="isMounted = true"/>

    <Loader delay="500" v-if="!isMounted"/>

    <div v-else class="full-container has-background is-flex">
      <MenuList :menus="menus" width="220px"/>
      <router-view class="is-flex-auto" />
    </div>
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
      isMounted: false,
      menus: [
        {
          text: 'Code Library',
          icon: 'code',
          route: { name: 'code' }
        },
        {
          text: 'Task Manage',
          icon: 'tasks',
          route: { name: 'tasks' }
        }
      ]
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
