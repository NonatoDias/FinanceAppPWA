<template>
  <q-page padding>
    <div class="content-header" style="padding-bottom: 16px">
      <span class="vertical-bottom content-header-title">Relatorio Geral</span>
    </div>
    <div class="report-body bg-white" >
      <div v-if="series && series.length > 0">
        <h4 class="report-title">Distribuição por Categorias</h4>
        <h5 class="report-subtitle">(Somente despesas registradas online)</h5>
        <apexchart :height="height" :width="width" ref="donut" type="donut" :options="chartOptions" :series="series"></apexchart>
        <ul class="report-ranking-ul">
          <li :key="index" v-for="(item, index) in chartOptions.labels">
            {{item}}
            <span class="sum">
              {{series[index]}}
            </span>
          </li>
        </ul>
      </div>
      <div v-else>
        Nenhuma despesa registrada
      </div>
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
        labels: [],
        theme: {
          palette: 'palette1'
        }
      },
      height: 290,
      width: 380,
      series: []
    }
  },
  methods: {
    getEsxpensesByCategory () {
      this.$restAPI.get({
          req: 'expense',
          action: 'getexpensesbycategory'
      }).then((data) => {
        this.expensesByCategory = data.expensesByCategory
        let _reprt = data.expensesByCategory.sort((a, b) => {
          return b.sum - a.sum
        }).reduce((prev, curr) => {
          if (!prev.labels) prev.labels = []
          if (!prev.series) prev.series = []

          prev.labels.push(curr.name)
          prev.series.push(curr.sum)
          return prev
        }, {})
        this.chartOptions.labels = _reprt.labels
        this.series = _reprt.series
      })
    }
  },
  mounted () {
    this.getEsxpensesByCategory()
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
    overflow-x: auto;
  }
  .report-title{
    font-size: 21px;
    margin: 15px 10px 0px 10px;
  }
  .report-subtitle{
    font-size: 13px;
    margin: -10px 10px 10px 10px;
  }

  .report-ranking-ul{
    list-style-type: decimal;
    text-align: left;
    margin-top: -10px;
    font-size: 0.959em;
    max-width: 200px;
  }

  .report-ranking-ul li{
    padding-left: 5px;
    padding-bottom: 10px;
  }

  .report-ranking-ul li > .sum{
    float: right;
  }

  @media screen and (max-width: 480px){
    .report-body{
      padding: 20px 10px;
    }
  }
</style>
