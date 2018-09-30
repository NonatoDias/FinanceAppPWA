<template>
  <div>
    <div class="layout-padding media-control">
      <div class="row wrap gutter justify-center" style="display: inline-block;">
        <div class="card-item" v-for="(spendingType, index) in spendingTypeData" :key="index">
            <component :is="componentCardType" 
                :img="spendingType.img"
                :title="spendingType.title"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable */
  import cardSpendingTypeOne from './cardSpendingTypeOne.vue'
  import cardSpendingTypeTwo from './cardSpendingTypeTwo.vue'  
  import {mapMutations} from 'vuex'
  export default {
    name: 'SpendingRegister',
    mounted () {
      this.setLayoutNeeded(false)
    },
    beforeDestroy () {
      this.setLayoutNeeded(true)
    },
    data () {
      return {
        fullWidth: document.documentElement.clientHeight,
        spendingTypeData: [
          {
            title: 'Alementação',
            img: 'statics/spending/food.jpg'
          },
          {
            title: 'Compras',
            img: 'statics/spending/shopping.jpg'
          },
          {
            title: 'Viagens',
            img: 'statics/spending/travel.jpg'
          },
          {
            title: 'Escola/Faculdade',
            img: 'statics/spending/education.jpg'
          },
          {
            title: 'Transporte',
            img: 'statics/spending/cars.jpg'
          },
          {
            title: 'Saúde',
            img: 'statics/spending/health.jpg'
          }
        ]
      }
    },
    components: {
      cardSpendingTypeOne,
      cardSpendingTypeTwo
    },
    computed: {
      componentCardType () {
        // return this.fullWidth > 600 ? 'cardSpendingTypeOne' : 'cardSpendingTypeTwo';
        return 'cardSpendingTypeOne';
      }
    },
    methods: {
      ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),
      handleResize (event) {
        this.fullWidth = document.documentElement.clientWidth
      }
    },
    ready: function () {
        // window.addEventListener('resize', this.handleResize)
    },
    beforeDestroy: function () {
        // window.removeEventListener('resize', this.handleResize)
    }
  }
</script>
<style scoped>
.card-item{
  float: left;
}


@media screen and (min-width: 1700px){
  .layout-padding.media-control{
      width: 1260px;
      float: left;
  }
}

@media screen and (max-width: 1700px){
  .layout-padding.media-control{
      width: 960px;
      float: left;
  }
}

@media screen and (max-width: 1200px){
  .layout-padding.media-control{
      width: 700px;
      float: left;
  }
}

@media screen and (max-width: 700px){
  .layout-padding.media-control{
    width: 100%;
  }
}
</style>
