<template>
  <form ref="authForm" class="todo-form" @submit.prevent="onSubmitForm">
    <AppField
      label="User id"
      required
      :isInvalid="$v.userId.$error"
      @input="setField($event, 'userId')"
      initFocus
    >
      <template v-slot:error>
        <p v-if="!$v.userId.required">This field is required</p>
        <p v-if="!$v.userId.numeric">Only numbers are allowed</p>
      </template>
    </AppField>

    <AppField
      label="Title"
      required
      :isInvalid="$v.title.$error"
      @input="setField($event, 'title')"
    >
      <template v-slot:error>
        <p v-if="!$v.title.required">This field is required</p>
      </template>
    </AppField>
    <AppButton
      title="Create todo"
      class="form-btn"
      className="primary"
      type="submit"
      :pending="pending"
    />
  </form>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import { validationMixin } from "@/mixins/ValidationMixin";
export default {
  name: "TodoForm",
  mixins: [validationMixin],

  computed: {},

  data() {
    return {
      userId: "",
      title: "",
    };
  },

  validations: {
    userId: {
      required,
      numeric,
    },
    title: {
      required,
    },
  },

  methods: {
    async onSubmitForm() {
      const payload = {
        id: this.$uuid.v4(),
        userId: this.userId,
        title: this.title,
        completed: false,
      };

      try {
        await this.sendData(payload, "todo/createTodo");
        this.$emit("cancel");
      } catch (e) {
        console.error(e);
        return;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-btn {
  width: 100%;
}
</style>
