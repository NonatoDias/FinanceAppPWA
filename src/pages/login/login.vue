<template>
  <q-page class="page-bg">
    <div class="row justify-center items-center" style="height: 100vh; overflow: auto;">
      <div class="login-form shadow-2" >
        <div class="login-form-header items-center">
          <img src="statics/icons/finanpe-logo.png" class="img-logo" alt="" srcset="">
          <!-- <span class="span-header">FINANPE</span> -->
        </div>
        <div class="login-form-body">
          <div v-if="formName === 'login'">
            <q-field
              icon="account_circle"
            >
              <q-input type="text" float-label="Login"  v-model="user.login" />
            </q-field>
            <q-field
              icon="vpn_key"
            >
              <q-input type="password" @keyup.enter="login()" float-label="senha"  v-model="user.pass" />
            </q-field>
            <div class="div-btns">
              <q-btn rounded size="md" color="primary" label="Entrar"  @click="login()" />
              <q-btn outline rounded size="md" color="primary" label="Cadastrar"  @click="signup()" />
              <q-btn flat rounded size="sm" color="primary" label="Esqueci a senha"  @click="forgotPass()" />
            </div>
          </div>
          <div v-else-if="formName === 'signup'">
            <signup v-on:addedUser="loginPage"></signup>
          </div>
          <div v-else-if="formName === 'forgotpass'">
            <forgot-pass></forgot-pass>
          </div>
          <div v-if="formName !== 'login'" class="div-btns no-padding">
              <q-btn flat rounded size="sm" color="primary" label="Voltar"  @click="formName='login'" />
            </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Signup from './Signup.vue'
import ForgotPass from './ForgotPass.vue'
export default {
  // name: 'PageName',
  data () {
    return {
      user: {
        login: '',
        pass: ''
      },
      formName: 'login'
    }
  },
  methods: {
    alertError (msg) {
      this.$q.dialog({
        title: 'Ops!',
        message: msg || 'Parece que o login ou a senha estão incorretos'
      })
    },
    storeData (data) {
      localStorage.setItem('sessionToken', data.userSession.st)
      localStorage.setItem('usersession', JSON.stringify(data.userSession))
    },
    clearStorage () {
      localStorage.clear()
    },
    login () {
      this.$restAPI.get({
          req: 'user',
          action: 'login',
          data: {
              login: this.user.login,
              pass: this.user.pass,
              hasSession: false
          }
      }).then((resp) => {
        if (resp.status_code === 200 && resp.userSession) {
          this.storeData(resp)
          this.$router.push('/')
        } else {
          this.alertError()
        }
      }).catch(() => {
          this.alertError()
      })
    },
    forgotPass () {
      this.formName = 'forgotpass'
      this.user.login = ''
      this.user.pass = ''
    },
    signup () {
      this.formName = 'signup'
      this.user.login = ''
      this.user.pass = ''
    },
    loginPage () {
      this.formName = 'login'
      this.user.login = ''
      this.user.pass = ''
    }
  },
  created () {
    this.clearStorage()
  },
  components: {
    Signup,
    ForgotPass
  }
}
</script>

<style>
.page-bg{
  background-color: whitesmoke;
  background-image: url('../../statics/bg/bg-desktop.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.login-form{
  text-align: center;
  min-height: 220px;
  background-color: white;
  width: 360px;
}

.login-form-header{
  padding: 30px 20px 20px 20px;
  font-size: 1.5em;
}

.span-header{
  display: inline-block;
}

.login-form-body{
  padding: 10px 35px 30px 35px;
}

.div-btns{
  padding-top: 20px;
}

.div-btns.no-padding{
  padding-top: 0px;
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
    background-image: url('../../statics/bg/bg-mobile.jpg');
  }
}
</style>
