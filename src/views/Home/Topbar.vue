<template>
  <div
    class="level has-border-bottom"
    style="
      height: 3.5rem;
      margin-bottom: 0;
      padding-left: 0.5rem;
    "
  >
    <div class="level-left">
      <div
        class="title is-unselectable"
        @click="$router.push('/')"
        style="cursor: pointer"
      >
        LOGO
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Topbar',

  created () {
    this.$emit('created')
  }
}
</script>

<style src="@/packages/bulma/sass/index.sass" lang="sass"></style>
