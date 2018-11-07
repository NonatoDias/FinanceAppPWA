<template>
    <q-page padding>
        <!-- content -->
        <div class="content-header">
            <span class="vertical-bottom content-header-title">Página Inicial</span>
        </div>
        <div>
        <card-total
            class="hide-mobile"
            title="Meta"
            background-color="bg-teal-7"
            icon-name="sentiment_very_satisfied"
            :total="'25 R$ por dia'">
        </card-total>
        <card-total
            class="hide-mobile"
            title="Despezas de hoje"
            background-color="bg-blue"
            icon-name="mood_bad"
            :total="totalExpensesToday">
        </card-total>
        <card-total
            class="hide-mobile"
            title="Despezas totais"
            background-color="bg-teal-5"
            icon-name="attach_money"
            :total="totalExpenses">
        </card-total>
        <card-total-mobile
            class="show-mobile"
            title="Despezas de hoje"
            title2="TOTAL"
            background-color="bg-teal-5"
            icon-name="sentiment_very_satisfied"
            :total="totalExpenses"
            :totalToday="totalExpensesToday"
            :lines="['META: 25 R$ por dia']">
        </card-total-mobile>
        </div>
        <div style="margin-top: 20px;">
            <mainList :expenses="expenses"></mainList>
        </div>
        <add-expenses-modal ref="dialog"
            v-on:addedExpense="loadExpenses"
            v-on:errorNotAdded="loadExpenses"
        ></add-expenses-modal>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
                round
                size="lg"
                color="primary"
                icon="add"
                @click="addValue"
            />
        </q-page-sticky>
    </q-page>
</template>

<script>
import CardTotalMobile from './CardTotalMobile.vue'
import CardTotal from './CardTotal.vue'
import MainList from './MainList.vue'
import AddExpensesModal from './AddExpensesModal.vue'
export default {
    name: 'DashOne',
    data () {
        return {
            isExpensesOpend: true,
            expenses: [],
            categories: [],
            totalExpenses: 0,
            totalExpensesToday: 0
        }
    },
    methods: {
        addValue () {
            this.$refs.dialog.open()
        },
        loadCategories () {
            this.$restAPI.get({
                req: 'category',
                action: 'getall'
            }).then((data) => {
                this.categories = data.categories
            })
        },
        getOfflineExpenses () {
            return this.$offlineStorage.get('offlineExpenses', [])
        },
        dateToString: function (value) {
            if (!value) return ''
            value = value.toString()
            return new Date(value).toLocaleString()
        },
        loadExpenses () {
            this.$restAPI.get({
                req: 'expense',
                action: 'getall',
                data: {
                    month: new Date().getMonth() + 1
                }
            }).then((data) => {
                let auxArray = []
                let auxTotal = 0
                let auxTotalToday = 0

                // Tratamento offline
                this.getOfflineExpenses().forEach((offExps, i) => {
                    const test = data.expenses.every((exp2, j) => {
                        if (!(
                            offExps.value === exp2.value &&
                            offExps.description === exp2.description &&
                            offExps.category_id === exp2.category_id &&
                            this.dateToString(offExps.date) === this.dateToString(exp2.date))
                        ) {
                            return true
                        }
                        return false
                    })
                    if (test) {
                        auxArray.push(offExps)
                        auxTotal += offExps.value
                        if (new Date(offExps.date).toDateString() === new Date().toDateString()) {
                            auxTotalToday += offExps.value
                        }
                    }
                })
                this.$offlineStorage.set('offlineExpenses', auxArray)

                // Merge dos dados
                this.expenses = [...auxArray, ...data.expenses]
                this.totalExpenses = data.total + auxTotal
                this.totalExpensesToday = data.totalToday ? data.totalToday + auxTotalToday : 0
            })

            if (navigator.onLine === false) {
                this.$q.notify({
                    message: 'Sem internet. App funcionando no modo offline!',
                    color: 'tertiary',
                    icon: 'wifi_off'
                })
            }
        }
    },
    mounted () {
        this.loadCategories()
        this.loadExpenses()
    },
    components: {
        CardTotal,
        MainList,
        AddExpensesModal,
        CardTotalMobile
    }
}
</script>

<style scoped>
.show-mobile{
    display: none !important;
}
@media screen and (max-width: 600px){
    .hide-mobile{
        display: none !important;
    }
    .show-mobile{
        display: inline-block !important;
    }
}
</style>
