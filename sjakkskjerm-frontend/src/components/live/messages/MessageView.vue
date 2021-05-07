<template>
  <div class="message-card">
    <p class="message">{{ message.message }}</p>
    <div v-if="deleteButton">
      <button
        v-if="
          gettersAuthData.role === 'ROLE_ORGANIZER' ||
            gettersAuthData.role === 'ROLE_ADMIN'
        "
        class="btn btn-dark delete-message-button"
        @click="deleteMsg"
      >
        Slett
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthoService from "../../../services/AuthoService";

export default {
  name: "MessageView",
  props: {
    message: {
      type: Object,
      required: true
    },
    deleteButton: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: {
    deleteMessageAcknowledged: null
  },
  computed: {
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    })
  },
  methods: {
    deleteMsg() {
      const messageURL = "/message/delete?messageId=" + this.message.messageId;
      console.log(messageURL);

      AuthoService.delete(messageURL)
        .then(response => {
          console.log("OK: " + response);
          this.$emit("deleteMessageAcknowledged");
        })
        .catch(reason => {
          console.log("Not OK: " + reason);
        });
    }
  }
};
</script>

<style scoped>
.message-card {
  padding: 0.5rem;
  margin: 0 0.2em 0.5em 0.2em;
  text-align: left;
  overflow: auto;
  border-style: solid;
  border-width: 0.15rem;
  border-radius: 0.26rem;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.message {
  margin: 0%;
  padding: 0%;
  float: left;
}

.delete-message-button {
  float: right;
}
</style>
