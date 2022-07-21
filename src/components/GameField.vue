<template>
  <div id="container">
    <div v-for="i in settings.width * settings.width" :key="i" class="tile" :style="'background-color:' +  ((i % 2 === 0) ? '#a2d149' : '#aad751')">
      <img src="@/assets/head.png" :style="'transform: rotate('+90*head.direction+'deg)'" class="tileImg" v-if="i===head.xPosition +head.yPosition*this.settings.width">
      <img src="@/assets/body.png" class="tileImg" v-if="locations.includes(i)">
      <img src="@/assets/apple.png" class="tileImg" v-if="i===apple">
    </div>
    <div class="overlay" v-if="head.direction === 4">
      <div style="height: 40px">
        Press Any Button to Start
      </div>
    </div>
    <div class="overlay" v-else-if="gameOver">

      <div style="height: 40px">
        <span class="material-icons" id="closeIcon" @click="restart">
          close
        </span>
        Game Over
      </div>
    </div>
    <div class="overlay" v-else-if="paused">
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
        xPosition: 5,
        yPosition: 4,
      },
      bodySize: 3,
      locations: [],
      paused: false,
      handle: null,
      apple: null,
      gameOver: null,
      highscore: 0,
      settings: {
        width: 9
      }
    }
  },

  methods: {
    gameLoop() {
      if(!this.paused && !this.gameOver) {
        //new frame every 0.4 seconds
        setTimeout(this.gameLoop, 400)

        const futureY = this.head.direction === 0 ? this.head.yPosition-1 :
            this.head.direction === 2 ? this.head.yPosition + 1 : this.head.yPosition
        const futureX = this.head.direction === 1 ? this.head.xPosition+1 :
            this.head.direction === 3 ? this.head.xPosition - 1 : this.head.xPosition

        //adds a bodypart to last position where head was if the real length doesnt match the desired length
        if(this.bodySize === this.locations.length) {
          this.locations.shift()
          this.locations.push(this.head.xPosition + this.head.yPosition*this.settings.width)
        } else {
          if(this.bodySize > this.locations.length) {
            this.locations.push(this.head.xPosition + this.head.yPosition * this.settings.width)
          }
        }

        if(this.locations.includes(futureX + futureY*this.settings.width)) {
          this.gameOver = true
          this.paused = true
          this.highscore = this.bodySize - 3 > this.highscore ? (this.bodySize - 3) * 50 : this.highscore
          this.$emit('highscore',(this.highscore))
          return
        }

        //calculates which direction to go
        this.head.yPosition = futureY
        this.head.xPosition = futureX
        this.head.prevDir = this.head.direction


        if(this.apple === this.head.xPosition + this.head.yPosition*this.settings.width) {
          this.bodySize++
          this.$emit('score', ((this.bodySize - 3) * 50))
          this.apple = this.getRandomPosOnBoard()
        }
      }
    },

    getRandomPosOnBoard() {
      let random = Math.floor(Math.random() * this.settings.width * this.settings.width)+1
      do {
        random = Math.floor(Math.random() * this.settings.width * this.settings.width)+1
      } while(this.locations.includes(random))
      return random
    },
    restart() {
      this.head.direction = 4
      this.head.xPosition = 5
      this.head.yPosition = 4
      this.head.prevDir = 4
      this.paused = false
      this.gameOver = false
      this.locations = []
      this.apple = null
      this.bodySize = 3
    },
  },

  mounted() {

    //reacts to keydown events
    document.onkeydown = (event) => {
      if(this.head.direction === 4) {
        this.apple = this.getRandomPosOnBoard()
        this.head.direction = 0
        this.gameLoop()
      }
      //change direction depending on key pressed
      //the && makes it impossible to go to where you were previously (cannot make a 180 deg turn)
      if(!this.gameOver) {


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
}
</script>

<style scoped>
#closeIcon {
  position: absolute;
  right: 5%;
  top: 5%;
}

#closeIcon:hover {
  cursor: pointer;
}

#container {
  width: 700px;
  height: 700px;
  display: flex;
  flex-wrap: wrap;
  border: 3px solid black;
  margin: 0 auto;
}

.tile {
  width: 77.7776px;
  height: 77.77776px;
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