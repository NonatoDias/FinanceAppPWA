<template>
  <q-page class="page-bg">
    <div class="row justify-center items-center" style="height: 100vh; overflow: auto;">
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
              <q-input type="password" @keyup.enter="login()" float-label="senha"  v-model="user.pass" />
            </q-field>
            <div class="div-btns">
              <q-btn rounded size="md" color="primary" label="Entrar"  @click="login()" />
              <q-btn outline rounded size="md" color="primary" label="Cadastrar"  @click="signup()" />
              <q-btn flat rounded size="sm" color="primary" label="Esqueci a senha"  @click="forgotPass()" />
            </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Loading } from 'quasar'
export default {
  // name: 'PageName',
  data () {
    return {
      user: {
        login: 'admin',
        pass: ''
      }
    }
  },
  methods: {
    alertError (msg) {
      this.$q.dialog({
        title: 'Ops!',
        message: msg || 'Parece que o login ou a senha estão incorretos'
      })
    },
    storeData (token) {
      localStorage.setItem('sessionToken', token)
    },
    clearStorage () {
      localStorage.clear()
    },
    login () {
      Loading.show()
      let url = this.$wsConfig.baseUrl + '?req=user&action=getUserSession&login=' + this.user.login + '&pass=' + this.user.pass
      console.log(url)
      this.$axios.get(url)
      .then((response) => {
        Loading.hide()
        let data = response.data
        if (data.status_code === 200 && data.userSession) {
          this.storeData(data.userSession.st)
          this.$router.push('/')
        } else {
          this.alertError()
        }
      })
      .catch((error) => {
        this.alertError('Erro ao conectar no servidor' + error)
        Loading.hide()
      })
    },
    forgotPass () {
      console.log('nao definido')
    },
    signup () {
      console.log('nao definido')
    }
  },
  created () {
    this.clearStorage()
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
