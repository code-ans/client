<template>
  <a
    class="panel-block"
    style="
      display: flex;
      height: 60px;
      border-left: none;
      border-top: none;
      border-right: none;
    "
  >
    <div>
      <p
        style="white-space: nowrap"
        v-html="item.code"
      />

      <p
        style="white-space: nowrap"
        v-html="item.pick"
      />
    </div>

    <div class="is-flex-auto"></div>

    <div style="width: 80px">
      <p
        style="white-space: nowrap"
        v-html="item.pnd"
      />

      <p
        style="white-space: nowrap"
        v-html="item.position"
      />
    </div>
  </a>
</template>

<script>
export default {
  name: 'CodeItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
