<template>
  <div>
    <div class="layout-padding media-control">
      <div class="row wrap gutter justify-center" style="display: inline-block;">
  
<div class="card-item">
    <div class="card bg-white">
        <img src="statics/food.jpg">
        <div class="card-content">
            Card Content
        </div>
        <div class="card-actions card-no-top-padding">
            <div class="auto"></div>
            <button class="primary small"><i class="on-left">directions</i> Selecionar</button>
        </div>
    </div>
</div>


<div class="card-item">
    <div class="card bg-white">
        <img src="statics/cars.jpg">
        <div class="card-content">
            Card Content
        </div>
        <div class="card-actions card-no-top-padding">
            <div class="auto"></div>
            <button class="primary small"><i class="on-left">directions</i> Selecionar</button>
        </div>
    </div>
</div>


<div class="card-item">
    <div class="card bg-white">
        <img src="statics/health.jpg">
        <div class="card-content">
            Card Content
        </div>
        <div class="card-actions card-no-top-padding">
            <div class="auto"></div>
            <button class="primary small"><i class="on-left">directions</i> Selecionar</button>
        </div>
    </div>
</div>

<div class="card-item">
    <div class="card bg-white">
        <img src="statics/shopping.jpg">
        <div class="card-content">
            Card Content
        </div>
        <div class="card-actions card-no-top-padding">
            <div class="auto"></div>
            <button class="primary small"><i class="on-left">directions</i> Selecionar</button>
        </div>
    </div>
</div>


<div class="card-item">
    <div class="card bg-white">
        <img src="statics/travel.jpg">
        <div class="card-content">
            Card Content
        </div>
        <div class="card-actions card-no-top-padding">
            <div class="auto"></div>
            <button class="primary small"><i class="on-left">directions</i> Selecionar</button>
        </div>
    </div>
</div>


<div class="card-item">
    <div class="card bg-white">
        <img src="statics/education.jpg">
        <div class="card-content">
            Card Content 2
        </div>
        <div class="card-actions card-no-top-padding">
            <div class="auto"></div>
            <button class="primary small"><i class="on-left">directions</i> Selecionar</button>
        </div>
    </div>
</div>




      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  /* eslint-disable */
  import { QCard } from 'quasar'
  export default {
    name: 'SpendingRegister',
    data () {
      return {
        cardType: 'Vertical One',
        
      }
    },
    components: {
      QCard
    },
    computed: {
      
    },
    methods: {
      
    }
  }
</script>
<style scoped>
.card-item{
  float: left;
}

.card {
    max-width: 260px;
  }

.card > img {
    height: 130px;
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

  .card > img {
    height: auto !important;
  }

  .card {
    max-width: 100%;
  }
}



</style>
