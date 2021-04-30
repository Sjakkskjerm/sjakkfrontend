<template>
  <div>
    <h2>Registrer</h2>
    <hr>
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <div class="input-group">
          <input type="text" placeholder="Fyll inn brukernavn" class="form-control" :class="{ 'is-invalid': v$.username.$invalid, 'is-valid': !v$.username.$invalid }" required v-model="v$.username.$model"/>
        </div>
        <div v-if="v$.username.$error">
          <span v-if="v$.username.required.$invalid" class="errortext"> Vennligst fyll inn brukernavn.</span>
          <span v-if="v$.username.minLength.$invalid" class="errortext"> Vennligst fyll inn brukernavn på mer enn {{ v$.username.minLength.$params.min }} tegn.</span>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Epost</label>
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">@</span>
          <input type="text" placeholder="Fyll inn epost" class="form-control" :class="{ 'is-invalid': v$.email.$invalid, 'is-valid': !v$.email.$invalid }" required v-model="v$.email.$model"/>
        </div>
        <div v-if="v$.email.$error">
          <span v-if="v$.email.required.$invalid" class="errortext">Vennligst fyll inn en epost</span>
          <span v-if="v$.email.email.$invalid" class="errortext"> Epost ikke gyldig </span>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Klubb</label>
        <input type="text" placeholder="Fyll inn klubb" class="form-control" :class="{ 'is-invalid': v$.club.$invalid, 'is-valid': !v$.club.$invalid }" required v-model="v$.club.$model"/>
        <div v-if="v$.club.$error">       
          <span v-if="v$.club.required.$invalid" class="errortext"> Vennligst fyll inn klubb</span>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Passord</label>
        <input type="password" placeholder="Fyll inn passord" class="form-control" :class="{ 'is-invalid': v$.password.$invalid, 'is-valid': !v$.password.$invalid }" required v-model="v$.password.$model"/>
        <div v-if="v$.password.$error">
          <span v-if="v$.password.required.$invalid" class="errortext"> Vennligst fyll inn et passord.</span>
          <span v-if="v$.password.minLength.$invalid" class="errortext"> Passord må være minst {{ v$.password.minLength.$params.min }} tegn.</span>
          <span v-if="v$.password.maxLength.$invalid" class="errortext"> Passord kan være maks {{ v$.password.maxLength.$params.max }} tegn.</span>
          <span v-if="v$.password.goodPassword.$invalid" class="errortext"> Passordet må ha minst en bokstav, et tall og et symbol.</span>
        </div>
      </div>
       <div class="mb-3">
        <label class="form-label">Bekreft Passord</label>
        <input type="password" placeholder="Bekreft passord" class="form-control" :class="{ 'is-invalid': v$.repeatPassword.$invalid, 'is-valid': !v$.repeatPassword.$invalid }" required v-model="v$.repeatPassword.$model"/>
        <div v-if="v$.repeatPassword.$error">
          <span v-if="v$.repeatPassword.repeatPassword.$invalid" class="errortext">Passord er ikke likt.</span>
        </div>
      </div>
    </form>
    <button class="btn btn-dark" v-on:click="sendUserData" :disabled="this.hasErrors">Registrer</button>
  </div>
</template>

<script>
import GameService from '../../services/GameService';
import useValidate from '@vuelidate/core'
import { alphaNum, email, maxLength, minLength, required, sameAs } from '@vuelidate/validators'


export default {
  data() {
    return {
      v$: useValidate(),
      username: '',
      email: '',
      club: '',
      password: '',
      role: '',
      repeatPassword: ''
    }
  },
  validations() {
    return  {
      username: {
        required, 
        alphaNum,
        minLength: minLength(3), 
        maxLength: maxLength(25)
      },
      email: {
        required, 
        email,
        maxLength: maxLength(50)
      },
      club: {
        alphaNum,
        required, 
      },
      password: {
        required,
        minLength: minLength(5), 
        maxLength: maxLength(75),
        goodPassword(password) {
        return (
          /[a-z]/.test(password) && // checks for a-z
          /[0-9]/.test(password) && // checks for 0-9
          /\W|_/.test(password)// checks for special char
        );
      }
      },
      repeatPassword: {
        required,
        repeatPassword: sameAs(this.password)
      }
    }
  },
  computed: {
    hasErrors() {
      return this.v$.$invalid
    }
  },
  methods: {
    sendUserData() {
      var data = {
        "username": this.v$.username.$model,
        "email": this.v$.email.$model,
        "club": this.v$.club.$model,
        "password": this.v$.password.$model,
        "role": ["user"]
      };

      this.v$.$validate()
      if (!this.v$.$error) {
        alert('Registrering sendt')

        console.log(data);

        GameService.register(data)
          .then(response => {
            console.log("Resp: " + response);
            this.$router.push("/login");
          })
          .catch(error => {
            console.log("Err: " + error);
          })
      } else {
        alert('Registrering kunne ikke bli sendt')
      }

    }
  }
}
</script>

<style>
.errortext {
  color: red;
}

</style>