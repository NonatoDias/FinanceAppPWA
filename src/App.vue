<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
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
