<template>
  <div class="send-message-container">
    <form class="send-container" @submit.prevent="onSubmit">
      <div class="mb-3 message-input">
        <label>Melding</label>
        <input
          v-model="v$.message.$model"
          type="text"
          class="form-control"
          required
          autofocus
        />
        <span v-if="v$.message.$error" class="errortext"
          >Vennligst fyll inn en melding.</span
        >
      </div>
      <div class="mb-3 importance-select">
        <label>Viktighet</label>
        <select v-model="v$.importance.$model" class="form-select">
          <option
            v-for="option in importanceArray"
            :key="option"
            :value="option"
            :selected="option === importance"
          >
            {{ option }}
          </option>
        </select>
        <span v-if="v$.importance.$error" class="errortext"
          >Vennligst velg en viktighetsgrad.</span
        >
      </div>
      <div class="send-button">
        <button :disabled="!message" class="btn btn-dark" @click="sendMessages">
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthoService from "../../services/AuthoService";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
      importanceArray: ["Viktig", "Ikke Viktig"],
      v$: useValidate(),
      tournamentId: "",
      message: "",
      importance: "Ikke Viktig"
    };
  },
  validations() {
    return {
      message: {
        required
        // alphaNum
      },
      importance: {
        required
      }
    };
  },
  methods: {
    sendMessages() {
      const messagesURL = "/message";
      var data = {
        tournamentId: this.tournamentid,
        message: this.v$.message.$model,
        importance: this.v$.importance.$model
      };

      this.v$.$validate();
      if (!this.v$.error) {
        AuthoService.post(messagesURL, data)
          .then(response => {
            console.log("Yay: " + response);
            this.$emit("messageSentAcknowledged");
            this.v$.message.$model = "";
          })
          .catch(error => {
            console.log("Not yay: " + error);
            if (error.response.status == "401") {
              console.log("User not authorized to send messages to this tournament");
            }
          });
      } else {
        alert("Melding kunne ikke bli sendt.");
      }
    }
  }
};
</script>

<style scoped>
.send-message-container {
  width: inherit;
}

.message-input {
  width: 50%;
}

.importance-select {
  width: 25%;
}

.send-button {
  width: 10%;
}

.send-container {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
}

.btn {
  margin-left: 1rem;
}

select {
  margin-left: 10px;
}
</style>
