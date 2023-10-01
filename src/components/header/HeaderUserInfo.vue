<template>
  <div class="user-wrapper">
    <div class="user">
      <figure
        v-if="user"
        class="user-btn__ava"
        :class="{ 'user-btn__ava--default': !user.photo }"
      >
        <img
          :src="user.photo || require('@/assets/images/no-ava.svg')"
          alt=""
        />
      </figure>

      <p class="user-btn__name">{{ user.name }}</p>
      <p v-for="item in userInfo" :key="item" class="user-info__item">
        <span> {{ item.name }}:</span>
        {{ item.value }}
      </p>
    </div>
    <button class="logout-btn" @click.prevent="onLogout">
      <AppIcon componentName="LogoutIcon" />
      Log Out
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HeaderUser",

  data() {
    return {
      isOpenUserDD: false,
    };
  },

  computed: {
    userInfo() {
      return [
        { name: "Email", value: this.user.email },
        { name: "Phone", value: this.user.phone },
        { name: "Website", value: this.user.website },
      ];
    },
    ...mapGetters({
      user: "auth/getUserData",
    }),
  },

  methods: {
    async onLogout() {
      this.logout();
    },
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style lang="scss" scoped>
.user-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
  @media (min-width: map_get($grid-breakpoints, md)) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .user-btn {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    &__ava {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      margin-right: 15px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }

      &--default {
        img {
          object-fit: contain;
          object-position: center bottom;
        }
      }
    }

    &__name {
      font-size: 14px;
      line-height: 21px;
      margin-right: 8px;
      transition: color 0.3s ease;
      color: $body-color;
    }

    &__arrow {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #cbced7;
      transition: border, transform, 0.3s ease;
    }

    &:hover {
      .user-btn__name {
        color: $app-primary;
      }

      .user-btn__arrow {
        border-top: 6px solid $app-primary;
      }
    }

    &--active {
      .user-btn__name {
        color: $app-primary;
      }

      .user-btn__arrow {
        transform: rotate(180deg);
        border-top: 6px solid $app-primary;
      }
    }
  }

  .user-info {
    margin-bottom: 15px;
  }

  .user-info__item {
    font-size: 14px;
    margin: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      color: $app-primary;
    }
  }
}
.logout-btn {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: $app-primary;

  svg {
    width: 20px;
    height: 20px;
    fill: $app-primary;
    margin-right: 8px;
  }
}
</style>
