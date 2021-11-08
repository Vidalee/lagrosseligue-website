<template>
  <div class="columns" style="margin-top:150px;">
    <div v-for="member in json" :key="member.summonerName" class="column has-text-centered" style="height:290px;">
      <router-link :to="'/summoner/' + member.summonerName" class="icon-link">
        <div class="rounded member-icon-background" style="height:0px">
          <img class="rounded profile-icon icon-link" :src="getIconPath(member.profileIconId)">
        </div>
      </router-link>
      <h1 class="title is-3 text-color" style="margin-top:110px;margin-left:20px;margin-right:20px;">
        {{ member.summonerName }}
        <br>
        <span v-if="member.soloRank != ''" class="tag is-info">
          {{ member.soloRank }}
        </span>
        <span v-if="member.flag === 0" class="tag is-danger">
          Main
        </span>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    json: {
      type: Array,
      required: true
    }
  },
  methods: {
    getIconPath: function(profileIconId) {
      const str =
        'https://cdn.communitydragon.org/latest/profile-icon/' + profileIconId
      return str
    }
  }
}
</script>

<style scoped>
.rounded {
  border-radius: 50%;
}

.profile-icon {
  height: 190px;
  width: 190px;
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

a {
  height: 0px;
}
</style>
