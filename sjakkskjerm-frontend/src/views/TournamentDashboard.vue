<template>
  <div>
    <h1>Dashboard</h1>
    <p>{ { id } }</p>
    <!-- <button @click="$router.push('/admin/sendmessage')" 
    v-if="gettersAuthData.role === 'ROLE_ORGANIZER'"
    class="btn btn-primary">Send Melding</button> -->
  </div>
</template>

<script>
export default {
  name: "TournamentDashboard",
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>
