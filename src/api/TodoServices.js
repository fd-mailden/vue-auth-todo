import $http from "./BaseHttpServices";
export default {
  fetchTodos() {
    return $http.get("/todos/");
  },
};
