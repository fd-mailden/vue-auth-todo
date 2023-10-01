<template>
  <div class="toast toast--success">
    <div class="toast-header">
      <AppIcon componentName="SuccessIcon" class="toast-header__icon" />
      <p class="toast-header__title">Success</p>

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
  name: "ToastSuccess",
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
