<template>
  <div
    class="field"
    :class="{
      'field--focused': onFocus,
      'field--required': required,
      'field--error': isInvalid,
    }"
  >
    <label :for="id" class="field__label">
      {{ label }}
      <sup v-if="required">*</sup>
    </label>
    <input
      autocomplete
      ref="field"
      :id="id"
      :type="isPassword ? passwordType : type"
      class="field__input"
      @focus="focus"
      @blur="blur"
      @input="oninput"
      v-model="inputValue"
      :disabled="disabled"
    />

    <transition name="fade">
      <div
        v-if="isInvalid"
        class="error"
        @mouseenter="openErrorMessage"
        @mouseleave="closeErrorMessage"
      >
        <button type="button" class="error__btn">
          <AppIcon componentName="ErrorIcon" />
        </button>

        <transition name="fade">
          <div v-if="isVisibleErrorMessage" class="error__message">
            <slot name="error" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import uniqueId from "lodash/uniqueId";

export default {
  name: "AppField",
  props: {
    value: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
    },
    type: {
      type: String,
      default: "text",
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initFocus: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      id: uniqueId("field"),
      onFocus: !!this.value,
      inputValue: this.value,
      isVisibleErrorMessage: false,
      isOpenPassword: false,
      isPassword: this.type === "password",
    };
  },

  computed: {
    passwordType() {
      return this.isOpenPassword ? "text" : "password";
    },
  },

  methods: {
    focus() {
      this.onFocus = true;
    },

    blur() {
      this.onFocus = Boolean(this.inputValue);
    },

    oninput() {
      this.$emit("input", this.inputValue);
    },

    toggleErrorMessage() {
      this.isVisibleErrorMessage = !this.isVisibleErrorMessage;
    },

    openErrorMessage() {
      this.isVisibleErrorMessage = true;
    },

    closeErrorMessage() {
      this.isVisibleErrorMessage = false;
    },
  },

  beforeMount() {
    this.inputValue = this.value;
    this.onFocus = !!this.value;
  },

  mounted() {
    if (this.initFocus) {
      this.$refs.field.focus();
    }
  },
};
</script>

<style lang="scss" scoped>
.field {
  width: 100%;
  position: relative;
  margin-bottom: 24px;

  &__label {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    padding: 3px;
    color: $light-gray;
    z-index: 2;
    background-color: #fff;
    border-radius: 8px;

    sup {
      font-size: 12px;
      line-height: 16px;
      color: #da1414;
      opacity: 0;
      transition: all 0.3s ease;
    }
  }

  &__input {
    display: block;
    width: 100%;
    border: 1px solid #d6d8dc;
    border-radius: 8px;
    height: 56px;
    padding: 10px 55px 10px 16px;
    font-size: 16px;
    position: relative;
    z-index: 1;

    &:disabled {
      background-color: #fff;
    }
  }

  &--focused {
    .field__label {
      font-size: 13px;
      color: $body-color;
      top: 0;
      cursor: text;
      line-height: 20px;

      sup {
        opacity: 1;
      }
    }
  }

  &--no-writing {
    .field__input {
      border: 1px solid #d6d8dc;
      color: $body-color;
      -webkit-text-fill-color: $body-color;
      opacity: 1;
    }
  }

  &--error {
    .field__input {
      border: 2px solid $red;
      color: $red;
    }

    .field__label {
      color: $red;
    }
  }
}

::v-deep .error {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    svg {
      width: 20px;
      height: 20px;
      fill: #e26262;
    }
  }

  &__message {
    padding: 12px;
    background-color: #ffe8e8;
    border-radius: 8px;
    position: absolute;
    right: 10px;
    top: 100%;
    width: 210px;
    font-size: 12px;
    line-height: 20px;
    font-weight: 500;
    color: $red;
    z-index: 5;
  }
}

.field--error {
  .password-toggle-btn {
    right: 35px;
  }
}
</style>
