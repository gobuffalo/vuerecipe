import Vue from "vue";
import template from "./template.html";

const BandComponent = Vue.extend({
  template,

  data() {
    return {
      band: {},
      members: {}
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
      let id = this.$route.params.id;

      let req = $.getJSON(`/api/bands/${id}`);
      req.done(data => {
        this.band = data;
      });

      req = $.getJSON(`/api/bands/${id}/members`);
      req.done(data => {
        this.members = data;
      });
    }
  }
});

export default BandComponent;
