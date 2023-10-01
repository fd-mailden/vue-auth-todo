import {
  getFavoriteIds,
  mergeFavorites,
  toggleFavorite as helperToggleFavorite,
} from "@/helpers/favorites";
import localStorage, { LOCAl_STORAGE_KEYS } from "@/helpers/local-storage";

export default {
  namespaced: true,
  state: {
    todos: [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    setTodos(state, payload) {
      state.todos = payload;
    },

    setTodo(state, payload) {
      state.todos.unshift(payload);
    },
  },
  actions: {
    fetchTodos({ commit }) {
      return this._vm.$api.todo
        .fetchTodos()
        .then(({ data }) => {
          const favoriteIds = localStorage.get(LOCAl_STORAGE_KEYS.FAVORITES);
          const todos = mergeFavorites(data, favoriteIds);
          commit("setTodos", todos);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    createTodo({ commit }, payload) {
      commit("setTodo", payload);
    },
    toggleFavorite({ commit, state }, idTodo) {
      const newTodo = helperToggleFavorite(state.todos, idTodo);

      localStorage.set(LOCAl_STORAGE_KEYS.FAVORITES, getFavoriteIds(newTodo));
      commit("setTodos", newTodo);
    },
  },
};
