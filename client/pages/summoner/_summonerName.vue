<template>
  <section class="section">
    <br v-if="isBoulet(summoner.team)" />
    <b-notification
      v-if="isBoulet(summoner.team)"
      type="is-danger"
      aria-close-label="Close notification"
    >
      Un des matchs de ce joueur ne s'est pas fait avec le bon code de tournoi,
      faussant les informations.
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
    Statistics,
  },
  asyncData({ app, params, $router }) {
    return app.$axios
      .get(
        app.$axios.defaults.baseURL +
          'summoner/' +
          encodeURI(params.summonerName)
      )
      .then((res) => {
        res.data.matches.forEach((match) => {
          match.items = []
          // Courtesy of Maxime
          for (let i = 0; i < 6; i++) {
            match.items.push(match[`item${i}`])
          }
        })

        res.data.matches = res.data.matches
          .sort((match) => match.gameCreation)
          .reverse()

        const soloRank = res.data.rank.filter((r) => r.queueType === 'RANKED_SOLO_5x5')
        let rankString = "UNRANKED";
        if (soloRank.length > 0)
          rankString = soloRank[0].tier + ' ' + soloRank[0].rank
        res.data.soloRank = rankString;
        return { summoner: res.data }
      })
      .catch((e) => {
        console.log(e)
        throw { statusCode: 404, message: "L'invocateur n'a pas été trouvé" }
      })
  },
  methods: {
    isBoulet: function (name) {
      return boulets.includes(name)
    },
  },
  head() {
    return {
      title: 'La Grosse Ligue - ' + this.summoner.summonerName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: `Informations sur le joueur ${this.summoner.summonerName} ${
            this.summoner.soloRank.length ? ' | ' + this.summoner.soloRank : ''
          } | Équipe ${this.summoner.team} | Palier ${
            this.summoner.palier
          } | Région ${this.summoner.region}`,
        },
      ],
    }
  },
}
</script>

<style>
.under {
  top: 100px;
}
</style>
