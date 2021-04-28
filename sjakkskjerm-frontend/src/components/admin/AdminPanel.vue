<template>
  <div>
    <h2>Admin Panel</h2>
    <hr>
    <h3>Endre rolle for en bruker</h3>
    <form> 
      <div class="mb-3">
        <label for="txtusername" class="form-label">Bruker ID</label>
        <input type="text" class="form-control" id="txtusername" v-model="v$.userId.$model">
        <span v-if="v$.userId.$error" class="errortext">Vennligst fyll inn en Bruker ID (tall). Eks. 1</span>
      </div>
      <div class="mb-3">
        <label for="txtusername" class="form-label">Rolle ID</label>
        <input type="number" class="form-control" id="txtusername" v-model.number="v$.roleId.$model">
        <span v-if="v$.roleId.$error" class="errortext">Vennligst fyll inn rolle Id, 1 = User, 2 = Organizer, 3 = Admin</span>
      </div>
    </form>
  </div>
  <button class="btn btn-dark" v-on:click="hei">Endre rolle</button>
  <pre class="bajs">{{v$}}</pre>
  <pre>{{v$.userId.$model}}-{{v$.roleId.$model}}</pre>
</template>

<script>
import useValidate from '@vuelidate/core'
import { numeric, required, between } from '@vuelidate/validators'
import AuthoService from '../../services/AuthoService'

export default {
  data() {
    return {
      v$: useValidate(), 
      userId:'',
      roleId:''
    }
  },
  validations() {
    return {
      userId: {
        required,
        numeric
      },
      roleId: {
        required,
        numeric,
        between: between(1,3)
      }
    }
  }, 
  methods: {
    hei() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
        const url ="/auth/updateRole?userId=" + this.v$.userId.$model + "&roleId=" + this.v$.roleId.$model;
        
        AuthoService.put(url)
          .then(response => {
            console.log("OK: " + response)
          })
          .catch(reason => {
            console.log("Not OK: " + reason);
          })
      } else {
        alert('Kunne ikke sende forespørsel, sjekk skjemaet på nytt')
      }
    }
  }

}
</script>

<style>
.errortext {
  color: red;
}

.bajs {
  text-align: left;
}
</style>