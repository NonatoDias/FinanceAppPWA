<template>
    <div class="card-custom inline-block">
        <q-card >
            <q-card-main class=" text-white" :class="backgroundColor">
            <div class="row">
                <div class="col-7  items-center">
                    <p class="p-title text-italic "><i class="material-icons icon-size"> mood_bad </i>{{title}}</p>
                    <h5 class="h5-card-content" ref="number2" >
                        {{totalToday || 0}}
                    </h5>
                </div>
                <div class="col-5  items-center" >
                    <p class="p-title text-italic "><i class="material-icons icon-size"> attach_money </i>{{title2}}</p>
                    <h5 class="h5-card-content" ref="number">
                    {{total}}
                    </h5>
                </div>
                <!--div  class="col-12  items-center">
                    <h5 class="h5-card-content" style="text-align: left"  v-for="(text, i) in lines" :key="i">
                        <i style="font-size: 20px; padding-right: 5px;" class="material-icons"> monetization_on </i> {{text}}
                    </h5>
                </div-->
            </div>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
export default {
    props: ['title', 'title2', 'lines', 'total', 'totalToday', 'backgroundColor', 'iconName']
}
</script>

<style scoped>
.card-icon{
  font-size: 54px;
}
.card-custom{
  width: 33.3333%;
  padding: 1rem 0 0 1rem;
}

.card-custom:first-child{
  padding-left: 0;
}

.card-custom > .q-card{
    width: 100%;
}

.h5-card-content{
  margin: 0px;
  text-align: center;
}

.icon-size{
    font-size: 35px;
    padding-right: 10px;
}

.p-title{
    margin-bottom: 5px;
}

@media screen and (max-width: 768px){
    .card-custom{
        width: 100%;
        padding: 1rem 0 0 0rem;
    }

    .card-custom{
        padding-top: 0;
    }

}
</style>
