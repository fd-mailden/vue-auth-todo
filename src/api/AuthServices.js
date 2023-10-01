import $http from "./BaseHttpServices";
export default {
  login() {
    return $http.get("/users/");
  },
};
