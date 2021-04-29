<template>
  <div>
    <h1>Opprett en turnering</h1>
    <form ref="tournamentForm" @submit.prevent="sendForm">
      <h3>Navngi din turnering og arbiter</h3>

      <label>Tittel</label>
      <div class="mb-3">
        <BaseInput
          v-model="tournament.tournamentName"
          placeholder="Tittel..."
          type="text"
        />
      </div>

      <label>Navn på arbiter</label>
      <div class="arbiter mb-3">
        <BaseInput
          v-model="tournament.arbiter"
          placeholder="Navn..."
          type="text"
        />
      </div>

      <h3>Bestem start- og sluttdato for turneringen</h3>

      <div class="startDate mb-3">
        <label>Startdato</label>
        <datepicker
          v-model="tournament.startDate"
          placeholder="Startdato (Klikk for å velge)"
        />
      </div>

      <label>Sluttdato</label>
      <datepicker
        v-model="tournament.endDate"
        placeholder="Sluttdato (Klikk for å velge)"
      />

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

export default {
  name: "CreateTournament",
  components: {
    BaseInput,
    Datepicker
  },
  data() {
    return {
      tournament: {
        tournamentName: "",
        startDate: new Date(),
        endDate: null,
        arbiter: ""
      }
    };
  },
  methods: {
    sendForm() {
      console.log("yoyoyoy" + this.tournament);
      AuthoService.post(
        "http://localhost:8080/api/tournaments/createtournament",
        this.tournament
      )
        .then(function(response) {
          console.log("response", response);
        })
        .catch(function(err) {
          console.log("Error", err);
        });
      this.resetForms();
    },
    back() {
      this.$router.go(-1);
    },
    resetForms() {
      const refForm = this.$refs.tournamentForm;
      refForm.reset();
      this.tournament.startDate = new Date();
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
input {
  border: 1px solid silver;
  border-radius: 4px;
  background: white;
  padding: 5px 10px;
}
</style>
