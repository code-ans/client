<template>
  <thead
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
  >
    <th colspan="7">
      <span>{{type}}</span>
      <a
        v-show="isHovered"
        style="margin-left: 0.5rem"
        @click="$emit('add')"
      >
        <span class="icon is-small">
          <i class="iconfont icon-plus"></i>
        </span>
      </a>
    </th>
  </thead>
</template>

<script>
export default {
  name: 'TaskOperatorCodeType',

  props: {
    type: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      isHovered: false
    }
  }
}
</script>
