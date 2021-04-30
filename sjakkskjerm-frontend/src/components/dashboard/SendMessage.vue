<template>
  <div class="send-message-container">
    <form class="send-container" @submit.prevent="onSubmit">
      <div class="mb-3 message-input">
        <label>Melding</label>
        <input
          v-model="v$.message.$model"
          type="text"
          placeholder="Fyll inn melding"
          class="form-control"
          :class="{
            'is-invalid': v$.message.$invalid,
            'is-valid': !v$.message.$invalid
          }"
          required
          autofocus
        />
        <div v-if="v$.message.$error">
          <span v-if="v$.message.required.$invalid" class="errortext">
            Vennligst fyll inn melding.</span
          >
        </div>
      </div>
      <div class="mb-3 importance-select">
        <label class="form-label">Viktighet</label>
        <select
          v-model="v$.importance.$model"
          class="form-select"
          :class="{
            'is-invalid': v$.importance.$invalid,
            'is-valid': !v$.importance.$invalid
          }"
        >
          <option
            v-for="option in importanceArray"
            :key="option"
            :value="option"
            :selected="option === importance"
          >
            {{ option }}
          </option>
        </select>
        <div v-if="v$.importance.$error">
          <span v-if="v$.importance.required.$invalid" class="errortext"
            >Vennligst velg en viktighetsgrad.</span
          >
        </div>
      </div>
      <div class="send-button">
        <button
          :disabled="hasErrors"
          class="btn btn-dark"
          @click="sendMessages"
        >
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
      },
      importance: {
        required
      }
    };
  },
  computed: {
    hasErrors() {
      return this.v$.$invalid;
    }
  },
  methods: {
    sendMessages() {
      var data = {
        tournamentId: this.tournamentid,
        message: this.v$.message.$model,
        importance: this.v$.importance.$model
      };

      this.v$.$validate();
      if (!this.v$.error) {
        const messagesURL = "/message";

        AuthoService.post(messagesURL, data)
          .then(response => {
            console.log("Yay: " + response);
            this.$emit("messageSentAcknowledged");
            this.v$.message.$model = "";
          })
          .catch(error => {
            console.log("Not yay: " + error);
            if (error.response.status == "401") {
              console.log(
                "User not authorized to send messages to this tournament"
              );
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
  /* width: inherit; */
  widows: 100%;
}

.message-input {
  width: 50%;
}

.importance-select {
  width: 30%;
}

.send-button {
  width: 20%;
}

.send-container {
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  border-radius: 10px;
}

.btn {
  margin-left: 1rem;
}

select {
  margin-left: 10px;
}
</style>
