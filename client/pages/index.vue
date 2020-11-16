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
      title: 'La Grosse Ligue',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'La Grosse Ligue Statistiques'
        }
      ]
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
