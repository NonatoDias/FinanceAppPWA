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

    <q-page-container class="bg-grey-2">
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
.content-header {
  position: relative;
  padding: 0em 4em 0em 0em;
}
@media screen and (max-width: 600px){
  .content-header {
    padding: .5em .5em 1em .5em;
  }
}
.content-header-title {
  font-size: 22px;
  font-weight: 300;
}

@media screen and (min-width: 1200px){
  .layout-padding {
    padding: 1.2rem 4rem;
    margin: auto;
  }
}

@media screen and (max-width: 1199px) and (min-width: 992px){
  .layout-padding {
    padding: 2rem 3rem;
    margin: auto;
  }
}
</style>
