<template>
  <div class="toolbar" v-show="getLayoutNeeded">
    <q-ajax-bar color="#80cbc4"></q-ajax-bar>
    <!-- <router-link :to="'/'" v-if="$router.currentRoute.meta.backButton">
      <button>
        <i>arrow_back</i>
      </button>
    </router-link> -->
    <button class="hide-on-drawer-visible" @click="leftDrawer.open()" >
      <i>menu</i>
    </button>
    <q-toolbar-title :padding="1">
      <img src="statics/dinheiro-40.png" alt="" srcset=""> <span class="span-page_title"> Finanpe</span>
    </q-toolbar-title>
    <div class="right-itens">
      <!--<message-popover></message-popover>
      <a @click="setMobileMode(true)" class="text-white gt-sm inline">
        <i class="fa fa-3x fa-mobile"></i>
      </a>
      <a href="https://github.com/odranoelBR/vue-quasar-admin-example" class="text-white">
        <i class="fa fa-2x fa-github"></i>
      </a>-->
    </div>
  </div>
</template>
<script type="text/javascript">
  import { mapMutations, mapGetters } from 'vuex'
  import messagePopover from './messagePopover.vue'
  export default {
    computed: {
      ...mapGetters(['getLayoutNeeded']),
      leftDrawer () {
        return this.$parent.$children[1].$refs.leftDrawer
      }
    },
    methods: {
      ...mapMutations(['setMobileMode'])
    },
    components: {
      messagePopover
    }
  }
</script>
<style scoped>
  .span-page_title{
    top: -12px;
    position: relative;
    left: 5px;
  }

  .toolbar{
    min-height: 60px;
    background-color: #1565C0;
    
  }
  .right-itens a, .right-itens button{
    margin-right: 10px;
  }
</style>
