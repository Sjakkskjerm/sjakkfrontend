<template>
  <div v-if="show" class="resultlist">
    <h1>Her kommer resultater...</h1>
  </div>
</template>

<script>
export default {
  name: "ResultList",
  data() {
    return {
      show: false
    };
  }
};
</script>
