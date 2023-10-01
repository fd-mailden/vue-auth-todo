<template>
  <main class="main">
    <AppHeader />
    <slot />
  </main>
</template>

<script>
import AppHeader from "@/components/header/AppHeader";

export default {
  name: "DefaultLayout",
  components: { AppHeader },
};
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  padding-top: 1px;
}

header.header-section + * {
  margin-top: 65px;
}
</style>
