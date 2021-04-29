<template>
  <div class="message-card">
    <p class="message">
      {{ message.date }}: <em>{{ message.message }}</em>
    </p>
  </div>
</template>

<script>
export default {
  name: "MessageView",
  props: {
    message: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.message-card {
  padding: 10px;
  margin-bottom: 1em;
  margin-right: 5%;
  margin-left: 5%;
}

.message {
  /* font-style: italic; */
  margin: 0%;
  padding: 0%;
  float: left;
}
</style>
