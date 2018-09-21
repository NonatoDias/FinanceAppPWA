<template>
  <div>
    <div class="layout-padding ">
       <div class="card" style="max-width: 500px;">
      <div class="card-title bg-teal text-white">
        Perfil de {{user.name}}
      </div>
      <div class="card-content bg-white" style="height: 300px;     padding-top: 30px;">
        <div style="width: 200px; float: left; padding-top: 10px;">
          <img src="https://avatars0.githubusercontent.com/u/25044027?s=460&v=4" height="180px" alt="" srcset="">
        </div>
        <div class="wrap gutter" style="    float: left; height: 100%;     width: 250px;">
          <div class="width-1of1">
            <div class="floating-label">
              <input required class="full-width" v-model="user.name">
              <label>Nome</label>
            </div>
          </div>
          <div class="width-1of1">
            <div class="floating-label">
              <input required class="full-width" v-model="user.surname">
              <label>Sobrenome</label>
            </div>
          </div>
          <div class="width-1of1">
            <div class="floating-label">
              <input required class="full-width" v-model="user.login">
              <label>Login</label>
            </div>
          </div>
          <div class="width-1of1">
            <div class="floating-label">
              <input required class="full-width" type="password" v-model="user.pass">
              <label>Senha</label>
            </div>
          </div>
        </div>
      </div>
      
    <div class="card-actions justify-center flex">
      <button style="    margin-right: 10px;" class="white small" @click="add()"><i class="item-primary">add</i> Cancelar</button>
      <button class="secondary small" @click="add()"><i class="item-primary">add</i> Salvar</button>
    </div>
    </div>
    </div>
  </div>
</template>


<script type="text/javascript">
  /* eslint-disable */
  import { Toast } from 'quasar'

  export default {
    name: 'Profile',
    data () {
      return {
        user: {
          name: 'Nonato',
          surname: 'Dias',
          login: 'nonato.app',
          pass: '154544',
          address: {}
        },
        map: ''
      }
    },
    methods: {
      save () {
        this.$http.jsonplaceholder
          .patch(`users/${this.user.id}`, {address: this.user.address})
          .then(response => { Toast.create.positive('Updated successful!') })
      }
    }
  }
</script>
<style scoped>
.floating-label input {
    padding-top: 1.8rem;
}
</style>
