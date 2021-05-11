<template>
  <div>
    <h1>Profil</h1>
    <hr />
    <div class="profile">
      <aside class="profile-info">
        <h3>Brukerdetaljer</h3>
        <div class="profile-info-content">
          <span class="profile-info-text">Brukernavn: </span>
          <span class="profile-info-text-value">{{
            gettersAuthData.userid
          }}</span>
        </div>
        <div class="profile-info-content">
          <span class="profile-info-text">Klubb: </span>
          <span class="profile-info-text-value">{{
            gettersAuthData.club
          }}</span>
        </div>
        <div class="profile-info-content">
          <span class="profile-info-text">Bruker ID: </span>
          <span class="profile-info-text-value">{{ gettersAuthData.uid }}</span>
        </div>
        <div class="profile-info-content">
          <span class="profile-info-text">Rolle: </span>
          <span class="profile-info-text-value">{{ role }}</span>
        </div>

        <div v-if="gettersAuthData.role === 'ROLE_ADMIN'" class="admin-button">
          <button
            v-if="gettersAuthData.role === 'ROLE_ADMIN'"
            class="btn btn-dark"
            @click="$router.push('/admin/panel')"
          >
            Admin Panel
          </button>
        </div>
        <hr />
      </aside>
      <div v-if="hasTournaments" class="profile-content">
        <div
          v-if="
            gettersAuthData.role === 'ROLE_ORGANIZER' ||
              gettersAuthData.role === 'ROLE_ADMIN'
          "
        >
          <TournamentList :tournaments="tournaments" title="Mine Turneringer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameService from "@/services/GameService.js";
import TournamentList from "@/components/tournaments/TournamentList.vue";

export default {
  name: "Profile",
  components: {
    TournamentList
  },
  data() {
    return {
      tournaments: [],
      role: null
    };
  },
  computed: {
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    }),
    hasTournaments() {
      return this.tournaments.length != 0;
    }
  },
  mounted() {
    this.getTournamentsByOwner();
    this.renameRoles();
  },
  methods: {
    getTournamentsByOwner() {
      GameService.getTournamentsByOwner(this.gettersAuthData.uid)
        .then(response => {
          this.tournaments = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    renameRoles() {
      let role = this.gettersAuthData.role;
      switch (role) {
        case "ROLE_USER":
          this.role = "Bruker";
          break;
        case "ROLE_ORGANIZER":
          this.role = "Arrangør";
          break;
        case "ROLE_ADMIN":
          this.role = "Administrator";
          break;
        default:
          this.role = "Ingen rolle";
      }
    }
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 30% 0 30%;
}

.profile-info {
  float: left;
  text-align: left;
  padding: 0 1rem 1rem 1rem;
}

.profile-content {
  flex-grow: 1;
}

.profile-info-content {
  overflow: auto;
}
.profile-info-text {
  float: left;
  margin-right: 1rem;
}
.profile-info-text-value {
  float: right;
  margin-left: 1rem;
}

.admin-button {
  margin: 1rem 0 0 0;
}
</style>
