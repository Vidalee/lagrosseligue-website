<template>
  <nav class="navbar is-fixed-top tile-color" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/GL_logo_png.png">
      </router-link>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item tile-color" to="/">
          Accueil
        </router-link>

        <router-link class="navbar-item tile-color" to="/statistics">
          Statistiques
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="field">
            <b-switch v-model="darktheme" class="text-color" @input="darkmode">
              Mode sombre
            </b-switch>
          </div>
        </div>
        <div class="navbar-item">
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
  methods: {
    darkmode: function(value) {
      localStorage.setItem('theme', value ? 'dark' : 'light')
      this.$el.parentElement.setAttribute(
        'data-theme',
        value ? 'dark' : 'light'
      )
    }
  }
}
</script>
