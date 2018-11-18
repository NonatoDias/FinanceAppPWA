<template>
  <q-page padding>
    <div class="content-header" style="padding-bottom: 16px">
      <span class="vertical-bottom content-header-title">Relatorio Geral</span>
    </div>
    <div class="report-body bg-white" >
      <p>Distribuição por Categorias</p>
      <apexchart ref="donut" width="350" type="donut" :options="chartOptions" :series="series"></apexchart>
    </div>
  </q-page>
</template>

<script>
import apexchart from 'vue-apexcharts'
export default {
  name: 'Reports',
  data () {
    return {
      chartOptions: {
        labels: ['Green', 'Green', 'Yellow', 'Red'],
        theme: {
          palette: 'palette2'
        }
      },
      series: [11, 32, 45, 32]
    }
  },
  components: {
    apexchart
  }
}
</script>

<style>
  .report-body{
    max-width: 400px;
    padding: 20px;
    text-align: center;
  }
</style>
