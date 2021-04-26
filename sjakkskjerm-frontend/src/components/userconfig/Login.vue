<template>
  <div>
    <h3>Logg inn</h3>
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input
          id="txtusername"
          v-model="username"
          type="text"
          class="form-control"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="txtpassword" class="form-label">Passord</label>
        <input
          id="txtpassword"
          v-model="password"
          type="password"
          class="form-control"
        />
      </div>
    </form>
    <button type="submit" class="btn btn-primary" @click="login()">
      Logg Inn
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import store from "../../store/index";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", {
      isLoggedIn: "isLoggedIn"
    })
  },
  methods: {
    ...mapActions("auth", {
      actionLogin: "login"
    }),
    async login() {
      await this.actionLogin({
        username: this.username,
        password: this.password
      });
      if (this.isLoggedIn) {
        this.$router.push("/profil");
      } else {
        alert("failed to login");
      }
    },
    loginx() {}
  }
};
</script>

<style></style>
