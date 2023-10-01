<template>
  <transition name="fade">
    <div v-if="isOpenModal" class="modal-wrap">
      <div class="modal-mask" @click.prevent="$emit('close')" />

      <div class="modal" :style="{ width }">
        <button
          type="button"
          class="modal__close"
          @click.prevent="$emit('close')"
        >
          <AppIcon componentName="CloseIcon" />
        </button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AppModal",

  props: {
    width: {
      type: String,
      default: "initial",
    },

    isOpenModal: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isOpenModal(isOpenModal) {
      if (isOpenModal) {
        document.querySelector("body").classList.add("body--overflow");

        return;
      }

      document.querySelector("body").classList.remove("body--overflow");
    },
  },

  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.modal-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.5);
  z-index: 1;
}

.modal {
  width: auto;
  max-width: calc(100vw - 60px);
  max-height: calc(100vh - 60px);
  padding: 30px 50px;
  background-color: #fff;
  z-index: 2;
  border-radius: 16px;
  position: relative;

  &__close {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    background-color: $app-primary;
    transform: translate(50%, -50%);
    padding: 0;

    svg {
      width: 13px;
      height: 13px;
      fill: #fff;
    }

    &:hover {
      background-color: $body-color;
    }
  }
}
</style>
