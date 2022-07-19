<template>
  <div id="container">
    <div v-for="i in 18*18" :key="i" class="tile">
      <img src="@/assets/head.png" :style="'transform: rotate('+90*head.direction+'deg)'" class="tileImg" v-if="i===head.xPosition +head.yPosition*18">
    </div>
    <div class="overlay" v-if="paused">
      <div>
        You paused the Game, press
        <br><br>
        <div style="font-weight: bolder; font-size: 30px">
          ESC
        </div>
        <br>
        to continue
      </div>
    </div>
    <div class="overlay" v-if="this.head.direction === 4">
      <div style="height: 40px">
        Press WASD to Start
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameField",
  data() {
    return {
      head: {
        prevDir : 4,
        direction : 4,
        xPosition: 9,
        yPosition: 9,
      },
      bodySize: 3,
      locations: [],
      paused: false,
      handle: null,
    }
  },

  methods: {
    gameLoop() {
      if(!this.paused) {
        //new frame every 0.7 seconds
        setTimeout(this.gameLoop, 700)

        //calculates which direction to go and makes it impossible to go to where you were previously (cannot make a 180 deg turn)
        this.head.yPosition = this.head.direction === 0 ? this.head.yPosition-1 :
            this.head.direction === 2 ? this.head.yPosition + 1 : this.head.yPosition
        this.head.xPosition = this.head.direction === 1 ? this.head.xPosition+1 :
            this.head.direction === 3 ? this.head.xPosition - 1 : this.head.xPosition
        this.head.prevDir = this.head.direction
      }
    }
  },

  mounted() {

    this.gameLoop()

    //reacts to keydown events
    document.onkeydown = (event) => {
      //change direction depending on key pressed
      if ((event.key === 'w' || event.key === 'ArrowUp') && this.head.prevDir!==2) {
        this.head.direction = 0
      }
      else if ((event.key === 'd' || event.key === 'ArrowRight') && this.head.prevDir!==3) {
        this.head.direction = 1
      }
      else if ((event.key === 's' || event.key === 'ArrowDown') && this.head.prevDir!==0) {
        this.head.direction = 2
      }
      else if ((event.key === 'a' || event.key === 'ArrowLeft') && this.head.prevDir!==1) {
        this.head.direction = 3
      }
      //pause the game when pressing escape
      else if (event.key === 'Escape') {
        this.paused = !this.paused
        if(!this.paused) {
          //fixes bug where you are flash when spamming pause
          clearTimeout(this.handle)
          this.handle = setTimeout(this.gameLoop, 300)
        }
      }
    }

  }
}
</script>

<style scoped>
#container {
  width: 900px;
  height: 900px;
  display: flex;
  flex-wrap: wrap;
  border: 0.5px solid black;
  margin: 0 auto;
}

.tile {
  border: 0.5px solid black;
  width: 48px;
  height: 48px;
}

.tileImg {
  max-width:100%;
  max-height:100%;
}

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  background-color: rgba(105, 105, 105, 0.8);
  transform: translate(-50%, -50%);
  color: white;
}


</style>