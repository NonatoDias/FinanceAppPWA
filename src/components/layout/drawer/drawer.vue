<template>
  <q-drawer ref="leftDrawer" v-show="getLayoutNeeded">
    <div id="profile">
      <img :src="photo" style='height: 80px; padding: 10px; border-radius: 50%;' class="inline-block">
      <!--img src="../img/avatar-1.svg" id="avatar" class="inline-block"--> 
      <div id="user-name">
        <span class="text-white span-user_item"> {{ name }} </span>      
        <span class="text-white span-user_item"> {{ email }} </span>
        <br>
      </div>
      <div id="user-actions">
        <button class="bordered white small" @click="goToProfile"><i>person</i></button>
        <!-- <button class="bordered blue small" ><i>lock</i></button> -->
        <button class="bordered white small" @click='logOut'><i>exit_to_app</i></button>
      </div>
    </div>
    <menu-links :links="links"></menu-links>

    <!-- <div class="fixed-bottom text-center light text-italic">
      Powered by
      WebDias
    </div> -->
  </q-drawer>
</template>



<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import menuLinks from './menuLinks.vue'
  
  // import firebase from 'firebase'
  
  export default {
    data () {
      return {
        photo: 'https://avatars0.githubusercontent.com/u/25044027?s=460&v=4',
        userId: '546a54sd4',
        name: 'Nonato',
        email: 'abc@gmail.com',
        user: {},
        links: {
          Início: {
            routes: [
              { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'Painel Geral' },
              { route: '/spending-register', faIcon: 'fa fa-home', materialIcon: 'attach_money', name: 'Registrar gasto' },
              { route: '/reports', faIcon: 'fa fa-home', materialIcon: 'insert_chart', name: 'Relatórios' }
            ],
            show: true
          },
          Alertas: {
            routes: [
              { route: '/form', faIcon: 'fa fa-search', materialIcon: 'search', name: 'Form find / edit' },
              { route: '/embeeded', faIcon: 'fa fa-check', materialIcon: 'check', name: 'Embeeded validations' },
              { route: '/advanced-form-one', faIcon: 'fa fa-hdd-o', materialIcon: 'filter_1', name: 'Adv. Form One' }
            ],
            show: true
          },
          'Configurações': {
            routes: [
              { route: '/form', faIcon: 'fa fa-cog', materialIcon: 'build', name: 'Ajuste de categorias' }
            ],
            show: true
          }
        }
      }
    },
    created () {
      /* var vm = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.user = user
          vm.name = vm.user.displayName
          vm.email = vm.user.email
          vm.photo = vm.user.photoURL
          vm.userId = vm.user.uid
        }
      }) */
    },
    methods: {
      logOut () {
        this.$router.push('/login-one')
      },
      goToProfile () {
        this.$router.push('/profile')
      }
    },
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getMenuCollapse'])
    },
    components: {
      menuLinks
    }
  }
</script>




<style scoped>
  .fixed-bottom {
    margin-bottom: 1%;
  }

  .fixed-bottom a img {
    width: 25px;
    height: 25px;
  }
  #avatar{
    padding: 20px;
  }
  #profile {
    padding-top: 10px;
    height: 140px;
    background-color: #009688;
  }
  #user-name {
    left: 90px;
    bottom: 77px;
    position: relative;
    width: 159px;
  }
  
   .span-user_item:first-child{
     padding-top: 8px;
   }

  .span-user_item{
    padding-top: 5px;
    display: block;
  }

  #user-actions {
    left: 90px;
    bottom: 71px;
    position: relative;
    width: 171px;
  }
  #menu-collapse {
    margin-top: 5%;
  }
</style>
