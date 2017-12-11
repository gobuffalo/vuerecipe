<template>
<div>
  <h1 class="page-header">{{band.name}}</h1>

  <blockquote>
    {{band.bio}}
  </blockquote>

  <ul class="list-unstyled">
    <li v-for="member in members">
      <h2>
        {{member.name}} - {{member.instrument}}
      </h2>
    </li>
  </ul>

</div>
</template>

<script charset="utf-8">
export default {
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
};
</script>
