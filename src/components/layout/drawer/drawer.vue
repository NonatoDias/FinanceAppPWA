<template>
  <q-drawer ref="leftDrawer" v-show="getLayoutNeeded">
    <div id="profile">
      <img :src="photo" style='height: 80px; padding: 10px; border-radius: 50%;' class="inline-block">
      <!--img src="../img/avatar-1.svg" id="avatar" class="inline-block"--> 
      <div id="user-name">
        <span class="text-white"> {{ name }} </span>
        <hr>
        <span class="text-white"> {{ email }} </span>
        <hr>
      </div>
      <div id="user-actions">
        <button class="bordered blue small" ><i>person</i></button>
        <!-- <button class="bordered blue small" ><i>lock</i></button> -->
        <button class="bordered blue small" @click='logOut'><i>exit_to_app</i></button>
      </div>
    </div>
    <menu-two :links="links"></menu-two>
    <!--menu-two v-else :links="links"></menu-two-->

    <div class="fixed-bottom text-center light text-italic">
      Powered by
      WebDias
    </div>
  </q-drawer>
</template>



<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import menuOne from './menuOne.vue'
  import menuTwo from './menuTwo.vue'
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
          Dashboard: {
            routes: [
              { route: '/', faIcon: 'fa fa-home', materialIcon: 'home', name: 'Página Inicial' }
            ],
            show: true
          },
          Relatorios: {
            routes: [
              { route: '/form', faIcon: 'fa fa-search', materialIcon: 'search', name: 'Form find / edit' },
              { route: '/embeeded', faIcon: 'fa fa-check', materialIcon: 'check', name: 'Embeeded validations' },
              { route: '/advanced-form-one', faIcon: 'fa fa-hdd-o', materialIcon: 'filter_1', name: 'Adv. Form One' }
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
        // firebase.auth().signOut()
      }
    },
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getMenuCollapse'])
    },
    components: {
      menuOne,
      menuTwo
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
    height: 130px;
    background-color: #009688;
  }
  #user-name {
    left: 90px;
    bottom: 77px;
    position: relative;
    width: 159px;
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
