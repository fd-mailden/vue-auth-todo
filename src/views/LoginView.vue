<template>
  <div class="login">
    <form ref="authForm" class="login-form" @submit.prevent="onSubmitForm">
      <h1 class="auth-title">Login</h1>

      <AppField
        label="Username"
        required
        :isInvalid="$v.name.$error"
        @input="setField($event, 'name')"
        initFocus
      >
        <template v-slot:error>
          <p v-if="!$v.name.required">This field is required</p>
          <p v-if="!$v.name.username">Incorrect username format</p>
        </template>
      </AppField>

      <AppField
        label="Phone Number"
        required
        :isInvalid="$v.phone.$error"
        @input="setField($event, 'phone')"
      >
        <template v-slot:error>
          <p v-if="!$v.phone.required">This field is required</p>
          <p v-if="!$v.phone.phoneNumber">Incorrect phone format</p>
        </template>
      </AppField>

      <AppButton
        title="Log In"
        class="form-btn"
        className="primary"
        type="submit"
        :pending="pending"
      />
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { APP_ROUTES } from "@/router/routes";

import { validationMixin } from "@/mixins/ValidationMixin";

export default {
  name: "LoginView",
  mixins: [validationMixin],

  computed: {},

  data() {
    return {
      name: "",
      phone: "",
    };
  },

  validations: {
    name: {
      required,
    },
    phone: {
      required,
    },
  },

  methods: {
    async onSubmitForm() {
      const payload = {
        name: this.name,
        phone: this.phone,
      };

      try {
        await this.sendData(payload, "auth/login", APP_ROUTES.TODO);
      } catch (e) {
        console.error(e);
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  background-color: $light-gray;
  padding: 30px;
  border-radius: 8px;
}
.auth-title {
  margin: auto 30px;
  text-align: center;
}

.form-btn {
  width: 100%;
}
</style>
