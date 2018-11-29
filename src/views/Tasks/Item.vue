<template>
  <tr>
    <td
      style="cursor: pointer"
      @click="$emit('select', id)"
    >
      <Checkbox :value="isSelected" />
    </td>
    <td class="is-centered">
      <a
        class="has-text-info"
        @click="$router.push({
          name: 'task detail',
          params: { id }
        })"
      >
        Detail
      </a>
    </td>
    <td>{{description}}</td>
    <td>{{plant}}</td>
    <td>{{area}}</td>
    <td>{{cost_center}}</td>
    <td></td>
    <td></td>
    <td></td>
    <td>{{created_at}}</td>
  </tr>
</template>

<script>
export default {
  name: 'TaskItem',

  props: {
    id: {
      type: Number,
      required: true
    },

    isSelected: {
      type: Boolean,
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

    created_at: {
      type: String,
      required: true
    }
  }
}
</script>
