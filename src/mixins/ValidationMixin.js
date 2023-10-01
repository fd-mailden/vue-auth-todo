export const validationMixin = {
  data() {
    return {
      pending: false,
    };
  },

  methods: {
    setField(fieldData, fieldName) {
      this[fieldName] = fieldData;
    },

    async sendData(payloadFields, dispatchName, redirect = null) {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return Promise.reject(new Error("Validation failed"));
      }

      try {
        this.pending = true;
        await this.$store.dispatch(dispatchName, payloadFields);

        console.log(redirect);
        if (redirect) await this.$router.push(redirect);
      } catch (e) {
        this.pending = false;
        return Promise.reject(e);
      }

      this.pending = false;
    },
  },
};
