<template>
  <q-modal v-model="opened" >
    <q-modal-layout class="bg-grey-2">
      <header id="id-modal-header" class="bg-primary" style="min-height: 20px;"></header>
      <div class="layout-padding bg-white">
        <div class="div-form-register ">
          <p class="p-info">Adicionar despesa</p>
          <div class="div-form-register-body">
            <q-field
              class="q-field-higher"
            >
              <q-input
                type="number"
                float-label="Valor"
                v-model="expense.value"
                :after="[
                  {
                    icon: 'attach_money'
                  }
                ]"/>
            </q-field>
            <q-field
              class="field-margin"
              helper="Pequeno resumo da despeza"
            >
              <q-input
                v-model="expense.description"
                float-label="Descrição"
                type="text"
                :after="[
                  {
                    icon: 'textsms'
                  }
                ]"
              />
            </q-field>
            <q-field
              helper="Importante para relatórios"
            >
              <q-select
                v-model="expense.category"
                float-label="Categoria"
                radio
                :options="categoryOptions"
              />
            </q-field>
            <q-field
            >
              <q-datetime
                float-label="Data"
                v-model="expense.date"
                type="date"
                ok-label="Definir"
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
            expense: {
                date: new Date(),
                value: null,
                description: '',
                category: null
            },
            categoryOptions: [
                {
                    label: 'Alimentação',
                    value: '1'
                },
                {
                    label: 'Transporte',
                    value: '2'
                },
                {
                    label: 'Saúde',
                    value: '3'
                },
                {
                    label: 'Lazer',
                    value: '4'
                }
            ]
        }
    },
    methods: {
        open () {
            this.opened = true
        },
        confirm () {
            this.$restAPI.post({
                req: 'expense',
                action: 'addexpense',
                data: {
                    value: this.expense.value,
                    date: this.expense.date,
                    description: this.expense.description,
                    category_id: this.expense.category
                }
            }).then((resp) => {
                this.opened = false
            }).catch(() => {
                this.opened = false
            })
        },
        cancel () {
            this.opened = false
        },
        backBtnCallback () {
            if (this.opened) {
                this.cancel()
            }
        },
        loadCategories () {
            console.log('categorias')
        }
    },
    created () {
        this.loadCategories()
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

#id-modal-header{
  display: none;
}

.field-margin{
  margin-bottom: 10px;
}

.q-field-helper{
  text-align: left;
}
.div-form-register{
  background: white;
  margin: auto;
  min-width: 400px;
  /*box-shadow: 0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);*/
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
  margin-top: 30px;
}

@media screen and (max-width: 760px){
  #id-modal-header{
    display: block;
  }
}

@media screen and (max-width: 460px){
  .layout-padding{
    padding-top: 0.5em;
  }

  .div-form-register{
    box-shadow: none;
    min-width: 100%;
  }

  .div-form-register-body{
    padding: 0px 25px 10px;
  }
}

</style>
