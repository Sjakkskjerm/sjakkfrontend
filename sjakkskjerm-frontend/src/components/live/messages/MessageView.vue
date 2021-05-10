<template>
  <div
    class="message-card"
    :class="{ important: important, overflowable: overflowable }"
  >
    <p class="message">
      {{ message.message }}
    </p>
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
    },
    overflowable: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: {
    deleteMessageAcknowledged: null
  },
  data() {
    return {
      important: false,
      error: null
    };
  },
  computed: {
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    })
  },
  mounted() {
    this.setImportance();
  },
  methods: {
    deleteMsg() {
      const messageURL = "/message/delete?messageId=" + this.message.messageId;

      AuthoService.delete(messageURL)
        .then(() => {
          this.$emit("deleteMessageAcknowledged");
        })
        .catch(reason => {
          this.error = reason;
          console.log(reason);
        });
    },
    setImportance() {
      if (this.message.importance.toString().toLowerCase() == "viktig") {
        this.important = true;
      }
    }
  }
};
</script>

<style scoped>
.message-card {
  padding: 0.5rem;
  margin: 0 0.2em 0.5em 0.2em;
  text-align: left;
  border-style: solid;
  border-width: 0.15rem;
  border-radius: 0.26rem;
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.overflowable {
  overflow: auto;
}

.message {
  margin: 0%;
  margin-bottom: 5px;
  padding: 0%;
  float: left;
}

.important {
  border-color: rgb(207, 120, 39);
  border-width: 3px;
}

.delete-message-button {
  float: right;
}
</style>
