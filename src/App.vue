<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { Notify } from 'quasar'
export default {
  name: 'App',
  methods: {
    logout () {
      this.$router.push('/login')
      localStorage.removeItem('sessionToken')
      this.notify('Sessão expirou!')
    },
    notify: function (msg) {
      Notify.create({
        message: msg,
        timeout: 5000,
        color: 'tertiary'
      })
    },
    alert: function (msg) {
      Notify.create({
        message: msg,
        timeout: 6000,
        color: 'negative'
      })
    }
  },
  mounted () {
    this.$restAPI.setOnStatus((statusCode) => {
      switch (statusCode) {
        case 401:
          this.logout()
          break
        case 500:
          this.alert()
          break
        default:
          break
      }
    })

    let st = localStorage.getItem('sessionToken')
    if (!st || st.length < 5) {
      this.$router.push('/login')
    }

    this.$router.beforeEach((to, from, next) => {
      st = localStorage.getItem('sessionToken')
      if (to.path === '/login') {
        next()
      } else if (st && st.length > 5) {
        next()
      } else {
        next('/login')
      }
    })
  }
}
</script>

<style>
</style>
