<template>
  <div>
    <h2>Registrer</h2>
    <hr>
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input type="text" class="status(v$.username.$error)" required v-model="v$.username.$model"/>
        <span v-if="v$.username.$error" class="errortext"> Vennligst fyll inn brukernavn på mer enn tre tegn.</span>
      </div>
      <div class="mb-3">
        <label>Epost</label>
        <input type="text" class="form-control" required v-model="v$.email.$model"/>
        <span v-if="v$.email.$error" class="errortext"> Epost ikke gyldig </span>
      </div>
      <div class="mb-3">
        <label>Klubb</label>
        <input type="text" class="form-control" required v-model="v$.club.$model"/>
        <span v-if="v$.club.$error" class="errortext"> Vennligst fyll inn klubb</span>
      </div>
      <div class="mb-3">
        <label>Passord</label>
        <input type="password" class="form-control" required v-model="v$.password.$model"/>
        <span v-if="v$.password.$error" class="errortext"> Vennligst fyll inn passord på minst 5 tegn.</span>
      </div>
    </form>
    <button class="btn btn-primary" v-on:click="sendUserData">Registrer</button>
  </div>
</template>

<script>
import GameService from '../../services/GameService';
import useValidate from '@vuelidate/core'
import { email, maxLength, minLength, required } from '@vuelidate/validators'


export default {
  data() {
    return {
      v$: useValidate(),
      username: '',
      email: '',
      club: '',
      password: '',
      role: ''
    }
  },
  validations() {
    return  {
      username: {
        required, 
        minLength: minLength(3), 
        maxLength: maxLength(25)
      },
      email: {
        required, 
        email,
        maxLength: maxLength(50)
      },
      club: {
        required, 
      },
      password: {
        required, 
        minLength: minLength(5), 
        maxLength: maxLength(75)
      }
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

      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
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
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}

.errortext {
  color: red;
}


</style>