<template>
  <component
    :is="tag"
    v-bind="$attrs"
    :to="to"
    class="btn"
    :class="btnClasses"
    @click="$emit('click', $event)"
    :disabled="disabled || pending"
  >
    <AppIcon v-if="iconName" :componentName="iconName" class="btn__icon" />

    <span class="btn__text">{{ title }}</span>

    <transition name="fade">
      <AppEmbedLoader v-if="pending" class="button-loader" />
    </transition>
  </component>
</template>

<script>
import AppEmbedLoader from "./AppEmbedLoader";

export default {
  name: "AppButton",
  components: {
    AppEmbedLoader,
  },

  props: {
    title: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "button",
    },
    iconName: {
      type: String,
      default: "",
    },
    pending: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    btnClasses() {
      if (!this.className) return "";

      const btnClasses = [];

      btnClasses.push(`btn--${this.className}`);

      if (this.pending) {
        btnClasses.push("btn--pending", "btn--disabled");
      }

      return btnClasses;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  border-radius: 8px;
  height: 55px;
  padding: 10px 20px;
  min-width: 200px;
  position: relative;
  cursor: pointer;

  &__text {
    transition: all 0.3s ease;
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }

  &--secondary {
    border: 1px solid $app-primary;

    .btn__text {
      color: $app-primary;
    }

    svg {
      fill: $app-primary;
    }

    &:hover {
      background-color: $app-primary;
      border-color: $app-primary;
      color: #ffffff;

      .btn__text {
        color: #ffffff;
      }

      svg {
        fill: #ffffff;
      }
    }
  }

  &--red {
    border: 1px solid $red;

    .btn__text {
      color: $red;
    }

    &:hover {
      background-color: $red;

      .btn__text {
        color: #ffffff;
      }
    }
  }

  &--primary {
    background-color: $app-primary;
    border-color: $app-primary;
    border: 1px solid $app-primary;

    .btn__text {
      color: #fff;
    }

    svg {
      fill: #fff;
    }

    &:hover {
      background-color: $secondary;
      border-color: $secondary;
    }
  }

  &--white {
    color: $app-primary;
    background-color: #fff;
    border: 1px solid #fff;

    svg {
      fill: $app-primary;
    }

    &:hover {
      background-color: $app-primary;

      .btn__text {
        color: #ffffff;
      }

      svg {
        fill: #fff;
      }
    }
  }

  &--disabled,
  &:disabled {
    user-select: none;
    pointer-events: none;
    cursor: default;
    background-color: #a5baf2;
    border-color: #a5baf2;

    .btn__text {
      color: #fff;
    }
  }

  &--pending {
    .btn__text {
      opacity: 0;
    }

    .btn__icon {
      opacity: 0;
    }
  }
}
</style>
