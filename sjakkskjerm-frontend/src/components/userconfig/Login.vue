<template>
  <div>
    <h3>Logg inn</h3>
    <!--<form @submit.prevent="login">-->
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input 
          type="text"
          class="form-control"
          id="txtusername"
          aria-describedby="emailHelp"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="txtpassword" class="form-label">Passord</label>
        <input
          type="password"
          class="form-control"
          id="txtpassword"
          v-model="password"
          />
      </div>
      
    </form>
    <button type="submit" class="btn btn-primary" @click="login()">Logg Inn</button>
    <!--<button v-on:click="bajs">Send</button>-->
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
//import store from "../../store/index";

export default {
  data() {
    return {
      username:'',
      password:''
    }
  }, 
  computed: {
    ...mapGetters('auth', {
      getterLoginStatus:'getLoginStatus'
    })
  },
  methods: {
    ...mapActions('auth', {
      actionLogin:'login'
    }),
    async login() {
      console.log(this.username, this.password);
      await this.actionLogin({username:this.username, password:this.password});
      if (this.getterLoginStatus == 'success') {
        this.$router.push("/profil");
      } else {
        alert('failed to login')
      }
    },
    loginx() {
    }
  }
};
</script>

<style>

</style>