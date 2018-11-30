<template>
  <div
    class="app-level level has-border-bottom"
    style="margin-bottom: 0"
  >
    <div class="level-left">
      <div
        class="app-logo title is-unselectable"
        @click="$router.push('/')"
      >
        LOGO
      </div>
    </div>

    <div class="level-right">
      <p
        class="level-item"
        v-for="item in rightItemList" :key="item.text"
      >
        <component
          v-text="item.text"
          @click="$router.push({ name: item.route })"
          :is="$router.hasMatched({ name: item.route }) ? 'strong' : 'a'"
        />
      </p>
      <div style="width: 0.5rem"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import bulma from '@/packages/bulma/components'

Vue.use(bulma)

export default {
  name: 'Topbar',

  data () {
    return {
      rightItemList: [
        { text: 'Task', route: 'task list' },
        { text: 'Code', route: 'code list' }
      ]
    }
  },

  created () {
    this.$emit('created')
  }
}
</script>

<style src="@/packages/bulma/sass/index.sass" lang="sass"></style>

<style>
.app-level {
  height: 3.5rem;
  margin-bottom: 0;
  padding-left: 0.5rem;
}
.app-logo {
  cursor: pointer
}
</style>
