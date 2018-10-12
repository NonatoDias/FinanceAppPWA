<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >
        <q-btn
          flat
          dense
          round
          @click="toggleMenu()"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Finanpe
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <drawer></drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import Drawer from './Drawer.vue'

export default {
  name: 'MyLayout',
  computed: {
    toggleMenu () {
      return this.$children[0].$children[3].toggleMenu
    }
  },
  methods: {
    openURL
  },
  components: {
    Drawer
  }
}
</script>

<style>
.q-toolbar {
    min-height: 60px;
}
</style>
