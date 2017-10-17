import Vue from "vue";
import template from "./template.html";

const AppComponent = Vue.extend({
  template,

  data() {
    return {
      bands: []
    };
  },

  created() {
    this.fetchData();
  },

  watch: {
    $route: "fetchData"
  },

  methods: {
    fetchData: function() {
      let req = $.getJSON("/api/bands");
      req.done(data => {
        this.bands = data;
      });
    }
  }
});

export default AppComponent;
