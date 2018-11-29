<template>
  <tr
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
  >
    <EditableCell
      class="is-centered"
      :value="code_and_distance"
      @input="$emit('update', {
        prop: 'code_and_distance',
        value: $event
      })"
    />
    <EditableCell
      class="is-centered"
      :value="frequence"
      @input="$emit('update', {
        prop: 'frequence',
        value: $event
      })"
    />
    <EditableCell
      class="is-centered"
      :value="divider"
      @input="$emit('update', {
        prop: 'divider',
        value: $event
      })"
    />
    <td
      v-text="type"
    />
    <td class="is-centered">{{description}}</td>
    <td class="is-centered">{{time}}</td>
    <td
      @click="$emit('remove')"
    >
      <a
        class="icon"
        :class="'has-text-' + (isHovered ? 'danger' : 'white')"
      >
        <strong>
          <i class="iconfont icon-close"></i>
        </strong>
      </a>
    </td>
  </tr>
</template>

<script>
import EditableCell from './EditableCell'

export default {
  name: 'TaskOperatorCodeRow',

  components: {
    EditableCell
  },

  props: {
    codeLib: {
      type: Object,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    code_and_distance: {
      type: String,
      required: true
    },

    frequence: {
      type: [Number, String],
      required: true
    },

    divider: {
      type: [Number, String],
      required: true
    },

    type: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      isHovered: false
    }
  },

  computed: {
    code () {
      return this.code_and_distance.substring(0, 2)
    },

    distance () {
      const distance = this.code_and_distance[2]
      if (
        !isNaN(parseInt(distance)) &&
        distance >= 1 && distance <= 3
      ) return distance

      return false
    },

    matchedCode () {
      return this.codeLib[this.code]
    },

    description () {
      if (!this.matchedCode) return ''

      const code = this.matchedCode
      let res = 'Pick Pnd Position; '
      res += code.pick + '; ' + code.pnd + '; ' + code.position

      if (this.distance) {
        res += '; distance: ' + this.distance
      }

      return res
    },

    time () {
      if (this.matchedCode && this.distance) {
        return this.matchedCode['tmu' + this.distance]
      }

      return ''
    }
  },

  methods: {
    handleChange ({prop, value}) {
      this.$emit('update', { prop, value })
    }
  }
}
</script>
