<template>
  <section class="section">
    <br><br>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-14">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Nombre de kills
                </p>
                <p style="font-size: xx-large">
                  {{ formatNumber(stats.totalKills) }}
                </p> 
              </div>
            </article>
          </div>
          
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Nombre de sbires tués
                </p>
                <p style="font-size: xx-large">
                  {{ formatNumber(stats.totalCS) }}
                </p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Nombre de dégâts infligés aux champions
                </p>
                <p style="font-size: xx-large">
                  {{ formatNumber(stats.totalDamages) }}
                </p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Argent dépensé
                </p>
                <p style="font-size: xx-large">
                  {{ formatNumber(stats.totalGoldSpent) }} pièces d'or.
                </p> 
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Champion le plus joué
                </p>
                <p style="font-size: xx-large">
                  {{ getChampionName(stats.popChampion.id) }}
                  <br>
                  Joué {{ stats.popChampion.value }} fois
                </p> 
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Nombre de parties totales
                </p>
                <p style="font-size: xx-large">
                  {{ stats.totalGames }}
                </p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Pentakills
                </p>
                <p style="font-size: xx-large">
                  {{ stats.pentakills.players.length }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-12">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Meilleur KDA moyen
                </p>
                <br><br><br><br>
                <router-link :to="'/summoner/' + stats.kda.summonerName" class="icon-link">
                  <div class="rounded member-icon-background" style="height:0px">
                    <img class="rounded profile-icon icon-link" :src="getIconPath(stats.kda.profileIcon)">
                  </div>
                </router-link>
                <h1 class="title is-3 text-color" style="margin-top:110px;margin-left:20px;margin-right:20px;">
                  {{ stats.kda.summonerName }}
                  <br>
                </h1>
                <p style="font-size:x-large">
                  {{ stats.kda.kills.toFixed(1) }}/{{ stats.kda.deaths.toFixed(1) }}/{{ stats.kda.assists.toFixed(1) }}
                </p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Plus de sbires tuées en moyenne
                </p>
                <br><br><br><br>
                <router-link :to="'/summoner/' + stats.cs.summonerName" class="icon-link">
                  <div class="rounded member-icon-background" style="height:0px">
                    <img class="rounded profile-icon icon-link" :src="getIconPath(stats.cs.profileIcon)">
                  </div>
                </router-link>
                <h1 class="title is-3 text-color" style="margin-top:110px;margin-left:20px;margin-right:20px;">
                  {{ stats.cs.summonerName }}
                  <br>
                </h1>
                <p style="font-size:x-large">
                  {{ stats.cs.value.toFixed(1) }}
                </p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Meilleure score de vision moyen
                </p>
                <br><br><br><br>
                <router-link :to="'/summoner/' + stats.visionScore.summonerName" class="icon-link">
                  <div class="rounded member-icon-background" style="height:0px">
                    <img class="rounded profile-icon icon-link" :src="getIconPath(stats.visionScore.profileIcon)">
                  </div>
                </router-link>
                <h1 class="title is-3 text-color" style="margin-top:110px;margin-left:20px;margin-right:20px;">
                  {{ stats.visionScore.summonerName }}
                  <br>
                </h1>
                <p style="font-size:x-large">
                  {{ stats.visionScore.value.toFixed(1) }}
                </p>
              </div>
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification color-bg text-color">
              <div class="vertical-center">
                <p class="title">
                  Temps le plus long passé en vie
                </p>
                <br><br><br><br>
                <router-link :to="'/summoner/' + stats.alive.summonerName" class="icon-link">
                  <div class="rounded member-icon-background" style="height:0px">
                    <img class="rounded profile-icon icon-link" :src="getIconPath(stats.alive.profileIcon)">
                  </div>
                </router-link>
                <h1 class="title is-3 text-color" style="margin-top:110px;margin-left:20px;margin-right:20px;">
                  {{ stats.alive.summonerName }}
                  <br>
                </h1>
                <p style="font-size:x-large">
                  {{ (stats.alive.value/60).toFixed(0) }} minutes
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const championInfo = require('@/data/champion.json')

export default {
  components: {},
  head() {
    return {
      title: 'La Grosse Ligue -  Statistiques'
    }
  },
  asyncData({ app, params }) {
    return app.$axios
      .get(app.$axios.defaults.baseURL + 'statistics')
      .then(res => {
        return { stats: res.data }
      })
  },
  methods: {
    getIconPath: function(profileIconId) {
      const str =
        'https://cdn.communitydragon.org/latest/profile-icon/' + profileIconId
      return str
    },
    getChampionName: function(championId) {
      for (const championName in championInfo.data) {
        if (!championInfo.data.hasOwnProperty(championName)) continue
        // eslint-disable-next-line eqeqeq
        if (championInfo.data[championName].key == championId) {
          return championInfo.data[championName].name
        }
      }
    },
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

.profile-icon {
  height: 190px;
  width: 190px;
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
.rounded {
  border-radius: 50%;
}
.vertical-center {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
}
.member-icon-background {
  z-index: 1;
  height: 200px;
  width: 200px;
  margin: auto;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-link:hover {
  opacity: 0.5;
  transition: linear 0.1s;
}
</style>

<style scoped>
a {
  height: 0px;
}
</style>
