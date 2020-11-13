<template>
  <div class="tile is-parent" style="margin-top:200px;height:250px;">
    <article class="tile is-child notification under color-bg" style="">
      <p class="title text-color">
        Historique de parties
      </p>
      <div class="content">
        <div class="columns">
          <div v-for="game in json" :key="game.opponent" class="column m-result has-text-centered" :style="'font-size:large;margin:5px;background-color: ' + (game.win ? 'hsl(171, 100%, 41%)' : 'hsl(348, 100%, 61%);')">
            <strong>
              VS <br>{{ game.opponent }}<br>
              {{ game.win ? 'Victoire' : 'Défaite' }}<br>
            </strong>
            <button class="button is-primary">
              Voir les détails du match
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    json: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.m-result {
  height: 100%;
  max-height: 140px;
}
</style>
