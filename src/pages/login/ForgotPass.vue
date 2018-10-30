<template>
    <div>
        <h6 class="h6-title">Esqueceu a senha?</h6>
        <form v-on:submit.prevent>
            <q-field
              icon="email"
            >
              <q-input type="text" float-label="Email do usuário" v-model="email"/>
            </q-field>
        </form>
        <p class="p-description">Se você esqueceu sua senha não se preocupe. Digite seu e-mail e nós enviaremos um link para redefinição.</p>
        <div class="div-btns">
            <q-btn rounded size="md" color="primary" label="Enviar" @click="sendEmail"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForgotPass',
    data () {
        return {
            email: ''
        }
    },
    methods: {
        sendEmail () {
            alert('Em construção')
        }
    }
}
</script>

<style>
.h6-title{
    margin-top: 0px;
    margin-bottom: 7px;
    font-size: 1.2em;
    font-weight: 400;
}
.p-description{
    font-size: 0.9541em;
    padding-top: 1.4em;
    color: #000000c9;
    text-align: justify;
}
</style>
