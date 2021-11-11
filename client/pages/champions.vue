<template>
  <section class="section">
    <div class="container">
      <div
        style="border-radius: 5px; margin-inline: 20px 20px; min-height: 400px"
      >
        <br /><br />
        <div class="box color-bg">
          <b-table class="myTable color" :striped="false" :data="data">
            <b-table-column
              field="championName"
              label="Champion"
              sortable
              v-slot="props"
            >
            
              {{ props.row.championName }}
            </b-table-column>
            <b-table-column
              field="wins"
              label="Winrate"
              width="120"
              sortable
              centered
              v-slot="props"
            >
              {{ props.row.wins.toFixed(2) + '%' }}
            </b-table-column>
            <b-table-column
              field="picks"
              label="Pickrate"
              width="120"
              sortable
              centered
              v-slot="props"
            >
              {{ props.row.picks.toFixed(2) + '%' }}
            </b-table-column>
            <b-table-column
              field="bans"
              label="Banrate"
              width="120"
              centered
              sortable
              v-slot="props"
            >
              {{ props.row.bans.toFixed(2) + '%' }}
            </b-table-column>
            <b-table-column
              field="presence"
              label="Présence"
              width="120"
              sortable
              centered
              v-slot="props"
            >
              {{ props.row.presence.toFixed(2) + '%' }}
            </b-table-column>
            <b-table-column
              field="k"
              label="Tués en moyenne"
              sortable
              centered
              v-slot="props"
            >
              {{ props.row.k.toFixed(1) }}
            </b-table-column>
            <b-table-column
              field="k"
              label="Morts en moyenne"
              sortable
              centered
              v-slot="props"
            >
              {{ props.row.k.toFixed(1) }}
            </b-table-column>
            <b-table-column
              field="k"
              label="Assists en moyenne"
              sortable
              centered
              v-slot="props"
            >
              {{ props.row.k.toFixed(1) }}
            </b-table-column>
            <b-table-column
              field="best"
              label="Meilleur KDA moyen"
              v-slot="props"
            >
              <div v-if="props.row.best.kda === -1">N/A</div>
              <div v-else>
                <router-link
                  :to="'/summoner/' + props.row.best.summonerName"
                  class="icon-link"
                >
                  {{ props.row.best.summonerName }}
                </router-link> {{props.row.best.kda.toFixed(1)}}
              </div>
            </b-table-column>
          </b-table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const championInfo = require('@/data/champion.json')
export default {
  asyncData({ app }) {
    return app.$axios
      .get(app.$axios.defaults.baseURL + 'champions')
      .then((res) => {
        const data = res.data.stats
        const n = res.data.matches
        for (let d of data) {
          d.presence = d.bans + d.picks
          d.k = d.k / d.picks
          d.d = d.d / d.picks
          d.a = d.a / d.picks
          d.bans = (d.bans / n) * 100
          d.wins = (d.wins / d.picks) * 100
          d.picks = (d.picks / n) * 100
          d.presence = (d.presence / n) * 100
          for (const championName in championInfo.data) {
            if (!championInfo.data.hasOwnProperty(championName)) continue
            // eslint-disable-next-line eqeqeq
            if (championInfo.data[championName].key == d.championId) {
              d.championName = championInfo.data[championName].name
              break
            }
          }
        }
        return { data: res.data.stats }
      })
      .catch((error) => {
        throw {
          statusCode: 404,
          message: 'Pas de statistiques sur les champions.',
        }
      })
  },
  data() {
    return {
      data: [],
      columns: [
        {
          label: 'Champion',
          field: 'championName',
          sortable: true,
        },
        {
          label: 'Winrate',
          field: 'wins',
          sortable: true,
        },
        {
          label: 'Pick',
          field: 'picks',
          sortable: true,
        },
        {
          label: 'Bans',
          field: 'bans',
          sortable: true,
        },
        {
          label: 'Présence',
          field: 'presence',
          centered: true,
          sortable: true,
        },
        {
          label: 'Kills',
          field: 'k',
          sortable: true,
        },
        {
          label: 'Deaths',
          field: 'd',
          sortable: true,
        },
        {
          label: 'Assists',
          field: 'a',
          sortable: true,
        },
      ],
    }
  },
  head() {
    return {
      title: 'La Grosse Ligue - Champions Picks/Bans',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: ``,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.myTable {
  /deep/ table.table {
    background-color: var(--bg-color);
    color: var(--color)
  }
  /deep/ th {
    background-color: var(--bg-color);
    color: var(--color)
  }
}
</style>
