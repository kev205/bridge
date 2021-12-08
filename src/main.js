import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/main.css";
import vuetify from "./plugins/vuetify";
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import "element-ui/lib/theme-chalk/index.css";
import firebase from "./firebaseInit";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import store from "./store";

const auth = getAuth(firebase);

onAuthStateChanged(auth, (user) => {
  store.dispatch("fetchUser", user);
});

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  vuetify,
  router,
  store,
}).$mount("#app");
