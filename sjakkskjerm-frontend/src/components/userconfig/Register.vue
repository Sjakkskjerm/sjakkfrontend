<template>
  <div>
    <h1>Registrer</h1>
    <hr />
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input
          v-model="userData.username"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label>Epost</label>
        <input
          v-model="userData.email"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label>Klubb</label>
        <input
          v-model="userData.club"
          type="text"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label>Passord</label>
        <input
          v-model="userData.password"
          type="password"
          class="form-control"
          required
        />
      </div>
    </form>
    <button class="btn btn-primary" @click="sendUserData">Registrer</button>
  </div>
</template>

<script>
import GameService from "../../services/GameService";

export default {
  data: function() {
    return {
      userData: {
        username: "",
        email: "",
        club: "",
        password: "",
        role: ""
      },
      response: null,
      error: null
    };
  },
  methods: {
    sendUserData() {
      var data = {
        username: this.userData.username,
        email: this.userData.email,
        club: this.userData.club,
        password: this.userData.password,
        role: ["user"]
      };

      console.log(data);

      GameService.register(data)
        .then(response => {
          this.response = response;
          this.$router.push("/login");
        })
        .catch(error => {
          this.error = error;
        });
    }
  }
};
</script>

<style></style>
