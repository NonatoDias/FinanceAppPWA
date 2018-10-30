<template>
    <div>
        <form v-on:submit.prevent>
            <q-field
              icon="perm_identity"
            >
              <q-input type="text" float-label="Nome do usuário" v-model="form.name"/>
            </q-field>
            <q-field
              icon="account_circle"
            >
              <q-input type="email" float-label="Login" v-model="form.login"/>
            </q-field>
            <q-field
              icon="email"
            >
              <q-input type="email" float-label="Email" v-model="form.email"/>
            </q-field>
            <q-field
              icon="vpn_key"
            >
              <q-input type="password" float-label="Senha" v-model="form.pass" />
            </q-field>
            <q-field
              icon="vpn_key"
            >
              <q-input type="password" float-label="Confirmação da senha" v-model="form.confirm_pass" />
            </q-field>
        </form>
        <div class="div-btns">
            <q-btn rounded size="md" color="primary" label="Confirmar" @click="addUser"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Signup',
    data () {
        return {
            form: {
                name: '',
                login: '',
                pass: '',
                confirm_pass: '',
                email: ''
            }
        }
    },
    methods: {
        addUser () {
            let d = JSON.stringify(this.form)
            this.$restAPI.post({
                req: 'user',
                action: 'addexpense',
                hasSession: false,
                data: JSON.parse(d)
            }).then((resp) => {
                console.log(resp)
            }).catch(() => {
                console.log('error')
            })
        }
    }
}
</script>

<style>

</style>
