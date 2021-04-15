<template>
  <div>
    <h1>Create a tournament</h1>
    <form ref="tournamentForm" @submit.prevent="sendForm">
      <h3>Name your tournament</h3>

      <BaseInput v-model="tournament.tournamentName" label="Name" type="text" />

      <h3>Set the duration of the tournament</h3>

      <label>Start date</label>
      <datepicker
        v-model="tournament.startDate"
        placeholder="Start date (Click to choose)"
      />

      <label>End date</label>
      <datepicker
        v-model="tournament.endDate"
        placeholder="End date (Click to choose)"
      />

      <h3>How many rounds, and games per round will be played?</h3>

      <BaseInput
        v-model.number="tournament.numberOfRounds"
        label="Number of rounds"
        type="number"
      />

      <BaseInput
        v-model.number="tournament.gamesPerRound"
        label="Number of games per round"
        type="number"
      />

      <div id="regretButtons">
        <button type="button" @click="back()">Back</button>

        <button type="button" @click="resetForms()">Reset</button>
      </div>

      <div id="submitButton">
        <button type="submit">Create</button>
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
import axios from "axios";

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
        numberOfRounds: "",
        gamesPerRound: ""
      }
    };
  },
  methods: {
    sendForm() {
      console.log("yoyoyoy" + this.tournament);
      axios
        .post(
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
    }
  }
};
</script>
