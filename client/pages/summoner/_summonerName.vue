<template>
  <section class="section">
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
