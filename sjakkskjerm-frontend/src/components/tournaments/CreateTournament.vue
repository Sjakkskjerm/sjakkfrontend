<template>
  <div>
    <h1>Create a tournament</h1>
    <form @submit.prevent="sendForm">
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
        v-model.number="tournament.numberOfGames"
        label="Number of games per round"
        type="number"
      />

      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
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
      console.log("yoyoyoy" + this.tournament)
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
    }
  }
};
</script>
