<template>
  <div class="full-container has-background is-flex">
    <MenuList :menus="menus" width="200px"/>
    <router-view class="is-flex-auto" />
  </div>
</template>

<script>
import MenuList from '@/components/Menus'

export default {
  components: {
    MenuList
  },

  data () {
    return {
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
