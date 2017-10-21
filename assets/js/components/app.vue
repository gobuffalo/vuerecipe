<template>
<div id="bands">
  <h1 class="page-header">Bands</h1>

  <h2 v-for="band in bands">
      <router-link :to='{name: "showBand", params: {id: band.id}}'>
          {{ band.name }}
      </router-link>
  </h2>
</div>
</template>

<script>
export default {
  data() {
    return {
      bands: []
    }
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      axios.get('/api/bands')
        .then(
          response => {
            this.bands = response.data;
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

