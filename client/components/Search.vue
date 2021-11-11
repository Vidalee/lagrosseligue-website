<template>
  <section>
    <div class="center-div">
      <!--p class="content">
        <b>Selected:</b> {{ selected }}
      </p-->
      <h2 class="title is-2" style="margin-bottom:20px;color:white!important;">
        Chercher un joueur ou une équipe
      </h2>
      <b-field>
        <b-autocomplete
          :data="data"
          placeholder=""
          field="title"
          :loading="isFetching"
          size="is-large"
          :keep-first="keepFirst"
          @input="getAsyncData"
          @select="option => select(option)"
        >
          <template slot-scope="props" class="">
            <div class="media" style="text-align: left;">
              <div class="media-left">
                <img width="42" :src="`https://cdn.communitydragon.org/latest/profile-icon/${props.option.profileIconId}`">
              </div>
              <div v-if="props.option.summonerName" class="media-content">
                <span class="tag is-primary">
                  Joueur
                </span>
                {{ props.option.summonerName }}
                <br>
                <small>
                  Palier {{ props.option.palier }}
                </small>
              </div>
              <div v-else class="media-content">
                <span class="tag is-success">
                  Équipe
                </span>
                {{ props.option.name }}
                <br>
                <small>
                  {{ props.option.custom_fields.universite }} | Palier {{ props.option.palier }}
                </small>
              </div>
            </div>
          </template>
        </b-autocomplete>
      </b-field>
      <br><br><br><br><br><br>
      <p style="font-size: x-small;">
        "GL statistics" isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc. 
        <router-link :to="'/legal'">
          Mentions légales
        </router-link>
      </p>
    </div>
  </section>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  data() {
    return {
      data: [],
      selected: null,
      isFetching: false,
      keepFirst: true
    }
  },
  methods: {
    ping: function(name) {
      console.log('ping ' + name)
    },
    getAsyncData: debounce(function(name) {
      if (!name) {
        this.data = []
        return
      }

      if (name.length < 3) {
        this.$toast.open({
          message: 'Veuillez écrire un mot de 3 lettres au minimum !',
          type: 'is-danger',
          queue: false
        })
        return
      }

      this.isFetching = true
      this.$axios
        .get(this.$axios.defaults.baseURL + 'search/' + name)
        .then(({ data }) => {
          this.data = []
          console.log(this.data)
          data.forEach(item => this.data.push(item))
          data = data.reverse()
        })
        .catch(error => {
          this.data = []
          this.$toast.open({
            message: 'Aucun invocateur ou équipe trouvé !',
            type: 'is-danger',
            queue: false
          })
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),
    select: function(option) {
      if (option.summonerName)
        this.$router.push('/summoner/' + option.summonerName)
      else this.$router.push('/team/' + option.name)
    }
  }
}
</script>

<style>
.center-div {
  font-size: 2.5em;
  color: white;
  background-color: rbga(0, 0, 0, 0.4);
  border-radius: 20px;
  position: absolute;
  margin: auto;
  max-height: 100px;
  max-width: 1000px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
}

b-field {
  background: rgba(0, 0, 0, 0.9) !important;
}
</style>
