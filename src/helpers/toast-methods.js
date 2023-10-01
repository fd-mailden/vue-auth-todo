import Vue from "vue";
import ToastError from "@/components/toast/ToastError.vue";
import ToastSuccess from "@/components/toast/ToastSuccess.vue";

const vueToast = new Vue();

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.4,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: false,
  rtl: false,
};

export default {
  toastError(text = null, list = []) {
    const toastComponent = {
      component: ToastError,

      props: {
        text: text || "Something went wrong ...",
        list: list,
      },
    };

    vueToast.$toast(toastComponent, toastOptions);
  },
  toastSuccess(text = null) {
    const toastComponent = {
      component: ToastSuccess,

      props: {
        text: text || "Things are good!",
      },
    };

    vueToast.$toast(toastComponent, toastOptions);
  },
};
