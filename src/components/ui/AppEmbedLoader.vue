<template>
  <div
    class="loader-embed"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
    }"
  >
    <div
      id="loader-btn"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
        'border-top-color': color,
        'border-right-color': color,
      }"
    >
      <span
        class="before"
        :style="{
          'border-top-color': color,
          'border-left-color': color,
        }"
      ></span>
      <span
        class="after"
        :style="{
          'border-top-color': color,
          'border-right-color': color,
        }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppEmbedLoader",

  props: {
    size: {
      type: [Number, String],
      default: 30,
    },

    color: {
      type: String,
      default: "#fff",
    },
  },
};
</script>

<style lang="scss" scoped>
.loader-embed {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#loader-btn {
  display: inline-flex;
  border-radius: 50%;
  border: 2px solid transparent;
  animation: spin 1.7s linear infinite;
  z-index: 11;

  .before {
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border-radius: 50%;
    border: 2px solid transparent;
    animation: spin-reverse 0.6s linear infinite;
  }

  .after {
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    border-radius: 50%;
    border: 2px solid transparent;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}
</style>
