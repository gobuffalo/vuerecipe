/**
 * Since we've moved the router, we only want to keep routes in here
 * that way they're all together and we don't have to scroll through
 * multiple lines of code that was cluttering our app.js
 */

import VueRouter from "router";
Vue.use(VueRouter);

import AppComponent from "./components/app.vue";
import BandComponent from "./components/band.vue";
/**
 * Mode set to history to remove the hash e.g: 
 * /#/band/some-uuid-for-a-band -> /band/some-uuid-for-a-band
 */


const router = new VueRouter({
  mode: "history",
  routes: [
    {path: "/band/:id", component: BandComponent, name: "showBand"},
    {path: "/", component: AppComponent}
  ]
});

const app = new Vue({
  router
}).$mount("#app");