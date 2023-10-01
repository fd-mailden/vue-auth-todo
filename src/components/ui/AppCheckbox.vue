<template>
  <div
    class="checkbox"
    :class="{ 'checkbox--checked': value }"
    @click.prevent="toggleCheckbox"
  >
    <div class="checkbox__field">
      <AppIcon componentName="CheckboxIcon" />
    </div>
    <p class="checkbox__label">{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: "AppCheckbox",

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      checkboxValue: false,
    };
  },

  methods: {
    toggleCheckbox() {
      this.$emit("change", !this.value);
    },
  },

  created() {
    // this.checkboxValue = this.value;
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  margin-bottom: 24px;
  display: inline-flex;
  align-items: center;
  width: auto;
  max-width: 100%;
  cursor: pointer;

  &__field {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    border: 1px solid #d6d8dc;
    border-radius: 4px;
    width: 16px;
    height: 16px;
    position: relative;
    transition: border-color 0.3s ease;

    svg {
      fill: $app-primary;
      opacity: 0;
      transition: opacity 0.3s ease;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__label {
    font-size: 14px;
    color: $light-gray;
  }

  &:hover {
    .checkbox__field {
      border-color: $app-primary;
    }

    .checkbox__label {
      color: $app-primary;
    }
  }

  &--checked {
    .checkbox__field {
      border-color: $app-primary;

      svg {
        opacity: 1;
      }
    }
  }
}
</style>
