<template>
  <div class="anestor">
    <Loader v-if="isLoading" />
    <router-view @created="isLoading = false" />
  </div>
</template>

<script>
import Loader from '@/packages/loader'

export default {
  name: 'Anestor',

  components: {
    Loader
  },

  data () {
    return {
      isLoading: true
    }
  }
}
</script>

<style>
.anestor {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;  
  justify-content: center;
}
</style>
