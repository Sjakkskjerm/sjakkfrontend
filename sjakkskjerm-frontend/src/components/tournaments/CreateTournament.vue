<template>
  <div>
    <h1>Opprett en turnering</h1>
    <form ref="tournamentForm" @submit.prevent="sendForm">
      <h3>Navngi din turnering og arbiter</h3>

      <label>Tittel</label>
      <div class="mb-3">
        <BaseInput required autofocus v-model="v$.tournamentName.$model" placeholder="Tittel..." type="text" class="form-control" :class="{ 'is-invalid': v$.tournamentName.$error, 'is-valid': !v$.tournamentName.$invalid }"/>
        <div v-if="v$.tournamentName.$error">
          <span v-if="v$.tournamentName.required.$invalid" class="errortext"> Vennligst fyll inn tittel.</span>
        </div>
      </div>

      <label>Navn på arbiter</label>
      <div class="arbiter mb-3">
        <BaseInput required v-model="v$.arbiter.$model" placeholder="Navn..." type="text" class="form-control" :class="{ 'is-invalid': v$.arbiter.$error, 'is-valid': !v$.arbiter.$invalid }"/>
        <div v-if="v$.arbiter.$error">
          <span v-if="v$.arbiter.required.$invalid" class="errortext"> Vennligst fyll inn arbiter.</span>
          <span v-if="v$.arbiter.alphaNum.$invalid" class="errortext"> Arbiter kan kun være alphanumerisk, ingen symboler.</span>
        </div>
      </div>

      <h3>Bestem start- og sluttdato for turneringen</h3>

      <div class="startDate mb-3">
        <label>Startdato</label>
        <datepicker
          v-model="v$.startDate.$model"
          placeholder="Startdato (Klikk for å velge)"
          :class="{ 'is-invalid': v$.startDate.$error, 'is-valid': !v$.startDate.$invalid }"
        />
        <div v-if="v$.startDate.$error">
          <span v-if="v$.startDate.required.$invalid" class="errortext"> Vennligst fyll inn dato.</span>
        </div>
      </div>

      <div class="mb-3">
        <label>Sluttdato</label>
        <datepicker
          v-model="v$.endDate.$model"
          placeholder="Sluttdato (Klikk for å velge)"
          :class="{ 'is-invalid': v$.endDate.$error, 'is-valid': !v$.endDate.$invalid }"
        />
        <div v-if="v$.endDate.$error">
          <span v-if="v$.endDate.required.$invalid" class="errortext"> Vennligst fyll inn dato.</span>
        </div>
      </div>

      <div class="regretButtons">
        <button
          class="backButton btn btn-outline-dark"
          type="button"
          @click="back()"
        >
          Tilbake
        </button>

        <button
          class="resetButton btn btn-outline-dark"
          type="button"
          @click="resetForms()"
        >
          Reset
        </button>
      </div>

      <div class="submitButton">
        <button class="btn btn-outline-dark" type="submit">Opprett</button>
      </div>
    </form>
    <div v-if="error" class="alert alert-primary" role="alert">
      <p>Får ikke opprettet en turnering, beklager.</p>
    </div>
  </div>
</template>

<script>
/*
    Author: Lasse Kregnes Hansen
    Allows user to fill out information about a tournament
    and submit the info to the backend where it will be stored.
    Also allows user to return to the previous page they were on,
    and allows for resetting of the input fields, aswell.
*/
import BaseInput from "../forms/BaseInput.vue";
import Datepicker from "vue3-datepicker";
import AuthoService from "@/services/AuthoService.js";

import useValidate from '@vuelidate/core'
import { required,alphaNum } from '@vuelidate/validators'

export default {
  name: "CreateTournament",
  components: {
    BaseInput,
    Datepicker
  },
  data() {
    return {
      v$: useValidate(),
      tournamentName: "",
      startDate: new Date(),
      endDate: null,
      arbiter: "",
      error: false
    };
  },
  validations() {
    return {
      tournamentName: {
        required
      },
      arbiter: {
        required,
        alphaNum
      },
      startDate: {
        required
      },
      endDate: {
        required
      }
    }
  },
  computed: {
    hasErrors() {
      return this.v$.$invalid
    }
  },
  methods: {
    sendForm() {

      var tournament = {
        tournamentName: this.v$.tournamentName.$model,
        startDate: this.v$.startDate.$model,
        endDate: this.v$.endDate.$model,
        arbiter: this.v$.arbiter.$model
      }
      AuthoService.post(
        "http://localhost:8080/api/tournaments/createtournament",
        tournament
      )
        .then(response => {
          if (response.data) {
            const path = "/dashboard/" + response.data.id;
            this.routingToDashboard(path);
          } else {
            this.error = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.error = true;
        });
      this.resetForms();
    },
    back() {
      this.$router.go(-1);
    },
    routingToDashboard(routeid) {
      this.$router.push(routeid);
    },
    resetForms() {
      const refForm = this.$refs.tournamentForm;
      refForm.reset();
      this.v$.startDate.$model = new Date();
    }
  }
};
</script>

<style scoped>
.regretButtons {
  margin-top: 1em;
}
.submitButton {
  margin-top: 0.5em;
}
.backButton {
  margin-right: 0.25em;
}
.resetButton {
  margin-left: 0.25em;
}
.arbiter {
  margin-bottom: 0.75em;
}
.startDate {
  margin-bottom: 0.75em;
}
</style>
