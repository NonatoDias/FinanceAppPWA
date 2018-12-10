<template>
  <q-page padding>
    <div class="content-header" style="padding-bottom: 16px">
      <span class="vertical-bottom content-header-title">Minhas metas</span>
    </div>
    <div class="bg-white" style="max-width: 800px">
      <q-list class="bg-white" style="text-align: center">
        <q-list-header>Listagem de todas metas</q-list-header>
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
                    {{getLabel(goal)}}
                  </q-item-tile>
                </q-item-main>
                <q-item-tile>
                  {{goal.is_active ? 'ACTIVE' : ''}}
                  <q-btn :style="'margin-left: 5px;'" icon="check_circle" size="sm" color="primary" @click="setAsActive(goal)" rounded/>
                </q-item-tile>
            </q-item>
        </template>
      </q-list>
    </div>
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
      this.$q.dialog({
        title: 'Adicionar meta',
        message: 'valor',
        prompt: {
          model: '',
          type: Number
        },
        cancel: true
      }).then(_ggoal => {
        this.$restAPI.post({
          req: 'goal',
          action: 'addgoal',
          data: {
          'dt_end': new Date(),
          'dt_start': new Date(),
          'amount': _ggoal
          }
        }).then((resp) => {
          this.loadGoals()
        }).catch(() => {

        })
      })
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
        ' - ' +
        new Date(goal.dt_end).toLocaleDateString()
      )
    }
  },
  mounted () {
    this.loadGoals()
  }
}
</script>
<style>
</style>
