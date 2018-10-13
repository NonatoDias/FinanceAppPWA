<template>
  <q-modal v-model="opened" maximized>
    <q-modal-layout>
      <div class="layout-padding">
        <div class="div-form-register ">
          <p class="p-info">Formulário para registro de gastos</p>
          <q-field
            :count="16"
            icon="attach_money"
          >
            <q-input type="number" prefix="R$" float-label="Valor"  v-model="num" />
          </q-field>
          <q-field
            icon="attach_money"
            helper="Valor da despesa"
          >
            <q-datetime
              float-label="Data"
              v-model="date"
              type="date"
              ok-label="Definir"
            />
          </q-field>
          <q-field
            icon="attach_money"
            helper="Valor da despesa"
          >
            <q-select
              v-model="select"
              float-label="Categoria"
              radio
              :options="selectOptions"
            />
          </q-field>
          <q-field
            icon="attach_money"
            helper="Valor da despesa"
          >
            <q-input
              v-model="num"
              float-label="Descrição"
              type="text"
            />
          </q-field>
           <div class="div-form-register_buttons">
            <q-btn flat rounded  size="md" color="primary" icon="cancel" label="cancelar" @click="cancel()"/>
            <q-btn outline rounded size="md" color="primary" icon="add" label="Adicionar"  @click="confirm()" />
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
      num: 4,
      select: { label: 'Monday', value: 'monday' },
      selectOptions: [
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

<style>

</style>
