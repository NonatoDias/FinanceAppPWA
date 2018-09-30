import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

  routes: [
        { path: '/', component: load('views/dashboard/one/dashboard'), meta: { name: 'Painel Geral' } },
        { path: '/my-goals', component: load('views/goals/myGoals/goals-mygoals'), meta: { name: 'Minhas metas' } },
        { path: '/alerts', component: load('views/alerts/all/alerts-all'), meta: { name: 'Alertas' } },
        { path: '/success', component: load('AuthSuccess'), meta: { name: 'Form Profile' } },
        { path: '/login-one', component: load('views/login/login-one'), meta: { name: 'Login One' } },
        { path: '/spending-register', component: load('views/spending/register/spending-register'), meta: { name: 'Registrar gastos' } },
        { path: '/profile', component: load('views/profile/profile'), meta: { name: 'Meu Perfil' } },
        { path: '/reports', component: load('views/reports/reports'), meta: { name: 'Relatórios' } },
        { path: '/category-all', component: load('views/category/all/category-all'), meta: { name: 'Ajuste de categorias' } },
        { path: '*', component: load('Error404') } // Not found
  ]
})
