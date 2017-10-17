require("expose-loader?$!expose-loader?jQuery!jquery");
require("bootstrap-sass/assets/javascripts/bootstrap.js");

import Vue from "vue";
import VueRouter from "router";
Vue.use(VueRouter);

import AppComponent from "./components/app.vue";
import BandComponent from "./components/band.vue";

const routes = [
  {path: "/band/:id", component: BandComponent, name: "showBand"},
  {path: "/", component: AppComponent}
];

const router = new VueRouter({
  mode: "history",
  routes
});

const app = new Vue({
  router
}).$mount("#app");
