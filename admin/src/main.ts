import Vue from "vue";
import App from "./App.vue";
import "./plugins/element";
import router from "./router";
import axios from "axios";
import "./plugins/avue.js";
// 引入 vue-ele-form
// import EleForm from 'vue-ele-form'
// 注册 vue-ele-form
// Vue.use(EleForm)

Vue.config.productionTip = false;

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

Vue.prototype.$httpajax = http;

// 将 axios 放进 Vue 的原型链中方便访问
Vue.prototype.$http = http;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
