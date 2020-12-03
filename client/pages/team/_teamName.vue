<template>
  <section class="section">
    <div class="tile is-ancestor is-vertical">
      <div class="tile">
        <Infos :json="team" />
      </div>
      <!--div class="tile">
        <MatchHistory :json="teamInfo.games" />
      </div-->
    </div>
  </section>
</template>

<script>
import Infos from '~/components/team/Infos'
// import MatchHistory from '~/components/team/MatchHistory'

export default {
  validate({ params }) {
    return params.teamName !== undefined
  },
  components: {
    Infos
    // MatchHistory
  },
  asyncData({ app, params }) {
    return app.$axios
      .get(app.$axios.defaults.baseURL + 'team/' + encodeURI(params.teamName))
      .then(res => {
        return { team: res.data }
      })
      .catch(error => {
        throw { statusCode: 404, message: "L'équipe n'a pas été trouvée" }
      })
  },
  head() {
    return {
      title: 'La Grosse Ligue - ' + this.$route.params.teamName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: `Informations sur l'équipe ${this.team.name} | Palier ${
            this.team.palier
          } | Région ${this.team.region}`
        }
      ]
    }
  }
}
</script>

<style>
.under {
  top: 100px;
}
</style>
