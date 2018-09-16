<template>
    <div>
        <div class="card bg-white">
            <img :src="img">
            <div class="card-content">
                {{title}}
            </div>
            <div class="card-actions card-no-top-padding">
                <div class="auto"></div>
                <button class="secondary small" @click="add()"><i class="item-primary">add</i> Registrar</button>
            </div>
        </div>
    </div>
</template>


<script type="text/javascript">
  import { Dialog } from 'quasar'
  export default {
    props: ['title', 'img'],
    methods: {
      add () {
        Dialog.create({
          title: 'Valor do gasto',
          form: {
            name: {
              type: 'textbox',
              label: 'Valor',
              model: ''
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler (data) {
              }
            }
          ]
        })
      }
    }
  }
</script>
<style scoped>

.card {
    max-width: 260px;
  }

.card > img {
    height: 130px;
}
@media screen and (max-width: 700px){
  .card > img {
    height: auto !important;
  }

  .card {
    max-width: 100%;
  }
}

</style>
