<template>
  <div class="message-card">
    <p class="message">{{ message.date }}: {{ message.message }}</p>
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
  cursor: pointer;
  margin-bottom: 1em;
  margin-right: 5%;
  margin-left: 5%;
}
.message-card:hover {
  /* transform: scale(1.01); */
  /* box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2); */
}

.message {
  font-style: italic;
  margin: 0%;
  padding: 0%;
}
</style>
