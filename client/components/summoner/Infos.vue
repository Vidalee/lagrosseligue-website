<template>
  <div class="tile is-parent is-vertical">
    <article class="tile is-child notification infos">
      <div class="rounded profile-icon-background color-bg">
        <img class="rounded profile-icon" :src="getIconPath()">
      </div>
      <div class="profile-banner under">
        <div style="margin-bottom: 120px;" /> 
        <h1 class="title is-3">
          {{ json.summonerName }}
          <br>
          <span class="tag is-primary">
            {{ json.palier }}
          </span>
          <span class="tag is-success">
            {{ json.region }}
          </span>
        </h1>
        <div style="margin:20px;display:inline-block;">
          Équipe actuelle :
          <router-link :to="'/team/' + json.participant.name">
            <button class="button is-primary" style="line-height:50px">
              {{ json.participant.name }}
            </button>
          </router-link><br><br>
        </div>
      </div>
      <!--pls help :(-->
      <br><br><br><br><br><br><br><br><br><br><br><br><br>
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
  methods: {
    getIconPath: function() {
      const str =
        'https://cdn.communitydragon.org/latest/profile-icon/' +
        this.json.profileIcon
      return str
    }
  }
}
</script>

<style>
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
  height: 100%;
  width: 100%;
  border-radius: 5px;
  position: absolute;
  margin: auto;
  right: 0;
  left: 0;
  text-align: center;
}
</style>
