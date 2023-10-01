<template>
  <section class="auth-section">
    <div class="auth">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style lang="scss" scoped>
.auth-section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.auth {
  padding: 30px 20px;
  background-color: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: map_get($grid-breakpoints, md)) {
    max-width: 625px;
  }

  @media (min-width: map_get($grid-breakpoints, lg)) {
    min-width: 500px;
    flex-shrink: 1;
  }

  @media (min-width: map_get($grid-breakpoints, xl)) {
    padding: 50px 90px 40px 90px;
  }
}
</style>
