<template>
  <div v-if="!isLoading" class="home">
    <div class="container">
      <div class="row todo-filter">
        <div class="col-12 col-xl-3">
          <AppField initFocus label="Search" @input="setSearchQuery" />
        </div>
        <div class="col-12 col-xl-3">
          <AppSelect
            label="Filter by status"
            initValue="All"
            :options="statusOptions"
            @select="setCurrentStatus"
          />
        </div>
        <div class="col-12 col-xl-3">
          <AppSelect
            label="Filter by user id"
            initValue="All"
            :options="userIdOptions"
            @select="setCurrentUserId"
          />
        </div>
        <div class="col-12 col-xl-3">
          <AppButton
            title="Create todo"
            className="primary"
            class="todo-filter__btn"
            @click.prevent="openModal"
          />
        </div>
      </div>
    </div>
    <TodoList :todos="filteredTodos" @toggleFavorite="toggleFavorite" />
    <AppModal
      :isOpenModal="isOpenModal"
      width="600px"
      @close="closeModal"
      class="upload-photo-modal"
    >
      <TodoForm @cancel="closeModal" />
    </AppModal>
  </div>
  <div v-else>
    <AppLoader />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TodoList from "@/components/todo/TodoList";
import TodoForm from "@/components/todo/TodoForm";

import {
  DEFAULT_OPTION_USER_ID,
  STATUS_OPTIONS,
  STATUSES,
  getUserIdOptions,
  filterByStatus,
  filterByUserId,
  filterByTitle,
} from "@/helpers/filters";

export default {
  name: "TodoView",
  components: { TodoList, TodoForm },

  data() {
    return {
      isLoading: false,
      isOpenModal: false,
      searchQuery: "",
      statusOptions: STATUS_OPTIONS,
      selectedStatus: STATUSES.ALL.key,
      selectedUserId: DEFAULT_OPTION_USER_ID.key,
    };
  },

  computed: {
    ...mapGetters({
      todos: "todo/getTodos",
    }),

    userIdOptions() {
      return getUserIdOptions(this.todos);
    },

    filteredTodos() {
      const byTitle = filterByTitle(this.searchQuery, this.todos);
      const byStatus = filterByStatus[this.selectedStatus](byTitle);
      const byUserId = filterByUserId(this.selectedUserId, byStatus);
      return byUserId;
    },
  },

  methods: {
    ...mapActions({
      fetchTodos: "todo/fetchTodos",
      toggleFavorite: "todo/toggleFavorite",
    }),

    async getTodos() {
      try {
        this.setIsLoading(true);
        await this.fetchTodos();
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => this.setIsLoading(false), 300);
      }
    },

    setSearchQuery(newValue) {
      this.searchQuery = newValue;
    },

    setCurrentStatus(option) {
      this.selectedStatus = option.key;
    },

    setCurrentUserId(option) {
      this.selectedUserId = option.key;
    },

    setIsLoading(flag) {
      this.isLoading = flag;
    },

    openModal() {
      this.isOpenModal = true;
    },
    closeModal() {
      this.isOpenModal = false;
    },
  },
  created() {
    this.getTodos();
  },
};
</script>

<style lang="scss" scoped>
.todo-filter {
  margin-top: 80px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(65, 64, 64, 0.05);

  &__btn {
    width: 100%;
    min-width: 100%;
  }

  @media (min-width: map_get($grid-breakpoints, xl)) {
    ::v-deep .field,
    .select {
      margin-bottom: 0;
    }
  }
}
</style>
