<template>
  <router-link
    class="tournament-link"
    :to="{ name: 'Tournament', params: { id: tournament.id } }"
  >
    <div class="tournament-card">
      <h4 class="name">{{ tournament.tournamentName }}</h4>
      <p class="date">Fra: {{ tournament.startDate }}</p>
      <p class="date">Til: {{ tournament.endDate }}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "TournamentItem",
  props: {
    tournament: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      id: null,
      games: []
    };
  }
};
</script>

<style scoped>
.tournament-card {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 1em;
}
.tournament-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
.tournament-link {
  color: #2c3e50;
  text-decoration: none;
  width: 30%;
}
.date {
  font-style: italic;
  margin: 0%;
  padding: 0%;
}
.name {
  color: #42b983;
}
</style>
