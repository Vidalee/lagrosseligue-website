<template>
  <div class="tile is-parent">
    <article class="tile is-child notification under tile-color">
      <p class="title">
        Champions
      </p>
      <div style="height:275px;overflow:auto;">
        <table class="table tile-color">
          <thead>
            <tr class="tile-color">
              <th class="tile-color">
                Champion
              </th>
              <th class="tile-color">
                Winrate (%)
              </th>
              <th class="tile-color">
                Parties jouées
              </th>
              <th class="tile-color">
                KDA
              </th>
              <th class="tile-color">
                Kill
              </th>
              <th class="tile-color">
                Morts
              </th>
              <th class="tile-color">
                Assists
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="champion in champions" :key="champion.championId">
              <th class="tile-color">
                {{ champion.name }}
              </th>
              <td class="tile-color">
                {{ champion.winrate.toFixed(0) }}
              </td>
              <td class="tile-color">
                {{ champion.count }}
              </td>
              <td class="tile-color">
                {{ champion.kda.toFixed(1) }}
              </td>
              <td class="tile-color">
                {{ champion.k.toFixed(1) }}
              </td>
              <td class="tile-color">
                {{ champion.d.toFixed(1) }}
              </td>
              <td class="tile-color">
                {{ champion.a.toFixed(1) }}
              </td>
            </tr>
          </tbody>
        </table>
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
    let champions = {}
    this.json.games.forEach(game => {
      if (champions[game.championId]) {
        champions[game.championId].count++
        champions[game.championId].k =
          (champions[game.championId].k *
            (champions[game.championId].count - 1) +
            game.stats.kills) /
          champions[game.championId].count
        champions[game.championId].d =
          (champions[game.championId].d *
            (champions[game.championId].count - 1) +
            game.stats.deaths) /
          champions[game.championId].count
        champions[game.championId].a =
          (champions[game.championId].a *
            (champions[game.championId].count - 1) +
            game.stats.assists) /
          champions[game.championId].count
        if (game.stats.win) champions[game.championId].wins++
      } else {
        champions[game.championId] = {
          championId: game.championId,
          count: 1,
          k: game.stats.kills,
          d: game.stats.deaths,
          a: game.stats.assists,
          wins: game.stats.win ? 1 : 0
        }
        for (const championName in championInfo.data) {
          if (!championInfo.data.hasOwnProperty(championName)) continue
          // eslint-disable-next-line eqeqeq
          if (championInfo.data[championName].key == game.championId) {
            champions[game.championId].name =
              championInfo.data[championName].name
            break
          }
        }
      }
      champions[game.championId].kda =
        (champions[game.championId].k + champions[game.championId].a) /
        (champions[game.championId].d === 0 ? 1 : champions[game.championId].d)
      champions[game.championId].winrate =
        (champions[game.championId].wins / champions[game.championId].count) *
        100
    })
    champions = Object.values(champions)
    this.champions = champions.sort(
      (a, b) =>
        a.count === b.count
          ? a.wins < b.wins
            ? 1
            : -1
          : a.count < b.count
            ? 1
            : -1
    )
  },
  methods: {
    compare: function(a, b) {
      if (a.count < b.count) {
        return -1
      }
      if (a.last_nom > b.last_nom) {
        return 1
      }
      return 0
    }
  }
}
</script>

<style>
</style>
