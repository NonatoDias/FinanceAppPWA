<template>
    <q-modal v-model="opened" >
        <q-modal-layout class="bg-grey-2">
            <header id="id-modal-header" class="bg-primary" style="min-height: 20px;"></header>
            <div class="layout-padding bg-white">
                <div class="div-form-register ">
                    <p class="p-info">Adicionar Meta</p>
                    <div class="div-form-register-body">
                        <q-field
                            class="q-field-higher"
                            :error="$v.goal.amount.$error"
                            error-label="Este campo é obrigatório!"
                            >
                            <q-input
                                ref="invalue"
                                type="number"
                                :autofocus="true"
                                float-label="Valor"
                                v-model="goal.amount"
                                :step="0.01"
                                :after="[
                                    {
                                        icon: 'attach_money'
                                    }
                                ]"/>
                        </q-field>
                        <q-field
                            class="q-field-higher"
                            :error="$v.goal.dt_start.$error"
                            error-label="Este campo é obrigatório!"
                            >
                            <q-datetime
                                float-label="Data inicial"
                                v-model="goal.dt_start"
                                type="date"
                                ok-label="Definir"
                            />
                        </q-field>
                        <q-field
                            class="q-field-higher"
                            :error="$v.goal.dt_end.$error"
                            error-label="Este campo é obrigatório!"
                            >
                            <q-datetime
                                float-label="Data final"
                                v-model="goal.dt_end"
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
import { required } from 'vuelidate/lib/validators'
export default {
    data () {
        return {
            opened: false,
            goal: {
                date: new Date(),
                value: null,
                description: '',
                category: null
            }
        }
    },
    methods: {
        open () {
            this.opened = true
            this.goal = {
                amount: 0,
                dt_end: new Date(),
                dt_start: new Date()
              }
        },
        getDataGoal () {
            return {
                amount: this.goal.amount,
                dt_end: this.goal.dt_end,
                dt_start: this.goal.dt_start
            }
        },
        confirm () {
            this.$v.goal.$touch()
            if (this.$v.goal.$error) { // Error
                this.$q.notify('Por favor, revise os campos novamente!')
                return
            }
            this.$restAPI.post({
                req: 'goal',
                action: 'addgoal',
                data: this.getDataGoal()
            }).then((resp) => {
                this.opened = false
                this.$emit('addedGoal')
            }).catch(() => {
                this.$emit('errorNotAdded')
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
        }
    },
    validations: {
        goal: {
            amount: { required },
            dt_end: { required },
            dt_start: { required }
        }
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
