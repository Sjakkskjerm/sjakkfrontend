<template>
  <div v-if="hasTournaments" class="tournament-list">
    <h3>
      {{ title }}
    </h3>
    <TournamentItem class="tournament-item"
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
    TournamentItem
  },
  props: {
    tournaments: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true,
      default: "test"
    }
  },
  computed: {
    hasTournaments() {
      return this.tournaments.length > 0 ? true : false;
    }
  }
};
</script>
<style scoped>
.tournament-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
}
.tournament-item {
  vertical-align: center;
}
</style>
