<template>
    <div style="text-align: left;">
        <q-field
            icon="perm_identity"
            :error="$v.form.name.$error"
            error-label="Este campo é obrigatório!"
            helper="Nome, sobrenome ou apelido"
        >
            <q-input type="text" float-label="Usuário" v-model="form.name" @blur="$v.form.name.$touch"/>
        </q-field>
        <q-field
            icon="account_circle"
            :error="$v.form.login.$error"
            error-label="Este campo é obrigatório!"
            helper="Nome de acesso ao finanpe"
        >
            <q-input type="text" float-label="Login" v-model="form.login" @blur="$v.form.login.$touch"/>
        </q-field>
        <q-field
            icon="email"
            :error="$v.form.email.$error"
            error-label="Entre com um email válido"
            helper="Contato para recuperação de senha"
        >
            <q-input type="email" float-label="Email" v-model="form.email" @blur="$v.form.email.$touch"/>
        </q-field>
        <q-field
            icon="vpn_key"
            :error="$v.form.pass.$error"
            error-label="A senha deve conter no minimo 6 caracteres"
            helper="Senha de acesso"
        >
            <q-input type="password" float-label="Senha" v-model="form.pass" @blur="$v.form.pass.$touch"/>
        </q-field>
        <div class="div-btns" style="text-align: center;">
            <q-btn rounded size="md" color="primary" label="Confirmar" @click="addUser"/>
        </div>
    </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
    name: 'Signup',
    data () {
        return {
            form: {
                name: '',
                login: '',
                pass: '',
                email: ''
            }
        }
    },
    methods: {
        addUser () {
            this.$v.form.$touch()
            if (this.$v.form.$error) { // Error
                this.$q.notify('Por favor, revise os campos novamente!')
                return
            }
            let d = JSON.stringify(this.form)
            this.$restAPI.post({
                req: 'user',
                action: 'createuser',
                hasSession: false,
                data: JSON.parse(d)
            }).then((resp) => {
                if (resp.status_code === 200) {
                    this.notifySuccess()
                    this.$emit('addedUser')
                }
            }).catch(() => {
                console.log('error')
            })
        },
        notifySuccess () {
            this.$q.notify({
                message: 'Usuário ' + this.form.name + ' cadastrado com sucesso!',
                color: 'primary',
                icon: 'check_circle'
            })
        }
    },
    validations: {
        form: {
            email: { email },
            name: { required },
            login: { required },
            pass: { required, minLength: minLength(6) }
        }
    }
}
</script>

<style>

</style>
