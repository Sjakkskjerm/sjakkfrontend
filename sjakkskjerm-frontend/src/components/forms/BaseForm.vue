<template>
    <label>{{ label }}</label>
    <input
    v-bind="$attrs"
    :placeholder="label"
    class="field"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    >
</template>

<script>
/*
    Author: Lasse Kregnes Hansen
    A reusable form component for each specific input type, for easier 
    replication, modification and extention of forms. Designed to keep 
    all forms consistent in the system. (Works as an abstraction layer 
    for a form. See CreateTournament component for an example of use.)
*/

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>