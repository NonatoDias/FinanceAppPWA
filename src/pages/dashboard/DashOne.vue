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
        :total="5">
      </card-total>
      <card-total
        class="hide-mobile"
        title="Gastos do Mês"
        background-color="bg-red-6"
        icon-name="mood_bad"
        :total="5">
      </card-total>
      <card-total
        title="Gastos totais"
        background-color="bg-teal-5"
        icon-name="attach_money"
        :total="totalExpenses">
      </card-total>
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
import CardTotal from './CardTotal.vue'
import MainList from './MainList.vue'
import AddExpensesModal from './AddExpensesModal.vue'
export default {
  name: 'DashOne',
  data () {
    return {
      isExpensesOpend: true,
      expenses: [],
      totalExpenses: 0
    }
  },
  methods: {
    addValue () {
      console.log(this.$refs.dialog.open())
    },
    loadExpenses () {
      this.$restAPI.get({
          req: 'expense',
          action: 'getall'
      }).then((data) => {
          this.expenses = data.expenses
          this.totalExpenses = data.total
      })
    }
  },
  mounted () {
    this.loadExpenses()
  },
  components: {
    CardTotal,
    MainList,
    AddExpensesModal
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px){
  .hide-mobile{
    display: none !important;
  }
}
</style>
