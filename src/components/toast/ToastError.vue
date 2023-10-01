<template>
  <div class="toast toast--error">
    <div class="toast-header">
      <AppIcon componentName="ErrorIcon" class="toast-header__icon" />
      <p class="toast-header__title">Error</p>

      <button
        type="button"
        class="toast-header__btn"
        @click="$emit('close-toast')"
      >
        <AppIcon componentName="CloseIcon" />
      </button>
    </div>

    <p class="toast-text">
      {{ text }}
    </p>

    <ul v-if="list.length" class="toast-list">
      <li v-for="(listItem, index) of list" class="toast-list" :key="index">
        {{ listItem }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ToastError",
  props: {
    text: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss" src="./index.scss" />
