<template>
  <q-page padding>
    <div class="content-header" style="padding-bottom: 16px">
      <span class="vertical-bottom content-header-title">Meu Perfil</span>
    </div>
     <div class="bg-white profile-content-body">
        <img :src="user.photo || 'statics/user/unknown.jpg'" alt="" srcset="" class="img-profile">
        <div class="profile-content">
          <ul class="ul-profile">
            <li>
              Nome
              <p>{{user.name}}</p>
            </li>
            <li>
              Login
              <p>{{user.login}}</p>
            </li>
            <li>
              Email
              <p>{{user.email || 'sem email definido'}}</p>
            </li>
          </ul>
        </div>
        <div class="profile-action">
          <!--h6 class="profile-h6">Ações</h6-->
          <div class="profile-btns">
            <q-btn flat rounded  size="md" color="primary" icon="vpn_key" label="Redefinir senha" @click="clearData"/>
            <q-btn flat rounded  size="md" color="primary" icon="photo_camera" label="Alterar imagem" @click="clearData"/>
            <q-btn flat rounded  size="md" color="primary" icon="cancel" label="Limpar dados" @click="clearData"/>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>
export default {
  name: 'Profile',
  data () {
    return {
      user: JSON.parse(localStorage.getItem('usersession'))
    }
  },
  methods: {
    clearData () {
      alert('Em construcao')
    }
  }
}
</script>

<style scoped>
.img-profile{
  height: 180px;
  width: 180px;
  padding: 10px;
  float: left;
  border-radius: 50%;
}

.profile-content-body{
  padding: 20px;
  display: inline-block;
}

.profile-content{
  padding: 10px;
  width: 200px;
  float: left;
}

.ul-profile{
  margin: 0px;
  list-style-type: none;
  padding-left: 15px;
}

.ul-profile li {
  color: #757575;
  font-weight: 600;
}

.ul-profile li p {
  color: #0c0c0ccf;
  font-weight: 400;
  padding-top: 2px;
}

.profile-action{
  width: 100%;
  margin: 10px 10px 0px 10px;
  display: inline-block;
}

.profile-h6{
  margin: 10px 0px;
  font-weight: 400;
}

.profile-btns{
  width: 220px;
}

@media screen and (max-width: 560px){
  .profile-content-body{
    text-align: center;
    width: 80%;
    margin: auto;
    display: block;
  }

  .profile-content{
    width: 100%;
    text-align: left;
  }

  .img-profile{
    height: 210px;
    width: 210px;
    padding: 10px;
    text-align: center;
    float: unset;
  }

  .profile-h6{
    border-top: 1px solid #9e9e9e2e;
    padding-top: 10px;
    font-size: 18px;
  }

  .profile-action{
    border-top: 1px solid #9e9e9e2e;
    padding-top: 10px;
    width: 100%;
    margin: 0px;
  }

  .profile-btns{
    display: block;
    margin: auto;
    text-align: center;
  }
}

@media screen and (max-width: 420px){
  .profile-content-body{
    text-align: center;
    width: 100%;
    margin: auto;
    display: block;
  }

  .profile-content{
    width: 100%;
    text-align: left;
  }

  .img-profile{
    height: 70%;
    width: 70%;
    padding: 10px;
    text-align: center;
    float: unset;
  }
}

</style>
