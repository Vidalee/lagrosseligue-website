<template>
  <div :data-theme="darkTheme">
    <div class="background" />
    <br v-if="filtering"><br v-if="filtering">
    <b-notification v-if="filtering" type="is-danger" aria-close-label="Close notification">
      Je suis au train de développer de nouveaux outils pour récupérer les parties étant donné que ce split de la Grosse Ligue n'est plus sous Toornament. C'est pour cette raison que certains équipes ou historiques de parties peuvent paraître un peu bizarre. - Vivi
    </b-notification>
    <NavBar :darktheme="darkTheme === 'dark'" />
    <section class="main-content">
      <nuxt />
    </section>
    <CookieControl style="bg-color" />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'

export default {
  components: {
    NavBar
  },
  data: () => {
    return {
      show: false,
      filtering: process.env.filtering,
      darkTheme: process.browser
        ? localStorage.getItem('theme')
          ? localStorage.getItem('theme')
          : 'dark'
        : 'dark'
    }
  },
  mounted: function() {
    this.$el.setAttribute('data-theme', localStorage.getItem('theme'))
  }
}
</script>

<style>
:root {
  --color: rgb(74, 74, 74);
  --bg-color: white;
  --bg-color-reverse: rgb(23, 27, 37);
  --bg-color-light: hsl(0, 0%, 93%);
  --button-dark-bg: white;
}

[data-theme='dark'] {
  --color: white;
  --bg-color: rgb(23, 27, 37);
  --bg-color-reverse: white;
  --bg-color-light: rgb(13, 15, 22);
  --button-dark-bg: black;
}

.button-dark > label {
  color: var(--color);
  background-color: var(--button-bg-color);
  transition: all 0.3s;
}
.color-bg {
  background-color: var(--bg-color) !important;

  transition: all 0.3s;
}
.cookieControl {
  background-color: var(--bg-color) !important;
  border-radius: 5px !important;
  transition: all 0.3s;
}
.color-bg-reverse {
  background-color: var(--bg-color-reverse) !important;
  transition: all 0.3s;
}

.tile-color,
.profile-banner {
  color: var(--color) !important;
  background-color: var(--bg-color) !important;
  transition: all 0.3s;
}

.buttons > a {
  border-left-color: var(--bg-color) !important;
  border-right-color: var(--bg-color) !important;
  border-top-color: var(--bg-color) !important;
  border-bottom-color: var(--bg-color) !important;
  transition: all 0.3s;
}

.text-color,
title {
  color: var(--color) !important;
  transition: all 0.3s;
}

.tile-color-light {
  color: var(--color) !important;
  background-color: var(--bg-color-light) !important;
  transition: all 0.3s;
}

html {
  height: 100%;
}

.background {
  background-image: url('../static/bg.webp');

  /* Full height */

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
}

a {
  text-decoration: none !important;
}
</style>
