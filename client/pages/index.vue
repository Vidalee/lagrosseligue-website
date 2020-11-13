<template>
  <section class="section">
    <Search />
  </section>
</template>

<script>
import Search from '~/components/Search'

export default {
  components: {
    Search
  },
  head() {
    return {
      title: 'La Grosse Ligue'
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  background-image: url('../static/bg.jpg');

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
