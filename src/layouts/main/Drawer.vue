<template>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-white' : null"
    >
      <div id="profile">
        <img :src="user.photo" class="inline-block">
        <div class="user-description">
            <span class="span-title">{{user.fullname}}</span>
            <span class="span-subtitle">{{user.login}}</span>
            <q-btn
                class="btn-logout"
                round
                outline
                size="md"
                color="primary"
                icon="exit_to_app"
                title="logout"
                @click="logout"
            />
        </div>
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
                    <q-item v-bind:class="{'item-link': true, 'active': isItemActive(item.route)}" :key="index" @click.native="goTo(item.route)">
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
        user: {
            fullname: 'Nonato Dias',
            login: 'nonato@gmail.com',
            photo: 'statics/user/unknown.jpg'
        },
        leftDrawerOpen: this.$q.platform.is.desktop,
        links: {
            'Início': {
                routes: [
                    { route: '/', materialIcon: 'home', name: 'Painel Geral' },
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
    toggleMenu () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    isItemActive (path) {
        return this.currentPath === path
    },
    goTo (route) {
        this.currentPath = route
        this.$router.push(route)
        console.log()
    },
    logout () {
        this.$router.push('/login')
    }
  }
}

</script>

<style scoped>
.q-toolbar {
    min-height: 60px;
}
#profile {
    padding-top: 20px;
    padding-left: 5px;
    height: 140px;
    background-color: #009688;
}

#profile > img {
    height: 80px;
    width: 80px;
    padding: 10px;
    border-radius: 50%;
}

.user-description{
    width: calc(100% - 81px);
    float: right;
    padding-top: 20px;
    padding-left: 5px;
    color: white;
    position: relative;
}

.user-description .span-title{
    font-size: 1.1em;
    display: inline-block;
    width: 100%;
}
.user-description .span-subtitle{
    font-size: 0.8em;
    display: inline-block;
}
.btn-logout{
    position: absolute;
    bottom: -80px;
    right: 13px;
    background: white !important;
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
