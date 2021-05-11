<template>
  <div>
    <div v-if="gettersAuthData.role === 'ROLE_ADMIN'">
      <h2>Admin Panel</h2>
      <hr />
      <h3>Endre rolle for en bruker</h3>
      <form>
        <div class="mb-3">
          <label for="txtusername" class="form-label">Bruker ID</label>
          <input
            id="txtusername"
            v-model="v$.userId.$model"
            type="text"
            placeholder="Fyll inn Bruker ID - eks. 1"
            class="form-control"
            :class="{
              'is-invalid': v$.userId.$error,
              'is-valid': !v$.userId.$invalid
            }"
            required
            autofocus
          />
          <div v-if="v$.userId.$error">
            <span v-if="v$.userId.required.$invalid" class="errortext"
              >Vennligst fyll inn en Bruker ID (tall). Eks. 1</span
            >
            <span v-if="v$.userId.numeric.$invalid" class="errortext"
              >Bruker ID må være et tall. Eks. 1</span
            >
          </div>
        </div>
        <div class="mb-3">
          <label for="txtusername" class="form-label">Ny Rolle</label>
          <!--<input type="number" min="1" max="3" placeholder="1 = User, 2 = Organizer, 3 = Admin" class="form-control" id="txtusername" v-model.number="v$.roleId.$model">-->
          <select
            v-model.number="v$.roleId.$model"
            class="form-select"
            :class="{
              'is-invalid': v$.roleId.$error,
              'is-valid': !v$.roleId.$invalid
            }"
          >
            <option value="" disabled selected hidden>Velg rolle...</option>
            <option value="1">Bruker</option>
            <option value="2">Arrangør</option>
            <option value="3">Admin</option>
          </select>
          <span v-if="v$.roleId.$error" class="errortext"
            >Vennligst velg inn rolle Id, 1 = User, 2 = Organizer, 3 =
            Admin</span
          >
        </div>
      </form>
      <button :disabled="hasErrors" class="btn btn-dark" @click="updateRole">
        Endre rolle
      </button>
      <br />
      <button class="tilbakeknapp btn btn-outline-dark" @click="$router.go(-1)">
        Tilbake
      </button>
    </div>
    <div v-if="gettersAuthData.role !== 'ROLE_ADMIN'">
      <hr />
      <h2>Du er ikke autorisert for denne tjenesten!</h2>
    </div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { numeric, required, between } from "@vuelidate/validators";
import AuthoService from "../../services/AuthoService";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      v$: useValidate(),
      userId: "",
      roleId: "",
      error: ""
    };
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
        between: between(1, 3)
      }
    };
  },
  computed: {
    hasErrors() {
      return this.v$.$invalid;
    },
    ...mapGetters("auth", {
      gettersAuthData: "getAuthData"
    })
  },
  methods: {
    updateRole() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        const url =
          "/auth/updateRole?userId=" +
          this.v$.userId.$model +
          "&roleId=" +
          this.v$.roleId.$model;
        AuthoService.put(url)
          .then(() => {
            alert("Rolle endret");
          })
          .catch(error => {
            this.error = "error";
            if (error.response.status == 403) {
              alert("Kan ikke bytte din egen rolle");
            }
            console.log(error);
          });
      } else {
        alert("Kunne ikke sende forespørsel, sjekk skjemaet på nytt");
      }
    }
  }
};
</script>

<style>
.errortext {
  color: red;
}
</style>
