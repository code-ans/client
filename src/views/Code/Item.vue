<template>
  <tr>
    <td
      style="cursor: pointer"
      @click="$emit('select', id)"
    >
      <Checkbox :value="isSelected" />
    </td>
    <td class="is-editable">{{code}}</td>
    <td class="is-editable">{{pick}}</td>
    <td class="is-editable">{{pnd}}</td>
    <td class="is-editable">{{position}}</td>
    <td class="is-editable">{{tmu1}}</td>
    <td class="is-editable">{{tmu2}}</td>
    <td class="is-editable">{{tmu3}}</td>
  </tr>
</template>

<script>
export default {
  name: 'CodeItem',

  props: {
    id: Number,

    code: {
      type: String,
      required: true
    },

    pick: {
      type: String,
      required: true
    },

    pnd: {
      type: String,
      required: true
    },

    position: {
      type: String,
      required: true
    },

    tmu1: {
      type: Number,
      required: true
    },

    tmu2: {
      type: Number,
      required: true
    },

    tmu3: {
      type: Number,
      required: true
    },

    isSelected: {
      type: Boolean,
      required: true
    }
  }
}
</script>
