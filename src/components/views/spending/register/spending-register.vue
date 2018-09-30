<template>
  <div>
    <div class="layout-padding media-control">
      <div class="div-form-register ">
        <p class="p-info">Formulário para registro de gastos</p>
        <div class="div-form-register_item">
          <label class="label-item" for="">Valor</label>
          <q-numeric v-model="value" :min="1" :max="999999" ></q-numeric>
        </div>
        <div class="div-form-register_item">
          <label class="label-item" for="">Categoria</label>
          <q-select type="radio" v-model="category" :options="selectOptions" ></q-select>
        </div>
        <div class="div-form-register_item">
          <label class="label-item" for="">Descrição</label>
          <input class="input-item" v-model="description" placeholder="Type something">
        </div>
        <div class="div-form-register_item">
          <label class="label-item" for="">Dia do gasto</label>
          <q-datetime v-model="date" type="date" ok-label="Definir"></q-datetime>
        </div>
        <div class="div-form-register_buttons">
          <button class="light  small " @click="addExpense()">
            Cancelar
          </button>
          <button class="primary  small" @click="addExpense()">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapMutations} from 'vuex'
  export default {
    name: 'SpendingRegister',
    mounted () {
      const w = document.documentElement.clientWidth
      if (w < 600) {
        this.setLayoutNeeded(false)
      }
    },
    beforeDestroy () {
      this.setLayoutNeeded(true)
    },
    data () {
      return {
        fullWidth: document.documentElement.clientHeight,
        value: 1,
        category: 2,
        description: 'Simples gasto',
        date: '2018-09-27',
        selectOptions: [
          {
            label: 'Alimentação',
            value: '1'
          },
          {
            label: 'Transporte',
            value: '2'
          }
        ]
      }
    },
    components: {
    },
    computed: {
    },
    methods: {
      ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),
      addExpense () {
        this.$router.push('/')
      }
    },
    ready: function () {
    }
  }
</script>
<style scoped>
.div-form-register{
  background: white;
  padding: 15px 10px 20px;
  max-width: 600px;
  box-shadow: 0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);
}

.div-form-register_item:not(:last-child){
  padding-bottom: 15px; 
}

.div-form-register_item > div[class^="q-"], .input-item {
  width: 300px;
}

.p-info{
  text-align: center;
}

.label-item{
  width: 140px;
  display: inline-block;
  text-align: right;
  padding-right: 5px;
  color: #027be3;
}

.div-form-register_buttons{
  text-align: center;
}

@media screen and (max-width: 600px){
  .div-form-register{
    margin: auto;
    margin-top: -1.5em;
    /*box-shadow: none;*/
  }

  .label-item{
    width: 110px;
  }
}

@media screen and (max-width: 460px){
  .div-form-register{
    margin-top: -1.5em;
    padding: 15px 25px;
  }

  .label-item{
    text-align: left;
    width: 100%;
  }

  .div-form-register_item > div[class^="q-"], .input-item {
    width: 100%;
  }
}
</style>
