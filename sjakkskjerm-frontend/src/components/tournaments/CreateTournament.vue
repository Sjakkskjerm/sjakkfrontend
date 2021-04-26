<template>
  <div>
    <h1>Opprett en turnering</h1>
    <form ref="tournamentForm" @submit.prevent="sendForm">
      <h3>Navngi din turnering</h3>

      <label>Tittel</label>
      <div>
        <BaseInput
          v-model="tournament.tournamentName"
          placeholder="Tittel"
          type="text"
        />
      </div>

      <h3>Bestem start- og sluttdato for turneringen</h3>

      <div class="startDate">
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

      <h3>Hvor mange runder, og kamper per runde skal spilles?</h3>

      <label>Antall runder</label>
      <div class="numberOfRounds">
        <BaseInput
          v-model.number="tournament.numberOfRounds"
          placeholder="Antall runder"
          type="number"
        />
      </div>

      <label>Antall kamper per runde</label>
      <div>
        <BaseInput
          v-model.number="tournament.gamesPerRound"
          placeholder="Antall kamper per runde"
          type="number"
        />
      </div>

      <div class="regretButtons">
        <button class="backButton" type="button" @click="back()">
          Tilbake
        </button>

        <button class="resetButton" type="button" @click="resetForms()">
          Reset
        </button>
      </div>

      <div class="submitButton">
        <button type="submit">Opprett</button>
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
import GameService from "@/services/GameService.js";

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
      GameService.createTournament(this.tournament)
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
