<template>
  <div>
    <h1>Create a tournament</h1>
    <form ref="tournamentForm" @submit.prevent="sendForm">
      <h3>Name your tournament</h3>

      <label>Name</label>
      <div>
        <BaseInput
          v-model="tournament.tournamentName"
          placeholder="Name"
          type="text"
        />
      </div>

      <h3>Set the duration of the tournament</h3>

      <div class="startDate">
        <label>Start date</label>
        <datepicker
          v-model="tournament.startDate"
          placeholder="Start date (Click to choose)"
        />
      </div>

      <label>End date</label>
      <datepicker
        v-model="tournament.endDate"
        placeholder="End date (Click to choose)"
      />

      <h3>How many rounds, and games per round will be played?</h3>

      <label>Number of rounds</label>
      <div class="numberOfRounds">
        <BaseInput
          v-model.number="tournament.numberOfRounds"
          placeholder="Number of rounds"
          type="number"
        />
      </div>

      <label>Number of games per round</label>
      <div>
        <BaseInput
          v-model.number="tournament.gamesPerRound"
          placeholder="Number of games per round"
          type="number"
        />
      </div>

      <div class="regretButtons">
        <button class="backButton" type="button" @click="back()">Back</button>

        <button class="resetButton" type="button" @click="resetForms()">
          Reset
        </button>
      </div>

      <div class="submitButton">
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
.numberOfRounds {
  margin-bottom: 0.75em;
}
.startDate {
  margin-bottom: 0.75em;
}
</style>
