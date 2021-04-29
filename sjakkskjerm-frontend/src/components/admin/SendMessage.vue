<template>
  <div>
    <h1>Send Melding</h1>
    <hr>
    <form>
      <div class="mb-3">
        <label>Turnerings ID</label>
        <input type="text" class="form-control" required v-model="this.tournamentId">
      </div>

      <div class="mb-3">
        <label>Melding</label>
        <input type="text" placeholder="Fyll inn melding" class="form-control" required v-model="v$.message.$model">
        <span v-if="v$.message.$error" class="errortext">Vennligst fyll inn en melding.</span>
      </div>
      <div class="mb-3">
        <label>Viktighet</label>
        <select class="form-select" v-model="v$.importance.$model">
          <!--<option v-for="option in importanceArray" :value="option" :key="option" :selected="option === importance">
            {{ option }}
          </option>-->
          <option value="" disabled selected hidden>Velg viktighetsgrad...</option>
          <option value="viktig">Viktig</option>
          <option value="ikke viktig">Ikke Viktig</option>
        </select>
          <span v-if="v$.importance.$error" class="errortext">Vennligst velg en viktighetsgrad.</span>
      </div>
    </form>
  </div>
  <button class="btn btn-dark" v-on:click="sendMessages">Send</button>
</template>

<script>

//import GameService from "@/services/GameService.js";
import AuthoService from "../../services/AuthoService";
import useValidate from '@vuelidate/core'
import {alphaNum, required} from '@vuelidate/validators'

export default {
    data: function() {
    return {
        importanceArray: [
          'viktig',
          'ikkeviktig'
        ],
      v$: useValidate(),
      tournamentId: '',
      message: '',
      importance: ''
    }
    },
    validations() {
      return {
        message: {
          required,
          alphaNum	
        },
        importance: {
          required
        }
      }
    },
    methods: {
        sendMessages() {
          var data = {
            tournamentId: this.tournamentId,
            message: this.v$.message.$model,
            importance: this.v$.importance.$model
          };

          this.v$.$validate() // checks all inputs
          if (!this.v$.$error) { // if ANY fail validation
            alert('Melding sendt.')

            const messagesURL = "/message";

            AuthoService.post(messagesURL, data)
              .then(response => {
                console.log("OK: " + response)
              })
              .catch(reason => {
                console.log("Not OK: " + reason);
              })
          } else {
            alert('Melding kunne ikke bli sendt')
          }
        }
    }
}
</script>

<style>
form {
    max-width: 600px;
    margin: 30px auto;
    text-align: left;
    border-radius: 10px;
}
label {
    display: inline-block;
    margin-top: 20px;
    font-size: 10px;
    text-transform: uppercase;
    color: grey;
}
input {
    display: block;
    padding: 10px 6px; 
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid grey;
}

</style>