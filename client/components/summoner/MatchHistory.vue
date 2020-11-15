<template>
  <div class="tile is-parent">
    <article class="tile is-child notification under color-bg">
      <p class="title text-color">
        Historique de parties
      </p>
      <div class="content" style="max-height:700px;overflow:auto;">
        <article v-for="game in json.games.sort((game) => game.gameCreation).reverse()" :key="game.stats.goldEarned" class="media clean" :style="'background-color: ' + (game.stats.win ? 'hsl(171, 100%, 41%)' : 'hsl(348, 100%, 61%);')">
          <figure class="media-left is-danger has-text-centered figure-equi" style="margin:0px;height:84px;width:84px;">
            <img
              :src="'https://cdn.communitydragon.org/latest/champion/' + game.championId + '/square'"
              class="image is-64x64"
              style="border-radius:50%;"
            >
          </figure>
          <div class="media-content">
            <div class="content">
              <p style="margin-bottom:0px;">
                <strong>{{ getChampionName(game.championId) }}</strong>
                <small>{{ date(game.gameCreation) }}</small>
              </p>
              <div>
                <div>
                  <img
                    v-for="item in game.stats.items"
                    :key="item"
                    :src="getItemPath(item)"
                    class="image is-32x32"
                    style="margin-right:2px;display:inline;border-radius:10px;background-color:grey;"
                  >
                  <button class="button is-primary" @click="open(game.gameId)">
                    Voir les détails du match
                  </button>
                </div>
                <strong>
                  KDA: {{ ((game.stats.kills+game.stats.assists)/(game.stats.deaths == 0 ? 1 : game.stats.deaths)).toFixed(1) }}  
                </strong>
                {{ game.stats.kills }}/{{ game.stats.deaths }}/{{ game.stats.assists }}
              </div>
            </div>
          </div>
        </article>
      </div>
    </article>
  </div>
</template>

<script>
const championInfo = require('@/data/champion.json')

export default {
  props: {
    json: {
      type: Object,
      required: true
    }
  },
  created: function() {
    this.json.games.forEach(game => {
      game.stats.items = []
      game.stats.items.push(game.stats.item0)
      game.stats.items.push(game.stats.item1)
      game.stats.items.push(game.stats.item2)
      game.stats.items.push(game.stats.item3)
      game.stats.items.push(game.stats.item4)
      game.stats.items.push(game.stats.item5)
      /* game.stats.items = game.stats.items.filter(item => {
        return item !== 0
      }) */
    })
  },
  methods: {
    date: function(timestamp) {
      const date = new Date(timestamp)
      const day = '0' + date.getDay()
      const month = '0' + date.getMonth()
      const year = date.getFullYear()
      return day.substring(-2) + '/' + month.substr(-2) + '/' + year
    },
    open: function(id) {
      window.open(
        'https://matchhistory.euw.leagueoflegends.com/en/#match-details/EUW1/' +
          id,
        '_blank'
      )
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
    getItemPath: function(itemId) {
      if (itemId === 0) return '/gris.png'
      const ddVersion = '10.23.1'
      return `http://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${itemId}.png`
    }
  }
}
</script>

<style>
.clean {
  border-radius: 5px;
}

.vertical-center {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
}

.figure-equi {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
