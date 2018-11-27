<template>
  <div class="app">
    <router-view name="topbar"/>
    <router-view class="is-flex-auto"/>
  </div>
</template>

<script>
export default {

}
</script>

<style src="@/packages/bulma/sass/index.sass" lang="sass"></style>

<style lang="sass">
.app
  height: 100vh
  display: flex
  flex-flow: column
</style>
