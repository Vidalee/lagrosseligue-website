<template>
  <section class="section">    
    <div class="container">
      <div style="border-radius: 5px;margin-inline: 20px 20px;min-height:400px">
        <br><br>
        <div class="box color-bg">
          <div v-for="member in staff" :key="member.name" style="min-height: 300px; margin:20px;" class="has-text-centered">
            <div v-if="member.link.length != ''">
              <a :href="member.link" target="_blank" class="icon-link">
                <div class="rounded member-icon-background" style="">
                  <img class="rounded profile-icon icon-link" :src="getIconPath(member.profileIcon)" style="height: 100%; width: 100%; display:block;">
                </div>
              </a>
            </div>
            <div v-else>
              <div class="icon-link">
                <div class="rounded member-icon-background" style="">
                  <img class="rounded profile-icon icon-link" :src="getIconPath(member.profileIcon)" style="height: 100%; width: 100%; display:block;">
                </div>
              </div>
            </div>
            <h1 class="title is-3 text-color" style="margin-top:20px;margin-left:20px;margin-right:20px;">
              {{ member.name }}
              <br>
              <span v-for="tag in member.tags" :key="tag.value" :class="'tag ' + tag.class" style="margin-left:2px;margin-right:2px;">
                {{ tag.value }}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const staff = require('@/data/staff.json')

export default {
  data() {
    return {
      staff: []
    }
  },
  created: function() {
    if (process.browser) this.staff = this.shuffle(staff)
  },
  head() {
    return {
      title: 'La Grosse Ligue - Staff',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: ''
        }
      ]
    }
  },
  methods: {
    shuffle: function(array) {
      let currentIndex = array.length

      let temporaryValue

      let randomIndex

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    },
    getIconPath: function(profileIconId) {
      const str =
        'https://cdn.communitydragon.org/latest/profile-icon/' + profileIconId
      return str
    }
  }
}
</script>

<style scoped>
.legal-content {
  margin-inline: 20px 20px;
  line-height: 22px;
}

html {
  height: 100%;
}

.rounded {
  border-radius: 50%;
}

.box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  align-content: space-around;
  align-items: flex-start;
}

.box-child {
  text-align: center;
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
</style>
