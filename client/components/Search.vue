<template>
  <section>
    <div class="center-div">
      <!--p class="content">
        <b>Selected:</b> {{ selected }}
      </p-->
      <h2 class="title is-2" style="margin-bottom:20px;color:white!important;">
        Chercher un joueur <s>ou une équipe</s> (pas encore)
      </h2>
      <b-field>
        <b-autocomplete
          :data="data"
          placeholder=""
          field="title"
          :loading="isFetching"
          size="is-large"
          @focus="ping('focus')"
          @typing="ping('typing')"
          @input="getAsyncData"
          @select="option => select(option.summonerName)"
        >
          <template slot-scope="props">
            <div class="media">
              <div class="media-left">
                <img width="32" :src="`https://cdn.communitydragon.org/latest/profile-icon/${props.option.profileIcon}`">
              </div>
              <div class="media-content">
                {{ props.option.summonerName }}
                <br>
                <small>
                  Palier {{ props.option.palier }}
                </small>
              </div>
            </div>
          </template>
        </b-autocomplete>
      </b-field>
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
      isFetching: false
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
      this.isFetching = true
      this.$axios
        .get(this.$axios.defaults.baseURL + 'search/' + name)
        .then(({ data }) => {
          this.data = []
          data.forEach(item => this.data.push(item))
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
    select: function(name) {
      this.$router.push('/summoner/' + name)
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
  height: 100px;
  width: 1000px;
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
