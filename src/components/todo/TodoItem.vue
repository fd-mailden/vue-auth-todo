<template>
  <div class="row todo">
    <div class="col-lg-2 todo__info">
      <p><span>User id: </span>{{ todo.userId }}</p>
    </div>
    <div class="col-lg-5 todo__info">
      <p><span>Title: </span>{{ todo.title }}</p>
    </div>
    <div class="col-lg-3 todo__info">
      <p>
        <span>Status: </span> {{ todo.completed ? "completed" : "uncompleted" }}
      </p>
    </div>
    <div class="col-lg-2 d-flex justify-content-end">
      <AppCheckbox
        :value="!!todo.favorite"
        @change="$emit('toggleFavorite')"
        label="Favorites"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  padding: 15px;
  border-radius: 8px;
  border: 1px solid $app-primary;
  box-shadow: 0 4px 16px rgba(65, 64, 64, 0.05);

  &:not(:last-child) {
    margin-bottom: 12px;
  }
  &__info {
    color: $app-primary;
    span {
      color: $light-gray;
    }

    @media (max-width: map_get($grid-breakpoints, lg)) {
      margin-bottom: 6px;
    }
  }

  ::v-deep .checkbox {
    margin-bottom: 0;
  }
}
</style>
