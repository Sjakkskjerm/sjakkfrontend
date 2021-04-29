<template>
  <div>
    <h2>Logg inn</h2>
    <hr>
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input type="text" placeholder="Fyll inn brukernavn" class="form-control" :class="{ 'is-invalid': v$.username.$invalid, 'is-valid': !v$.username.$invalid }" id="txtusername" v-model="v$.username.$model"/>
        <div v-if="v$.username.$error">
          <span v-if="v$.username.required.$invalid" class="errortext"> Vennligst fyll inn brukernavn.</span>
          <span v-if="v$.username.alphaNum.$invalid" class="errortext"> Symboler ikke godtatt, fyll inn gyldig brukernavn.</span>
        </div>
      </div>
      <div class="mb-3">
        <label for="txtpassword" class="form-label">Passord</label>
        <input type="password" placeholder="Fyll inn passord" class="form-control" :class="{ 'is-invalid': v$.password.$invalid, 'is-valid': !v$.password.$invalid }" id="txtpassword" v-model="v$.password.$model"/>
        <div v-if="v$.password.$error">
          <span v-if="v$.password.required.$invalid" class="errortext"> Vennligst fyll inn passord.</span>
        </div>
      </div>
    </form>
    <button type="submit" class="btn btn-dark" @click="sendLogin()" :disabled="this.hasErrors">Logg Inn</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import useValidate from '@vuelidate/core'
import { minLength, required, alphaNum } from '@vuelidate/validators'

export default {
  data() {
    return {
      v$: useValidate(),
      username:'',
      password:''
    }
  }, 
  validations() {
    return {
      username: {
        required, 
        alphaNum,
        minLength: minLength(1)	
      },
      password: {
        required
      }
    }
  },
  computed: {
    ...mapGetters('auth', {
      getterLoginStatus:'getLoginStatus'
    }),
    hasErrors() {
      return this.v$.$invalid
    }
  },
  methods: {
    ...mapActions('auth', {
      actionLogin:'login'
    }),
    sendLogin() {
      this.v$.$validate() 
      if (!this.v$.$error) { 
        this.login()
      } else {
        alert('Kunne ikke sende forespørsel')
      }
    },
    async login() {
      await this.actionLogin({username:this.v$.username.$model, password:this.v$.password.$model});
      if (this.getterLoginStatus == 'success') {
        this.$router.push("/profil");
      } else {
        alert('failed to login')
      }
    },
  }
};
</script>

<style>

.bajs {
  text-align: left;
}

</style>