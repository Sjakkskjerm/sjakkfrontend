<template>
  <div>
    <div>
      <h1>Send Melding</h1>
      <hr />
      <form>
        <div class="mb-3">
          <label>Turnerings ID</label>
          <input
            v-model="meldingData.turneringsId"
            type="text"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label>Melding</label>
          <input
            v-model="meldingData.melding"
            type="text"
            class="form-control"
            required
          />
        </div>

        <div class="mb-3">
          <label>Viktighet</label>
          <select v-model="meldingData.viktighet" class="form-select">
            <option
              v-for="option in viktigheter"
              :key="option"
              :value="option"
              :selected="option === meldingData.viktighet"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </form>
    </div>
    <button class="btn btn-primary" @click="sendMessages">Send</button>
  </div>
</template>

<script>
//import GameService from "@/services/GameService.js";
import AuthoService from "../../services/AuthoService";

export default {
  data: function() {
    return {
      svarlol: [],
      viktigheter: ["viktig", "ikke viktig"],
      meldingData: {
        turneringsId: "",
        melding: "",
        viktighet: ""
      }
    };
  },
  methods: {
    sendMessages() {
      const messagesURL = "/message";
      var data = {
        tournamentId: this.meldingData.turneringsId,
        message: this.meldingData.melding,
        importance: this.meldingData.viktighet
      };

      AuthoService.post(messagesURL, data)
        .then(response => {
          console.log("Yay: " + response);
        })
        .catch(reason => {
          console.log("Not yay: " + reason);
        });
    }
  }
};
</script>

<style>
form {
  max-width: 600px;
  margin: 30px auto;
  text-align: left;
  border-radius: 10px;
}
label {
  display: inline-block;
  margin-top: 20px;
  font-size: 10px;
  text-transform: uppercase;
  color: grey;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid grey;
}
select {
  margin-left: 10px;
}

.form-select {
}
</style>
