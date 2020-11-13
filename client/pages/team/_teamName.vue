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
      .get(app.$axios.defaults.baseURL + 'team/' + params.teamName)
      .then(res => {
        return { team: res.data }
      })
  },
  head() {
    return {
      title: 'La Grosse Ligue - ' + this.$route.params.teamName
    }
  }
}
</script>

<style>
.under {
  top: 100px;
}
</style>
