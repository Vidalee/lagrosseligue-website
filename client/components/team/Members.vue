<template>
  <div class="columns" style="margin-top:150px;">
    <div v-for="member in json" :key="member.summonerName" class="column has-text-centered" style="height:290px;">
      <router-link :to="'/summoner/' + member.summonerName" class="icon-link">
        <div class="rounded member-icon-background" style="height:0px">
          <img class="rounded profile-icon icon-link" :src="getIconPath(member.profileIcon)">
        </div>
      </router-link>
      <h1 class="title is-3 text-color" style="margin-top:110px;margin-left:20px;margin-right:20px;">
        {{ member.summonerName }}
        <br>
        <!--span v-if="member.title" class="tag is-primary">
          {{ member.title }}
        </span-->
      </h1>
    </div>
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
    getIconPath: function(profileIconId) {
      const str =
        'https://cdn.communitydragon.org/latest/profile-icon/' + profileIconId
      return str
    }
  }
}
</script>

<style scoped>
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
