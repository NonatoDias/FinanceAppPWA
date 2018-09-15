<template>
  <div class="list no-border platform-delimiter light-paragraph">
    <template v-for="(parent, index) in links">
      <div class="list-label " :key="index">{{replaceUnderlineToSpace(index)}}</div>
      <template v-for="(child, j_index) in parent.routes">
        <q-drawer-link :key="j_index" :icon="child.materialIcon" :to="{path: child.route, exact: true}">
          {{child.name}}
        </q-drawer-link>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ['links'],
  methods: {
    replaceUnderlineToSpace (text) {
      while (text.indexOf('_') !== -1) {
        text = text.replace('_', ' ')
      }
      return text
    }
  }
}
</script>
<style scoped>
  .list-label:first-child{
    line-height: 50px;
  }
  .router-link-active {
    color: #027be3;
    background-color: #dadada !important;
    border-right: 2px solid #027be3;
  }
  .router-link-active .item-primary{
    color: #027be3;
  }
</style>
