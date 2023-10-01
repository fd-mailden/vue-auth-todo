<template>
  <div v-if="todos.length > 0" class="container todo-list">
    <TransitionGroup name="todo-list">
      <TodoItem
        v-for="todo in todos"
        :todo="todo"
        :key="todo.id"
        @toggleFavorite="$emit('toggleFavorite', todo.id)"
      />
    </TransitionGroup>
  </div>
  <div v-else class="container todo-list__empty">
    <h3>List todos empty</h3>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  name: "TodoList",
  components: { TodoItem },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  margin-top: 20px;

  &__empty {
    margin-top: 40px;
    text-align: center;
  }
}

.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.5s ease;
}
.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
