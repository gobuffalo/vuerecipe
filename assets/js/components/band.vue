<template>
<div>
  <h1 class="page-header">Bands</h1>

  <ul class="list-unstyled">
    <li v-for="band in bands">
      <router-link :to='{name: "showBand", params: {id: band.id}}'>
        <h2>
          {{ band.name }}
        </h2>
      </router-link>
    </li>
  </ul>
</div>
</template>

<script charset="utf-8">
export default {
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
};
</script>
