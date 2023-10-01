<template>
  <header class="header-section">
    <div class="container">
      <HeaderUser v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import HeaderUser from "./HeaderUserInfo";
import { mapGetters } from "vuex";

export default {
  components: { HeaderUser },

  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },
};
</script>

<style scoped lang="scss" src="./index.scss" />
