<template>
  <div class="layout-padding ">
    <div class="flex wrap gutter">
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Meta"
          background-color="bg-teal-7"
          icon-name="sentiment_very_satisfied"
          :total="goal">
        </cardTotal>
      </div>
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Gastos Mês SETEMBRO"
          background-color="bg-red"
          icon-name="mood_bad"
          :total="totalWasted">
        </cardTotal>
      </div>
      <div class="width-1of3 sm-auto">
        <cardTotal
          title="Saldo total"
          background-color="bg-teal-5"
          icon-name="attach_money"
          :total="balance">
        </cardTotal>
      </div>
    </div>
    
    <div class="flex wrap gutter">
      <div class="width-4of5 sm-width-1of1">
        <card-todo
          card-title="Últimos lançamentos"
          api="todos">
        </card-todo>
      </div>
    </div>
    <button @click="add" class="primary circular absolute-bottom-right btn-floating-padding" >
      <i class="material-icons">add</i>
    </button>
  </div>
</template>
<script type="text/javascript">
  import cardTotal from './cardTotal.vue'
  import router from 'configs/router'
  import cardTodo from './cardTodo.vue'
  import { Dialog } from 'quasar'
  import { mapMutations } from 'vuex'
  export default {
    name: 'Home',
    mounted () {
      this.setLayoutNeeded(true)

      // Axios.all not working
      Promise.all([
        this.$http.jsonplaceholder.get('posts'),
        this.$http.jsonplaceholder.get('comments'),
        this.$http.jsonplaceholder.get('todos')
      ])
        .then(response => {
          this.setPosts(response[0].data)
          this.totalWasted = response[0].data.length
          this.goal = response[1].data.length
          this.totalTodos = response[2].data.length
          this.balance = this.goal - this.totalWasted
        })
    },
    data () {
      return {
        balance: 0,
        totalWasted: 0,
        goal: 0,
        totalTodos: 0
      }
    },
    computed: {
      dataForGraph () {
        return {
          posts: this.totalWasted,
          todos: this.totalTodos,
          comments: this.goal
        }
      }
    },
    methods: {
      ...mapMutations(['setPosts', 'setLayoutNeeded']),
      add () {
        Dialog.create({
          title: 'Despeza',
          message: 'Registre aqui o valor do gasto',
          form: {
            value: {
              type: 'numeric',
              label: 'Valor',
              model: 0
            }
          },
          buttons: [
            'Cancel',
            {
              label: 'Ok',
              handler (data) {
                router.push('/spending-register')
              }
            }
          ]
        })
      }
    },
    components: {
      cardTotal,
      cardTodo
    }
  }
</script>
<style>
  .btn-floating-padding{
    right: 15px;
    bottom: 15px;
  }

  .modal-body .q-numeric{
    width: 190px;
  }

  @media screen and (min-width: 1000px) {
    .btn-floating-padding{
      right: 30px;
      bottom: 20px;
    }
  }

</style>
