<template>
  <section class="section">
    <br><br><br>
    
    <div class="container">
      <div class="color-bg text-color" style="border-radius: 5px;margin-inline: 20px 20px;">
        <br>
        <div class="legal-content">
          <p class="title is-1 text-color">
            Mentions légales
          </p>
          <p style="font-size: x-large;font-weight: 600;">
            Hébergeur
          </p><br>
          O.V.H 2 Rue Kellermann, 59100 Roubaix
          <p style="font-size: x-large;font-weight: 600;">
            Politique de cookies<br>
          </p>
          Le site utilise 2 types de cookies:
          <br><br>
          Des cookies nécessaires<br>
          Ils permettent simplement de retenir vos préférences quant à la gestion des cookies.<br><br>

          Des cookies de performances<br>
          Les cookies liés à Google Analytics (Extension pour éviter le tracking). Ceci sont anonymisés, ils nous permettent d'analyser le trafic pour améliorer le site. Vous pouvez les désactiver à travers notre gestionnaire de cookies.<br>
        </div>
        <br>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: 'La Grosse Ligue - Mentions Légales',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
.legal-content {
  margin-inline: 20px 20px;
  line-height: 22px;
}

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
