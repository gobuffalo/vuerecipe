<template>
<div id="bandpage">
  <h1 class="page-header">{{band.name}}</h1>

  <blockquote>
    {{band.bio}}
  </blockquote>

    <h2 v-for="member in members">
      {{member.name}} - {{member.instrument}}
    </h2>
</div>
</template>

<script>
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

  methods: {
    fetchData: function() {
      let id = this.$route.params.id;

      axios.get('/api/bands/' + id)
        .then(
          response => {
            this.band = response.data;
          }
        )

      axios.get('/api/bands/' + id + '/members')
        .then(
          response => {
            this.members = response.data;
          }
        )
    }
  }
};
</script>

<style lang="scss">
  // Don't forget you can do this in vue components,
  // really helps when you are doing v-bind:class / :class
</style>