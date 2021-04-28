<template>
  <div>
    <form v-on:submit.prevent="onSubmit" class="send-container">
      <div class="mb-3">
        <label>Melding</label>
        <input
          v-model="meldingData.melding"
          type="text"
          class="form-control"
          required
          autofocus
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
      <button class="btn btn-primary" @click="sendMessages">Send</button>
    </form>
  </div>
</template>

<script>
//import GameService from "@/services/GameService.js";
import AuthoService from "../../services/AuthoService";

export default {
  name: "SendMessage",
  props: {
    tournamentid: {
      type: String,
      required: true
    }
  },
  emits: {
    messageSentAcknowledged: null
  },
  data() {
    return {
      svarlol: [],
      viktigheter: ["Viktig", "Ikke Viktig"],
      meldingData: {
        turneringsId: "",
        melding: "",
        viktighet: "Ikke Viktig"
      }
    };
  },
  methods: {
    sendMessages() {
      const messagesURL = "/message";
      var data = {
        tournamentId: this.tournamentid,
        message: this.meldingData.melding,
        importance: this.meldingData.viktighet
      };

      AuthoService.post(messagesURL, data)
        .then(response => {
          console.log("Yay: " + response);
          this.$emit("messageSentAcknowledged");
          this.meldingData.melding = "";
        })
        .catch(reason => {
          console.log("Not yay: " + reason);
        });
    }
  }
};
</script>

<style>
.send-container {
  display: flex;
  flex-direction: row;
}

/* form {
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
} */
</style>
