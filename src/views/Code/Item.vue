<template>
  <tr>
    <td
      style="cursor: pointer"
      @click="code.isSelected = !code.isSelected"
    >
      <Checkbox :value="code.isSelected" />
    </td>
    <td class="is-editable">{{code.pickAndPosition}}</td>
    <td class="is-editable">{{code.code}}</td>
    <td class="is-editable">{{code.TMU * 1 * 10}}</td>
    <td class="is-editable">{{code.TMU * 2 * 10}}</td>
    <td class="is-editable">{{code.TMU * 3 * 10}}</td>
    <td class="is-editable">{{code.description}}</td>
  </tr>
</template>

<script>
export default {
  name: 'CodeItem',

  props: {
    index: Number,
    code: {
      type: Object,
      required: true
    }
  }
}
</script>
