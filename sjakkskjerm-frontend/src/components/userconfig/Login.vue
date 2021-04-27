<template>
  <div>
    <h2>Logg inn</h2>
    <hr>
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input type="text" class="form-control" id="txtusername" v-model="v$.username.$model"/>
        <span v-if="v$.username.$error" class="errortext"> Vennligst fyll inn brukernavn.</span>

      </div>
      <div class="mb-3">
        <label for="txtpassword" class="form-label">Passord</label>
        <input type="password" class="form-control" id="txtpassword" v-model="v$.password.$model"/>
        <span v-if="v$.password.$error" class="errortext"> Vennligst fyll inn passord.</span>
      </div>
      
    </form>
    <button type="submit" class="btn btn-primary" @click="sendLogin()">Logg Inn</button>
  </div>
  <pre> {{v$.username.$model}} - {{v$.password.$model}}</pre>
  <pre class="bajs"> {{v$}}</pre>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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
        required
      },
      password: {
        required
      }
    }
  },
  computed: {
    ...mapGetters('auth', {
      getterLoginStatus:'getLoginStatus'
    })
  },
  methods: {
    ...mapActions('auth', {
      actionLogin:'login'
    }),
    sendLogin() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
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