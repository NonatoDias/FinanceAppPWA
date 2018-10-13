<template>
  <q-modal v-model="opened" maximized>
    <q-modal-layout class="bg-grey-2">
      <div class="layout-padding">
        <div class="div-form-register ">
          <p class="p-info">Formulário para registro de gastos</p>
          <div class="div-form-register-body">
            <q-field
              icon="attach_money"
            >
              <q-input type="number" prefix="R$" float-label="Valor"  v-model="value" />
            </q-field>
            <q-field
              icon="access_time"
            >
              <q-datetime
                float-label="Data"
                v-model="date"
                type="date"
                ok-label="Definir"
              />
            </q-field>
            <q-field
              icon="category"
              helper="Importante para relatórios"
            >
              <q-select
                v-model="category"
                float-label="Categoria"
                radio
                :options="categoryOptions"
              />
            </q-field>
            <q-field
              icon="textsms"
              helper="Pequeno resumo da despeza"
            >
              <q-input
                v-model="description"
                float-label="Descrição"
                type="text"
              />
            </q-field>
            <div class="div-form-register_buttons">
              <q-btn flat rounded  size="md" color="primary" icon="cancel" label="cancelar" @click="cancel()"/>
              <q-btn rounded size="md" color="primary" icon="add" label="Adicionar"  @click="confirm()" />
            </div>
          </div>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
export default {
  data () {
    return {
      opened: false,
      date: new Date(),
      value: 0,
      description: '',
      category: null,
      categoryOptions: [
        {
          label: 'Google',
          value: 'goog'
        },
        {
          label: 'Facebook',
          value: 'fb'
        }
      ]
    }
  },
  methods: {
    open () {
      this.opened = true
    },
    confirm () {
      this.opened = false
    },
    cancel () {
        this.opened = false
    },
    backBtnCallback () {
      if (this.opened) {
        this.cancel()
      }
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      if (from.path === '/' && this.opened) {
        this.opened = false
        next(false)
      } else {
        next()
      }
    })
  }
}
</script>

<style scoped>
.q-field-helper{
  text-align: left;
}
.div-form-register{
  background: white;
  max-width: 600px;
  box-shadow: 0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);
}

.div-form-register-body{
  padding: 0px 10px 20px;
}

.p-info{
  text-align: center;
  padding-top: 20px;
  padding-bottom: 15px;
  margin: 0px;
  font-size: 1.1em;
  /* background-color: #26A69A;
  color: white;*/
}

.div-form-register_buttons{
  text-align: center;
  margin-top: 20px;
}

</style>
