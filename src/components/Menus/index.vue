<template>
  <div
    class="menu-container"
    :style="{
      'width': _width,
      'min-width': _width,
      'max-width': _width
    }"
  >
    <div class="menu-list">
      <MenuItem
        v-for="menu in menus" :key="menu.text"
        v-bind="menu"
      />
    </div>
  </div>
</template>

<script>
import MenuItem from './item'

export default {
  name: 'Menus',

  components: {
    MenuItem
  },

  render (h) {
    return h(
      'div',
      { class: 'menu-list' },
      this.menus.map(menu => {
        return h(
          MenuItem,
          {
            props: menu
          }
        )
      })
    )
  },

  data () {
    return {
      isActive: false,
      isExpanding: true
    }
  },

  computed: {
    _width () {
      return this.isExpanding ? this.width : 0
    }
  },

  props: {
    menus: {
      type: Array,
      required: true
    },

    hasToggler: {
      type: Boolean,
      default: false
    },

    width: {
      type: String,
      default: '280px'
    }
  }
}
</script>
