<template>
    <q-list highlight class="bg-white">
        <q-list-header>Últimos lançamentos</q-list-header>
        <q-item-separator />
        <template v-for="(expense, item) in expenses">
            <q-item :separator="true" :key="item">
                <q-item-side color="secondary" icon="attach_money" />
                <q-item-main :label="expense.value + ''" :sublabel="expense.description"/>
                <q-item-tile>{{ expense.date }}</q-item-tile>
            </q-item>
        </template>
    </q-list>
</template>

<script>
export default {
    data () {
        return {
            expenses: []
        }
    },
    mounted () {
        this.$restAPI.get({
            req: 'expense',
            action: 'getall'

        }).then((data) => {
            this.expenses = data.expenses
        })
    }
}
</script>

<style>

</style>
