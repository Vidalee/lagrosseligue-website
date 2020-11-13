<template>
  <div class="tile is-parent">
    <article class="tile is-child notification under tile-color">
      <div class="content">
        <div>
          <h1 class="title" style="display:inline-block;margin-bottom:0px;">
            Statistiques
          </h1>
          <b-field style="display:inline-block;line-height:46px;position:absolute;right:24px;">
            <b-radio-button
              v-model="radioButton"
              native-value="Total"
              class="button-dark"
              style="display:inline;margin-right: -6px;"
              @input="valueChanged"
            >
              <span>Total</span>
            </b-radio-button>

            <b-radio-button
              v-model="radioButton"
              native-value="Moyenne"
              class="button-dark"
              style="display:inline;"
              @input="valueChanged"
            >
              <span>Moyenne par partie</span>
            </b-radio-button>
          </b-field>
        </div>
        <div class="content">
          <div class="columns is-gapless">
            <div v-for="stat in stats.show1" :key="stat.key" class="column hover has-text-centered is-uppercase">
              <div class="vertical-center">
                <h1 class="text-color">
                  {{ stat.value }}
                </h1>
                <h2 class="text-color">
                  {{ stat.key }}
                </h2>
              </div>
            </div>
          </div>
          <div class="columns is-gapless">
            <div v-for="stat in stats.show2" :key="stat.key" class="column hover has-text-centered is-uppercase">
              <div class="vertical-center">
                <h1 class="text-color">
                  {{ stat.value }}
                </h1>
                <h3 class="text-color">
                  {{ stat.key }}
                </h3>
              </div>
            </div>
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
  },
  data() {
    return {
      radioButton: 'Total'
    }
  },
  created: function() {
    let totalGames = 0
    this.stats = {
      line1: [],
      line2: [],
      avLine1: [],
      avLine2: [],
      show1: [],
      show2: []
    }
    this.stats.line1.push({ key: 'Winrate (%)', value: 0 })
    this.stats.line1.push({ key: 'Kills + Assistances', value: 0 })
    this.stats.line1.push({ key: 'Sbire tuées', value: 0 })
    this.stats.line1.push({ key: 'Dégats infligés aux champions', value: 0 })
    this.stats.line2.push({ key: 'Balises de visions posées', value: 0 })
    this.stats.line2.push({
      key: "Plus d'ennemis tuées en même temps",
      value: 0
    })
    this.stats.line2.push({ key: 'Or gagné', value: 0 })
    this.stats.line2.push({ key: 'Dégats reçus', value: 0 })

    this.json.games.forEach(game => {
      totalGames += 1
      if (game.stats.win) this.stats.line1[0].value += 1
      this.stats.line1[1].value += game.stats.kills + game.stats.assists
      this.stats.line1[2].value += game.stats.totalMinionsKilled
      this.stats.line1[3].value +=
        game.stats.magicDamageDealtToChampions +
        game.stats.physicalDamageDealtToChampions +
        game.stats.trueDamageDealtToChampions
      this.stats.line2[0].value += game.stats.wardsPlaced
      if (game.stats.largestMultiKill > this.stats.line2[1].value)
        this.stats.line2[1].value = game.stats.largestMultiKill
      this.stats.line2[2].value += game.stats.goldEarned
      this.stats.line2[3].value +=
        game.stats.magicalDamageTaken +
        game.stats.physicalDamageTaken +
        game.stats.trueDamageTaken
    })
    this.stats.line1[0].value = Math.round(
      (this.stats.line1[0].value / totalGames) * 100
    )
    this.stats.avLine1.push({
      key: 'Parties',
      value: totalGames
    })
    this.stats.avLine1.push({
      key: this.stats.line1[1].key,
      value: (this.stats.line1[1].value / totalGames).toFixed(2)
    })
    this.stats.avLine1.push({
      key: this.stats.line1[2].key,
      value: (this.stats.line1[2].value / totalGames).toFixed(2)
    })
    this.stats.avLine1.push({
      key: this.stats.line1[3].key,
      value: this.formatNumber(
        (this.stats.line1[3].value / totalGames).toFixed(0)
      )
    })
    this.stats.avLine2.push({
      key: this.stats.line2[0].key,
      value: (this.stats.line2[0].value / totalGames).toFixed(2)
    })
    this.stats.avLine2.push({
      key: this.stats.line2[1].key,
      value: this.stats.line2[1].value
    })
    this.stats.avLine2.push({
      key: this.stats.line2[2].key,
      value: this.formatNumber(
        (this.stats.line2[2].value / totalGames).toFixed(0)
      )
    })
    this.stats.avLine2.push({
      key: this.stats.line2[3].key,
      value: this.formatNumber(
        (this.stats.line2[3].value / totalGames).toFixed(0)
      )
    })
    for (const el in this.stats.line1) {
      this.stats.line1[el].value = this.formatNumber(this.stats.line1[el].value)
    }
    for (const el in this.stats.line2) {
      this.stats.line2[el].value = this.formatNumber(this.stats.line2[el].value)
    }
    this.stats.show1 = this.stats.line1
    this.stats.show2 = this.stats.line2
  },
  methods: {
    formatNumber: function(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    },
    valueChanged: function() {
      if (this.radioButton === 'Moyenne') {
        this.stats.show1 = this.stats.avLine1
        this.stats.show2 = this.stats.avLine2
      } else {
        this.stats.show1 = this.stats.line1
        this.stats.show2 = this.stats.line2
      }
    }
  }
}
</script>

<style>
.hover:hover {
  background-color: var(--bg-color-light) !important;
}

.hover {
  color: var(--color);
  height: 150px;
}

.vertical-center {
  position: relative;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center;
}
</style>
