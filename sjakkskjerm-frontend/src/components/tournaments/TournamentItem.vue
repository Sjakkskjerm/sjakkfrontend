<template>
  <div class="tournament-item">
    <router-link
      class="tournament-link"
      :to="{ name: 'Tournament', params: { id: tournament.id } }"
    >
      <div class="tournament-card">
        <h4 class="name">{{ tournament.tournamentName }}</h4>
        <p class="date">From: {{ tournament.startDate }}</p>
        <p class="date">To: {{ tournament.endDate }}</p>
      </div>
    </router-link>
    <div v-if="ownerOfTournament">
      <router-link
        :to="{ name: 'TournamentDashboard', params: { id: tournament.id } }"
      >
        <button class="btn btn-primary dashboard-button">Dashboard</button>
      </router-link>
    </div>
  </div>
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
  },
  computed: {
    ownerOfTournament() {
      return (
        this.$store.state.auth.authData.uid == this.tournament.owner.userId
      );
    }
  }
};
</script>

<style scoped>
.tournament-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
}
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
  width: 50%;
}
.date {
  font-style: italic;
  margin: 0%;
  padding: 0%;
}
.name {
  font-weight: bold;
}

.dashboard-button {
  margin: 1rem;
}
</style>
