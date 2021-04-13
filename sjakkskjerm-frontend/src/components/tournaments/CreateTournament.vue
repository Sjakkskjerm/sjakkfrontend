<template>
  <div>
    <h1>Create a tournament</h1>
    <form>
      <h3>Name your tournament</h3>

      <BaseInput v-model="tournamentName" label="Name" type="text" />

      <h3>Set the duration of the tournament</h3>

      <label>Start date</label>
      <datepicker
        v-model="startDate"
        :locale="locale"
        :upper-limit="to"
        :lower-limit="from"
      />

      <label>End date</label>
      <datepicker
        v-model="endDate"
        :locale="locale"
        :upper-limit="to"
        :lower-limit="from"
      />

      <h3>How many rounds, and games per round will be played?</h3>

      <BaseInput
        v-model.number="numberOfRounds"
        label="Number of rounds"
        type="number"
      />

      <BaseInput
        v-model.number="numberOfGames"
        label="Number of games per round"
        type="number"
      />
    </form>
  </div>
</template>

<script>
import BaseInput from "../forms/BaseInput.vue";
import Datepicker from "vue3-datepicker";

export default {
  name: "CreateTournament",
  components: {
    BaseInput,
    Datepicker
  },
  data() {
    return {
      tournamentName: "",
      startDate: "",
      endDate: "",
      numberOfRounds: "",
      numberOfGames: ""
    };
  }
};
</script>
