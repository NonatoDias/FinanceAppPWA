<template>
  <q-page padding>
    <!-- content -->
    <div class="content-header">
      <span class="vertical-bottom content-header-title">Página Inicial</span>
    </div>
    <div>
      <cardTotal
        title="Meta"
        background-color="bg-teal-7"
        icon-name="sentiment_very_satisfied"
        :total="5">
      </cardTotal>
      <cardTotal
        title="Gastos do Mês"
        background-color="bg-red-6"
        icon-name="mood_bad"
        :total="5">
      </cardTotal>
      <cardTotal
        title="Saldo total"
        background-color="bg-teal-5"
        icon-name="attach_money"
        :total="5">
      </cardTotal>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="lg"
        color="primary"
        icon="add"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import CardTotal from './CardTotal.vue'
export default {
  // name: 'PageName',
  components: {
    CardTotal
  }
}
</script>

<style scoped>

</style>
