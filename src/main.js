import Vue from "vue";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";
import Toast from "vue-toastification";
import UUID from "vue-uuid";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "@/api/BaseHttpServices";
import apiService from "@/api";
import components from "@/components/ui";
import layouts from "@/layouts";
import directives from "@/directives";

const toastOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 3,
  newestOnTop: true,
};

Vue.prototype.$api = apiService;
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Toast, toastOptions);
Vue.use(Vuelidate);
Vue.use(UUID);

components.forEach((component) => {
  Vue.component(component.name, component);
});

directives.forEach((directive) => {
  Vue.directive(directive.name, directive);
});

layouts.forEach((layout) => {
  Vue.component(layout.name, layout);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
