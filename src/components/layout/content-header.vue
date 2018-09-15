<template>
  <div class="content-header" v-if="!getIsLoginPage">
    <span id="content-header-title" class="vertical-bottom">{{routerTitle}}</span>
  </div>
</template>
<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getIsLoginPage', 'getMenuCollapse']),
      routerTitle () {
        return this.$route.meta.name
      }
    },
    methods: {
      ...mapMutations(['setLayoutNeeded', 'setMenuCollapse'])
    }
  }
</script>


<style scoped>
  .list {
    min-height: 120px;
  }
  #configurations {
    position: absolute;
    right: 65px;
    top: 7px;
  }
  .content-header {
    position: relative;
    padding: 1em 4em 0em 4em;
  }
  @media screen and (max-width: 600px){
    .content-header {
      padding: 1.5em .5em;
    }
    #configurations {
      position: absolute;
      right: 8px;
      top: 12px;
    }
  }
  #content-header-title {
    font-size: 22px;
    font-weight: 300;
  }
</style>
