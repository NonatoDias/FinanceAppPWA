<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
    </q-layout-header>
    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'EmptyLayout',
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
</style>
