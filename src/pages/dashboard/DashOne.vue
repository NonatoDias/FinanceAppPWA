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
        title="Saldo total"
        background-color="bg-teal-5"
        icon-name="attach_money"
        :total="5">
      </card-total>
    </div>
    <div style="margin-top: 20px;">
      <mainList></mainList>
    </div>
    <add-expenses-modal ref="dialog"></add-expenses-modal>
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
      isExpensesOpend: true
    }
  },
  methods: {
    addValue () {
      console.log(this.$refs.dialog.open())
    }
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
