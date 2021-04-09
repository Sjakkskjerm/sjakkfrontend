<template>
  <div class="tournamentlist">
    <h1>
      {{ title }}
    </h1>
    <table class="bord">
      <tr>
          <th>Tournament Name</th> 
          <th>Start Date</th>
          <th>End Date</th>
      </tr>
        <TournamentItem
        v-for="tournament in tournaments"
        :key="tournament"
        :tournament="tournament"
        />
    </table>
  </div>
</template>

<script>
import TournamentItem from "@/components/tournaments/TournamentItem.vue";

export default {
  name: "TournamentList",
  components: {
    TournamentItem,
  },
  props: {
    tournaments: { 
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "test",
    },
  }
};
</script>

<style scoped>
  .bord{
    /* border: 1px solid rgb(75, 75, 75);  */
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    font-size: 24;
    /* border-radius: 120px 90px 60px 30px/30px 60px 90px 120px; */
  }
  th{
    border-bottom: 1px solid black;
  }
</style>
