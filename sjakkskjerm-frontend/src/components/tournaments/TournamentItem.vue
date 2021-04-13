<template>
  <tr class="bord1">
    <router-link
      class="testing"
      :to="{ name: 'Tournament', params: { id: tournament.id } }"
    >
      <td class="bord">{{ tournament.tournamentName }}</td>
      <td class="bord">{{ tournament.startDate }}</td>
      <td class="bord">{{ tournament.endDate }}</td>
    </router-link>
  </tr>
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
.bord {
  padding-left: 1rem;
  padding-right: 1rem;
}
.bord1 {
  border: 1px solid black;
  font-size: 24;
}

.testing {
  color: #2c3e50;
  text-decoration: none;
}
</style>
