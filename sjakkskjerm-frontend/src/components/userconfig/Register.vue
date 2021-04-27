<template>
  <div>
    <h2>Registrer</h2>
    <hr>
    <form>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Brukernavn</label>
        <input 
        type="text"
        class="form-control"
        required v-model="userData.username"/>
      </div>
      <div class="mb-3">
        <label>Epost</label>
        <input 
        type="text" 
        class="form-control"
        required v-model="userData.email"/>
      </div>
      <div class="mb-3">
        <label>Klubb</label>
        <input 
        type="text"  
        class="form-control"
        required v-model="userData.club"/>
      </div>
      <div class="mb-3">
        <label>Passord</label>
        <input 
        type="password"  
        class="form-control"
        required v-model="userData.password"/>
      </div>
    </form>
    <button class="btn btn-primary" v-on:click="sendUserData">Registrer</button>
  </div>
  
</template>

<script>
import GameService from '../../services/GameService';

export default {
  data: function() {
    return {
      userData: {
        username: '',
        email: '',
        club: '',
        password: '',
        role: ''
      }
    }
  },
  methods: {
    sendUserData() {
      var data = {
        "username": this.userData.username,
        "email": this.userData.email,
        "club": this.userData.club,
        "password": this.userData.password,
        "role": ["user"]
      };

      console.log(data);
      
      GameService.register(data)
        .then(response => {
          console.log("AOKSD: " + response);
          this.$router.push("/login");
        })
        .catch(error => {
          console.log("dfsig: " + error);
        })
    }
  }
}
</script>

<style>
</style>