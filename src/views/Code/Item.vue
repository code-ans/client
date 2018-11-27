<template>
  <tr>
    <td
      style="cursor: pointer"
      @click="code.isSelected = !code.isSelected"
    >
      <Checkbox :value="code.isSelected" />
    </td>
    <td class="is-editable">{{code.code}}</td>
    <td class="is-editable">{{code.description}}</td>
    <td class="is-editable">{{code.time}}</td>
    <td class="is-editable">{{code.TMU}}</td>
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
