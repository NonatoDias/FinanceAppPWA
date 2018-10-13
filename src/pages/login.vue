<template>
  <q-page class="page-bg">
    <div class="row justify-center items-center" style="height: 100vh;">
      <div class="login-form shadow-2" >
        <div class="login-form-header items-center">
          <img src="statics/icons/finanpe-logo.png" class="img-logo" alt="" srcset="">
          <!-- <span class="span-header">FINANPE</span> -->
        </div>
        <div class="login-form-body">
          <q-field
              icon="account_circle"
            >
              <q-input type="text" float-label="Login"  v-model="user.login" />
            </q-field>
            <q-field
              icon="vpn_key"
            >
              <q-input type="password"  float-label="senha"  v-model="user.pass" />
            </q-field>
            <div class="div-btns">
              <q-btn rounded size="md" color="primary" label="Entrar"  @click="login()" />
              <q-btn outline rounded size="md" color="primary" label="Cadastrar"  @click="login()" />
              <q-btn flat rounded size="sm" color="primary" label="Esqueci a senha"  @click="login()" />
            </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      user: {
        login: 'admin@gmail.com',
        pass: '123456'
      }
    }
  },
  methods: {
    login () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.page-bg{
  background-color: whitesmoke;
  background-image: url('../statics/bg/bg-desktop.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.login-form{
  text-align: center;
  min-height: 220px;
  background-color: white;
  width: 380px;
}

.login-form-header{
  padding: 30px 20px 20px 20px;
  font-size: 1.5em;
}

.span-header{
  display: inline-block;
}

.login-form-body{
  padding: 10px 40px 30px 40px;
}

.div-btns{
  padding-top: 20px;
}

.div-btns .q-btn{
  min-width: 220px;
  margin-bottom: 10px;
}

.img-logo{
  height: 85px;
}

@media screen and (max-width: 420px){
  .login-form{
    width: 97%;
  }

  .img-logo{
    height: 70px;
  }

  .login-form-body, .login-form-header{
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media screen and (max-width: 720px){
  .page-bg{
    background-image: url('../statics/bg/bg-mobile.jpg');
  }
}
</style>
