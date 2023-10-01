import axios from "axios";
import AppToast from "@/helpers/toast-methods";

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}`,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const errors = error?.response?.data?.errors;
    const message = error?.response?.data?.message;
    let convertedErrors = [];

    if (errors && Object.keys(errors).length) {
      convertedErrors = Object.keys(errors).map((key) => {
        return `${key}: ${errors[key][0]}`;
      });
    }

    AppToast.toastError(message, convertedErrors);

    return Promise.reject(error);
  }
);

export default instance;
