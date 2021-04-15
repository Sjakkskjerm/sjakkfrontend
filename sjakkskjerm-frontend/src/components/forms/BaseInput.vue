<template>
  <label>{{ label }}</label>
  <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
/*
    Author: Lasse Kregnes Hansen
    A reusable form component for text input fields (Allows for text and numbers usage). 
    It is designed to keep all text field forms consistent in the system. 
    (See CreateTournament component for an example of use.) Implements an input listener 
    that already emits out the model value.
*/

export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    }
  },
  emits: ["update:modelValue"]
};
</script>
