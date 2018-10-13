<template>
    <q-list highlight class="bg-white">
        <q-list-header>Últimos lançamentos</q-list-header>
        <q-item-separator />
        <q-item :separator="true">
            <q-item-side color="secondary" icon="attach_money" />
            <q-item-main label="50,00" sublabel="Teste de compra"/>
            <q-item-tile>18/10/2018</q-item-tile>
        </q-item>
        <q-item :separator="true">
            <q-item-side color="secondary" icon="attach_money" />
            <q-item-main label="50,00" sublabel="Teste de compra"/>
            <q-item-tile>18/10/2018</q-item-tile>
        </q-item>
        <q-item :separator="true">
            <q-item-side color="secondary" icon="attach_money" />
            <q-item-main label="50,00" sublabel="Teste de compra dfsdfsdfsd">
            </q-item-main>
            <q-item-tile >18/10/2018</q-item-tile>
        </q-item>
    </q-list>
</template>

<script>
export default {
}
</script>

<style>

</style>
