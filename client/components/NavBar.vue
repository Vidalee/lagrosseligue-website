<template>
  <nav class="navbar is-fixed-top tile-color" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/" @click.native="changePage">
        <img src="/GL_logo_png.png">
      </router-link>

      <a
        role="button"
        :class="{ 'is-active': showNav }"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="showNav = !showNav"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navMenu" class="navbar-menu color-bg" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <router-link class="navbar-item tile-color" to="/" @click.native="changePage">
          Accueil
        </router-link>

        <router-link class="navbar-item tile-color" to="/statistics" @click.native="changePage">
          Statistiques
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field">
            <b-switch :value="isDark" class="text-color" @input="darkmode">
              Mode sombre
            </b-switch>
          </div>
        </div>
        <div class="navbar-item color-bg">
          <div class="buttons">
            <a href="https://discord.gg/lagrosseligue" class="button has-text-white" style="background-color: #7289DA;" target="_blank">
              <strong>Discord</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  head: {
    script: [{ type: 'text/javascript', href: '../static/navbar.js' }]
  },
  props: {
    darktheme: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showNav: false
    }
  },
  computed: {
    isDark() {
      return this.darktheme
    }
  },
  methods: {
    darkmode: function(value) {
      localStorage.setItem('theme', value ? 'dark' : 'light')
      this.$el.parentElement.setAttribute(
        'data-theme',
        value ? 'dark' : 'light'
      )
    },
    changePage: function() {
      this.showNav = false
    }
  }
}
</script>
