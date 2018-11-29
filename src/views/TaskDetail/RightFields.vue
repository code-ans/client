<template>
  <div style="width: 280px; height: 100%; overflow: auto; padding-right: 0.5rem">
    <div
      class="field"
      v-for="field in primaryFields"
      :key="field.prop"
    >
      <label class="label">
        {{field.text}}
      </label>
      <div class="control">
        <input
          type="text"
          class="input"
          :value="$props[field.prop]"
          @input="$emit('update', {
            prop: field.prop,
            value: $event.target.value
          })"
        >
      </div>
    </div>

    <label class="label">
      Type
    </label>

    <div
      class="is-bordered"
      style="overflow: auto; border-bottom: none"
    >
      <div class="is-panel">
        <a
          class="panel-block"
          style="border-top: none; border-right: none; border-left: none;"
          v-for="(item, key) in typeList" :key="key"
          @click="$emit('update', {
            prop: 'type',
            value: item
          })"
        >
          <Radio :value="type === item"/>
          <span style="margin-left: 0.25rem; white-space: nowrap">
            {{item}}
          </span>
        </a>
      </div>
    </div>

    <div style="height: 0.5rem"></div>

    <div
      class="field"
      v-for="field in timeFields"
      :key="field.prop"
    >
      <label class="label">
        {{field.text}}
      </label>
      <div class="control">
        <input
          type="text"
          class="input"
          :value="$props[field.prop] || ''"
          @input="handleUpdateTime({
            prop: field.prop,
            value: $event.target.value
          })"
        >
      </div>
    </div>

    <div class="field">
      <div class="control">
        <a
          class="button"
          v-for="button in submitButtons" :key="button.mode"
          @click="$emit(button.event)"
          v-show="mode === button.mode"
        >
          <span class="icon">
            <i :class="'iconfont icon-' + button.icon"></i>
          </span>
          <span>{{button.text}}</span>
        </a>

        <a
          class="button"
          style="margin-left: 0.5rem"
          @click="handleReport"
        >
          <span>Report</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetailRightFields',

  props: {
    mode: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    plant: {
      type: String,
      required: true
    },

    area: {
      type: String,
      required: true
    },

    cost_center: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    welding_time: {
      type: [String, Number],
      required: true
    },

    turning_time: {
      type: [String, Number],
      required: true
    },

    setup_time: {
      type: [String, Number],
      required: true
    }
  },

  data () {
    return {
      typeList: [
        'Single Station',
        'Turning Station (Simple)',
        'Turning Station (Complex)',
        'Coverage Station'
      ],

      primaryFields: [
        { prop: 'description', text: 'Description' },
        { prop: 'plant', text: 'Plant' },
        { prop: 'area', text: 'Area' },
        { prop: 'cost_center', text: 'Cost Center' }
      ],

      timeFields: [
        { prop: 'welding_time', text: 'Welding Time' },
        { prop: 'turning_time', text: 'Turning Time' },
        { prop: 'setup_time', text: 'Setup Time' }
      ],

      submitButtons: [
        { mode: 'create', text: 'Create', icon: 'create-item', event: 'create' },
        { mode: 'update', text: 'Save', icon: 'save', event: 'save' }
      ]
    }
  },

  methods: {
    handleUpdateTime ({prop, value}) {
      this.$emit('update', { prop, value })

      value = parseFloat(value)
      if (isNaN(value)) {
        value = 0
      }

      setTimeout(() => {
        this.$emit('update', { prop, value })
      }, 0)
    },

    handleReport () {
      this.$wait(() => {})
    }
  }
}
</script>
