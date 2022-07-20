<template>
  <div>
    Score: {{score}}
    <br>
    High-score: {{highscore}}
    <game-field @highscore="getHighscore" @score="getScore"/>
  </div>
</template>

<script>
import GameField from "@/components/GameField";
export default {
name: "GameView",
  components: {GameField},
  data() {
    return {
      highscore: 0,
      score: 0
    }
  },

  methods: {
    getHighscore(highscore) {
      console.log(highscore)
      this.highscore = parseInt(highscore)
    },
    getScore(score) {
      this.score = parseInt(score)
    }
  }
}
</script>

<style scoped>

</style>