<template>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-white' : null"
    >
      <div id="profile">
        <img :src="photo" style='height: 80px; padding: 10px; border-radius: 50%;' class="inline-block">
      </div>
      <q-list
        no-border
        link
        inset-delimiter
      >
        <template v-for="(link, key) in links">
            <div :key="key">
                <q-list-header>{{key}}</q-list-header>
                <template v-for="(item, index) in link.routes">
                    <q-item :class="itemClass(item.route)" :key="index" @click.native="goTo(item.route)">
                        <q-item-side :icon="item.materialIcon" />
                        <q-item-main :label="item.name" />
                    </q-item>
                </template>
            </div>
        </template>
      </q-list>
    </q-layout-drawer>
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
        currentPath: this.$router.currentRoute.path,
        photo: 'https://avatars0.githubusercontent.com/u/25044027?s=460&v=4',
        leftDrawerOpen: this.$q.platform.is.desktop,
        links: {
            'Início': {
                routes: [
                    { route: '/', materialIcon: 'home', name: 'Painel Geral' },
                    { route: '/spending-register', materialIcon: 'attach_money', name: 'Registrar gasto' },
                    { route: '/reports', faIcon: 'fa fa-home', materialIcon: 'insert_chart', name: 'Relatórios' }
                ]
            },
            'Definições': {
                routes: [
                    { route: '/my-goals', faIcon: 'fa fa-bell-o', materialIcon: 'thumb_up', name: 'Minhas Metas' },
                    { route: '/alerts', faIcon: 'fa fa-bell-o', materialIcon: 'notifications_active', name: 'Alertas' },
                    { route: '/category-all', faIcon: 'fa fa-cog', materialIcon: 'build', name: 'Ajuste de categorias' }
                ]
            }
        }
    }
  },
  methods: {
    goTo (route) {
        this.$router.push(route)
        console.log()
    },
    toggleMenu () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    itemClass (path) {
        return this.currentPath === path ? 'item-link active' : 'item-link'
    }
  }
}

</script>

<style scoped>
.q-toolbar {
    min-height: 60px;
}
#profile {
    padding-top: 10px;
    height: 140px;
    background-color: #009688;
}

.item-link{
    cursor: pointer;
    padding: 10px 16px;
}

.item-link:hover{
    background: whitesmoke;
}

.item-link.active{
    color: #027be3;
    background-color: #dadada!important;
    border-right: 2px solid #027be3;
}

</style>
