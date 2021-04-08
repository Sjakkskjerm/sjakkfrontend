<template>
  <div class="tournamentlist">
    <h1>
      {{ title }}
    </h1>
    <TournamentItem
    v-for="tournament in tournaments"
    :key="tournament"
    :tournament="tournament"
    />
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
