<template>
  <section class="section">
    <br v-if="isBoulet(summoner.participant.name)">
    <b-notification v-if="isBoulet(summoner.participant.name)" type="is-danger" aria-close-label="Close notification">
      Un des matchs de ce joueur ne s'est pas fait avec le bon code de tournoi, faussant les informations.
    </b-notification>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <Infos :json="summoner" />
          <Champions :json="summoner" />
        </div>
        <Statistics :json="summoner" />
      </div>
      <MatchHistory :json="summoner" />
    </div>
  </section>
</template>

<script>
import Infos from '~/components/summoner/Infos'
import Champions from '~/components/summoner/Champions'
import MatchHistory from '~/components/summoner/MatchHistory'
import Statistics from '~/components/summoner/Statistics'
const boulets = require('@/data/boulets.json')

export default {
  validate({ params }) {
    return params.summonerName !== undefined
  },
  components: {
    Infos,
    Champions,
    MatchHistory,
    Statistics
  },
  asyncData({ app, params }) {
    return app.$axios
      .get(app.$axios.defaults.baseURL + 'summoner/' + params.summonerName)
      .then(res => {
        return { summoner: res.data }
      })
  },
  methods: {
    isBoulet: function(name) {
      return boulets.includes(name)
    }
  },
  head() {
    return {
      title: 'La Grosse Ligue - ' + this.summoner.summonerName
    }
  }
}
</script>

<style>
.under {
  top: 100px;
}
</style>
