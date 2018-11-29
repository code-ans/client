<template>
  <thead
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
  >
    <th class="is-centered" colspan="7">
      <span>{{name}}</span>
        <a
          v-if="index > 0"
          :class="textClass"
          style="margin-left: 0.5rem"
          @click="$emit('remove', index)"
        >
          <span class="icon is-small">
            <i class="iconfont icon-close"></i>
          </span>
        </a>
        <a
          v-else
          :class="textClass"
          style="margin-left: 0.5rem"
          @click="$emit('add', index)"
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
  name: 'TaskOperatorName',

  props: {
    index: {
      type: Number,
      required: true
    },

    name: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      isHovered: false
    }
  },

  computed: {
    textClass () {
      let color = 'white-ter'

      if (this.isHovered) {
        color = (this.index > 0 ? 'danger' : 'info')
      }

      return 'has-text-' + color
    }
  }
}
</script>
