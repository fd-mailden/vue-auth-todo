import checkingExistenceUser from "@/helpers/checking-existence-user";
import AppToast from "@/helpers/toast-methods";
import LocalStorage, { LOCAl_STORAGE_KEYS } from "@/helpers/local-storage";
import { APP_ROUTES } from "@/router/routes";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    isLoggedIn: !!LocalStorage.get(LOCAl_STORAGE_KEYS.USER),
    user: LocalStorage.get(LOCAl_STORAGE_KEYS.USER) || null,
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },

    getUserData(state) {
      return state.user;
    },
  },
  mutations: {
    setAuthorized(state, status) {
      state.isLoggedIn = status;
    },

    setUserData(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    login({ commit }, payload) {
      return this._vm.$api.auth
        .login()
        .then(({ data }) => {
          const user = checkingExistenceUser(data, payload);
          if (!user) {
            throw Error("Login error");
          }

          LocalStorage.set(LOCAl_STORAGE_KEYS.USER, user);
          commit("setUserData", user);
          commit("setAuthorized", true);
          AppToast.toastSuccess("Logged in successfully");
          return user;
        })
        .catch((err) => {
          commit("setAuthorized", false);
          LocalStorage.clear(LOCAl_STORAGE_KEYS.USER);
          AppToast.toastError(err.message);
          return Promise.reject(err);
        });
    },

    logout({ dispatch }) {
      dispatch("removeAllCredentials");

      router.push(APP_ROUTES.LOGIN.path).catch(() => {
        return false;
      });
    },

    removeAllCredentials({ commit }) {
      commit("setAuthorized", false);
      commit("setUserData", null);
      LocalStorage.clear(LOCAl_STORAGE_KEYS.USER);
      LocalStorage.clear(LOCAl_STORAGE_KEYS.FAVORITES);
    },
  },
};
