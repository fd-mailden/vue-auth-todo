<template>
  <div
    class="select"
    v-click-outside="closeSelect"
    :class="{ 'select--selected': isSelectActive, 'select--error': isInvalid }"
  >
    <p v-if="label" class="select-label" @click.prevent="toggleSelect">
      {{ label }}
    </p>

    <button type="button" class="select-btn" @click.prevent="toggleSelect">
      <span class="select-result">{{ currentValue }}</span>
      <AppIcon
        componentName="ChevronIcon"
        class="select-btn__icon"
        :class="{ 'select-btn__opened': isOpenSelect }"
      />
    </button>

    <transition name="fade">
      <div v-show="isOpenSelect" class="select-list">
        <div v-if="search" class="select-search">
          <input
            type="text"
            placeholder="Search"
            class="select-search__input"
            v-model="searchableString"
            @input.prevent="onSearchOptions"
          />

          <button class="select-search__btn">
            <AppIcon componentName="SearchIcon" />
          </button>
        </div>

        <div ref="selectList" v-if="options.length" class="select-items">
          <div
            v-for="(option, index) of options"
            :key="option.id || `option${index}`"
            class="select-item"
            @click.prevent="setActiveOption(option)"
          >
            <p class="select-item__text">{{ option.content }}</p>
          </div>
        </div>

        <p v-else class="no-options">No options</p>

        <transition name="fade">
          <div v-if="pending" class="select-loader">
            <AppButtonLoader color="#4874e6" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import AppButtonLoader from "./AppEmbedLoader";
import { debounce } from "lodash/function";

export default {
  name: "AppSelect",
  components: {
    AppButtonLoader,
  },

  props: {
    options: {
      type: Array,
      required: true,
    },

    label: {
      type: String,
    },

    search: {
      type: Boolean,
      default: false,
    },

    pending: {
      type: Boolean,
      default: false,
    },

    initValue: {
      type: String,
      default: "",
    },

    isInvalid: {
      type: Boolean,
    },
  },

  computed: {
    isSelectActive() {
      return this.currentValue.length;
    },

    onSearchOptionsDebounce() {
      return debounce(function () {
        this.$emit("searchOptions", this.searchableString);
      }, 300);
    },
  },

  data() {
    return {
      searchableString: "",
      isOpenSelect: false,
      currentValue: "",
    };
  },

  methods: {
    onSearchOptions() {
      this.onSearchOptionsDebounce();
    },

    toggleSelect() {
      this.isOpenSelect = !this.isOpenSelect;
    },

    closeSelect() {
      this.isOpenSelect = false;
      this.searchableString = "";
      this.$emit("searchOptions", "");

      if (this.$refs?.selectList?.scrollTop) {
        this.$refs.selectList.scrollTop = 0;
      }
    },

    setActiveOption(option) {
      this.currentValue = option.content;
      this.closeSelect();
      this.$emit("select", option);
    },

    keypressCloseSelect(e) {
      if (!this.isOpenSelect || e.keyCode !== 27) return;

      this.closeSelect();
    },
  },

  created() {
    if (this.initValue) {
      this.currentValue = this.initValue;
    }
  },

  mounted() {
    document.addEventListener("keydown", this.keypressCloseSelect);
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.keypressCloseSelect);
  },
};
</script>

<style lang="scss" scoped>
.select {
  display: inline-flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  margin-bottom: 24px;
}

.select-label {
  font-size: 16px;
  line-height: 1;
  padding: 2px;
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  cursor: pointer;
  color: $light-gray;
  transition: all 0.3s ease;

  &:before {
    content: "";
    background-color: #fff;
    height: 55%;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: -1;
  }
}

.select-btn {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 56px;
  width: 100%;
  overflow: hidden;
  padding: 0;
  background-color: #fff;
  border: 1px solid #d6d8dc;
  border-radius: 8px;

  &__icon {
    margin: 0 20px;
    width: 9px;
    height: 6px;

    &--opened {
      transform: rotate(180deg);
    }
  }

  .select-result {
    flex: 1;
    text-align: left;
    padding-left: 16px;
    font-size: 16px;
    line-height: 24px;
    color: $body-color;
  }
}

.select-list {
  background-color: #fff;
  //border: 1px solid #d6d8dc;
  border-radius: 8px;
  margin-top: 4px;
  padding: 16px 0;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  z-index: 11;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.select-items {
  height: auto;
  min-height: 56px;
  max-height: 150px;
  overflow-y: auto;
  margin-right: 2px;

  @media (min-width: map_get($grid-breakpoints, md)) {
    max-height: 220px;
  }

  &::-webkit-scrollbar {
    width: 2px;
    background-color: #f1f1f1;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $app-primary;
    border-radius: 8px;
    outline: none;
  }

  .select-item {
    width: 100%;
    padding: 10px 16px;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 16px;
      height: 1px;
      right: 16px;
      background-color: #f7f5f5;
    }

    &:hover {
      background-color: #f1f1f1;
    }

    &__image {
      width: 32px;
      height: 32px;
      object-fit: contain;
      object-position: center center;
      margin-right: 16px;
    }

    &__text {
      font-size: 16px;
      line-height: 24px;
    }

    &:last-child {
      border: none;

      &:after {
        display: none;
      }
    }
  }
}

.select-search {
  width: 100%;
  padding: 0 16px;
  height: 56px;
  display: flex;
  align-items: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 16px;
    height: 1px;
    right: 16px;
    background-color: #f7f5f5;
  }

  &__input {
    height: 100%;
    padding-left: 16px;
    border: none;
    font-size: 16px;
    line-height: 24px;
    max-width: initial;
    width: 0;
    flex-grow: 1;
    border-radius: 0;

    &::placeholder {
      font-size: 16px;
      color: $light-gray;
    }
  }

  &__btn {
    height: 100%;
    padding: 0 16px;

    svg {
      width: 16px;
      height: 16px;
      fill: $light-gray;
    }
  }
}

.select--selected {
  .select-label {
    font-size: 13px;
    color: $body-color;
    top: 0;
  }
}

.select--error {
  .select-btn {
    border: 2px solid $red;
  }

  .select-label {
    color: $red;
  }
}

.no-options {
  font-size: 14px;
  padding: 20px 10px 10px;
  text-align: center;
  color: $light-gray;
}

.select-loader {
  position: absolute;
  left: 0;
  top: 56px;
  right: 0;
  bottom: 0;
  background-color: rgba(#fff, 0.8);
}
</style>
