<template>
  <div class="card">
    <div class="flex wrap gutter">
      <div class="width-1of2 lg-width-1of3 sm-auto">
        <card-chart
          card-title="Total Graph"
          :data="dataForGraph"
        ></card-chart>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import cardChart from './reportChart.vue'
  export default {
    name: 'Reports',
    data () {
      return {
        totalPosts: 0,
        totalComments: 0,
        totalTodos: 0
      }
    },
    computed: {
      dataForGraph () {
        return {
          posts: this.totalPosts,
          todos: this.totalTodos,
          comments: this.totalComments
        }
      }
    },
    components: {
      cardChart
    },
    methods: {
    }
  }
</script>
<style></style>
