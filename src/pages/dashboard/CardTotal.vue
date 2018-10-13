<template>
    <div class="card-custom inline-block">
        <q-card >
            <q-card-main class=" text-white" :class="backgroundColor">
            <div class="row">
                <div class="col-4 items-center">
                <q-icon class="card-icon" :name="iconName"></q-icon>
                </div>
                <div class="col-8  items-center">
                <p class="text-italic ">{{title}}</p>
                    <h5 class="h5-card-content" ref="number">
                    {{total}}
                    </h5>
                </div>
            </div>
            </q-card-main>
        </q-card>
    </div>
</template>

<script>
export default {
    props: ['title', 'total', 'backgroundColor', 'iconName']
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
}

@media screen and (max-width: 768px){
    .card-custom{
        width: 100%;
        padding: 1rem 0 0 0rem;
    }

    .card-custom:first-child{
        padding-top: 0;
    }

}
</style>
