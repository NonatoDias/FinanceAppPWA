<template>
  <q-page padding>
    <div class="content-header" style="padding-bottom: 16px">
      <span class="vertical-bottom content-header-title">Minhas metas</span>
    </div>
    <div class="bg-white" style="max-width: 800px">
      <q-list class="bg-white" style="text-align: center">
        <q-list-header>Listagem de todas metas (Dados online)</q-list-header>
        <q-item-separator />
        <template v-for="(goal, item) in goals">
            <q-item :separator="true" :key="item" :class="goal.id ? '': 'offline-item'">
                <q-item-side>
                  <q-item-tile>
                    {{item + 1}}
                  </q-item-tile>
                </q-item-side>
                <q-item-main>
                  <q-item-tile>
                    {{goal.amount + ' reais'}}
                  </q-item-tile>
                  <q-item-tile sublabel>
                    <span v-html="getLabel(goal)"></span>
                  </q-item-tile>
                </q-item-main>
                <q-item-tile>
                  {{goal.is_active ? 'Ativado' : ''}}
                  <q-btn :style="'margin-left: 5px;'" icon="check_circle" size="sm" color="primary" @click="setAsActive(goal)" rounded/>
                  <q-btn :style="'margin-left: 5px;'" icon="clear" size="sm" color="red-5" @click="deleteGoal(goal)" rounded/>
                </q-item-tile>
            </q-item>
        </template>
      </q-list>
    </div>
    <add-goal-modal ref="dialog"
            v-on:addedGoal="loadGoals"
            v-on:errorNotAdded="loadGoals"
    ></add-goal-modal>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        size="lg"
        color="primary"
        icon="add"
        @click="addGoal"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import AddGoalModal from './AddGoalModal.vue'
export default {
  name: 'myGoals',
  data () {
    return {
      goals: [
      ]
    }
  },
  methods: {
    addGoal () {
      this.$refs.dialog.open()
    },
    setAsActive (goal) {
      this.$restAPI.post({
        req: 'goal',
        action: 'setasactive',
        data: {
          id: goal.id
        }
      }).then((data) => {
        this.loadGoals()
      })
    },
    loadGoals () {
      this.$restAPI.get({
        req: 'goal',
        action: 'getall'
      }).then((data) => {
        this.goals = data.goals
      })
    },
    getLabel (goal) {
      return (
        new Date(goal.dt_start).toLocaleDateString() +
        ' - ' + (goal.is_active ? '<br>' : '') +
        new Date(goal.dt_end).toLocaleDateString()
      )
    },
    deleteGoal (goal) {
      if (goal.is_active) {
        this.alert()
        return
      }
      this.$q.dialog({
        title: 'Confirmação',
        message: 'Deseja realmente remover a meta ' + goal.amount + ' reais?',
        ok: 'confirmar',
        cancel: 'cancelar'
      }).then(() => {
        this.$restAPI.post({
          req: 'goal',
          action: 'removegoal',
          data: {
            id: goal.id
          }
        }).then((resp) => {
          this.loadGoals()
        })
      })
    },
    alert () {
      this.$q.dialog({
        title: 'Alert',
        message: 'Desculpe, você não pode remover esta meta!',
        ok: 'ok'
      })
    }
  },
  mounted () {
    this.loadGoals()
  },
  components: {
    AddGoalModal
  }
}
</script>
<style>
</style>
