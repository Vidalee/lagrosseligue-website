<template>
  <div class="tile is-parent is-vertical">
    <br v-if="isBoulet(json.name)">
    <b-notification v-if="isBoulet(json.name)" type="is-danger" aria-close-label="Close notification">
      Un des matchs de cette équipe ne s'est pas fait avec le bon code de tournoi, faussant les informations.
    </b-notification>
    <article class="tile is-child notification infos">
      <div class="rounded profile-icon-background color-bg">
        <img class="rounded profile-icon" :src="getIconPath()">
      </div>
      <div class="profile-banner under" style="display: inline-block;">
        <div style="margin-bottom: 120px;" /> 
        <h1 class="title is-3">
          {{ json.name }}
          <br>
          <span class="tag is-primary">
            {{ json.palier }}
          </span>
          <span class="tag is-success">
            {{ json.region }}
          </span>
        </h1>
        Établissement: soontm{{ json.custom_fields.universite }}
        <div v-if="json.custom_fields.coach">
          Coach: {{ json.custom_fields.coach }}
        </div>
        <Members :json="json.players" />
      </div>
      <!--pls help :(-->
      <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    </article>
  </div>
</template>

<script>
import Members from '~/components/team/Members'
const boulets = require('@/data/boulets.json')

export default {
  components: {
    Members
  },
  props: {
    json: {
      type: Object,
      required: true
    }
  },
  methods: {
    getIconPath: function() {
      const str =
        'https://cdn.communitydragon.org/latest/profile-icon/' +
        this.json.profileIconId
      return str
    },
    isBoulet: function(name) {
      return boulets.includes(name)
    }
  }
}
</script>

<style scoped>
.rounded {
  border-radius: 50%;
}

.infos {
  background-color: rgba(0, 0, 0, 0);
}

.profile-icon-background {
  z-index: 1;
  height: 200px;
  width: 200px;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-icon {
  height: 190px;
  width: 190px;
}

.profile-banner {
  min-height: 700px;
  width: 100%;
  border-radius: 5px;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  text-align: center;
  display: block;
}
</style>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
