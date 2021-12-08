<template>
  <div>
    <div v-if="this.finished">
      <div class="grey-bg"></div>
      <div class="card finished">
        <div class="card-body">
          <div v-if="this.win">
            Tu as gagné !!!
          </div>
          <div v-else>
            Tu as perdu
          </div>
          <v-btn class="restart" color="primary" @click.prevent="initGrid">
            <v-icon dark left>mdi-restart</v-icon>
            Restart
          </v-btn>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="container" :style="gridStyle()">
        <Cell
          class="item"
          v-for="(cell, i) in grid"
          :key="i"
          :cell="cell"
          @click.left.native="reveal(cell)"
          @click.right.native="flag(cell)"
          @contextmenu.native.prevent
        ></Cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "./Cell.vue";
import Vue from 'vue'
import VueConfetti from 'vue-confetti'

Vue.use(VueConfetti)

export default {
  name: "Grid",
  components: {
    Cell,
  },
  data() {
    return {
      finished: false,
      win: false,
      grid: [],
    };
  },
  created() {
  window.addEventListener("resize", this.size);
  },
  destroyed() {
    window.removeEventListener("resize", this.size);
  },
  mounted() {
    this.$nextTick(() => {
      this.initGrid();
      this.size();
    });
  },
  props: {
    cols: {
      type: Number,
      default: 9,
    },
    rows: {
      type: Number,
      default: 9,
    },
    bombs: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    // confetis
    start() {
      this.$confetti.start();
    },

    stop() {
      this.$confetti.stop();
    },
    // minesweeper
    initGrid() {
      const { cols, rows } = this;
      var { bombs } = this;
      const size = cols * rows;
      const grid = [];
      this.win = false;
      this.stop();
      for (var i = 0; i < size; i++) {
        grid.push({
          id: i,
          n: i % cols,
          m: parseInt(i / rows),
          bomb: false,
          flag: false,
          ouvert: false,
          bombVoisin: 0,
        });
      }
      // on place les bombes
      while (bombs > 0) {
        const num = Math.floor(Math.random() * size);
        if (grid[num].bomb === false) {
          grid[num].bomb = true;
          bombs -= 1;
        }
      }

      this.grid = grid;
      this.findNeighbour();
      this.finished = false;
      this.$forceUpdate(); // comme ça c'est affiché à la fin
    },
    findNeighbour() {
      const { grid } = this;
      // on compte les voisins
      for (const cell of grid) {
        for (var x = -1; x < 2; x++) {
          for (var y = -1; y < 2; y++) {
            const neighbour = this.findCell(cell.n + x, cell.m + y);
            if (neighbour != null) {
              if (neighbour.bomb) {
                cell.bombVoisin += 1;
              }
            }
          }
        }
      }
    },
    findCell(x, y) {
      const { grid } = this;
      for (const cell of grid) {
        if (cell){
          if (cell.n == x && cell.m == y) {
            return cell;
          }
        }
      }
      return null;
    },
    gridStyle() {
      const { cols } = this;
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      };
    },
    openVoidCell(cell) {
      if (cell) {
        for (var x = -1; x < 2; x++) {
          for (var y = -1; y < 2; y++) {
            const neighbour = this.findCell(cell.n + x, cell.m + y);
            if (
              neighbour != null &&
              neighbour != undefined &&
              neighbour.flag != true
            ) {
              neighbour.ouvert = true;
            }
          }
        }
      }
    },
    recursiveOpen(toOpen, opened) {
      if (toOpen == []){
        return;
      }
      if (toOpen != []) {
        var cell = toOpen.shift();
        this.openVoidCell(cell);
        opened.push(cell);
        if (cell != undefined && cell!= null){
          for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
              
                const neighbour = this.findCell(cell.n + x, cell.m + y);
                if (neighbour != null && neighbour != undefined) {
                  if (neighbour.bombVoisin == 0) {
                    if (
                      !toOpen.includes(neighbour) &&
                      !opened.includes(neighbour)
                    ) {
                      toOpen.push(neighbour);
                    }
                  }
                }
              
            }
          }
        }
        this.recursiveOpen(toOpen, opened);
      }
    },
    
    reveal(cell) {
      const { grid } = this;
        if(cell.flag == false){
        if (cell.bombVoisin == 0) {
          this.recursiveOpen([cell],[]);
        } else {
          cell.ouvert = true;
        }
        if (cell.bomb == true) {
          this.finished = true;
          for (var c of grid) {
            if (c.bomb) {
              c.ouvert = true;
              c.flag = false;
            }
          }
        }
        if (this.isWin()) {
          this.finished = true;
          this.win = true;
        }
      }
    },
    flag(cell) {
      if (cell.ouvert != true) {
        cell.flag = !cell.flag;
      }
      if (this.isWin()) {
        this.finished = true;
        this.win = true;
      }
    },
    isWin() {
      const { grid } = this;
      var test = true;
      for (var c of grid) {
        if (c.bomb && c.flag == false) {
          test = false;
        }
        if (!c.bomb && c.ouvert == false) {
          test = false;
        }
      }
      if (test == true){
        this.start();
      }
      return test;
    },
    size(){
      const {cols,rows} = this;
      if (window.matchMedia("(min-width: 1000px)").matches){
        document.querySelector(".box").style.height = 4 * rows + "vw"
        document.querySelector(".box").style.width = 4 * cols + "vw"
      }
      else if (window.matchMedia("(min-width: 600px)").matches){
        document.querySelector(".box").style.height = 8 * rows + "vw"
        document.querySelector(".box").style.width = 8 * cols + "vw"
      }
      else {
        document.querySelector(".box").style.height = 90 + "vw"
        document.querySelector(".box").style.width = 90 + "vw"
      }
    }
  },
  watch: {
    rows() {
      this.initGrid();
    },
    cols() {
      this.initGrid();
    },
    bombs() {
      this.initGrid();
    },
  },
};
</script>


<style lang="scss" scoped>
.box {
  margin: 0 auto;
  background-color: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  position: relative;
  padding: 5px;
  margin-top: 60px;
}

.container {
  height: 100%;
  width: 100%;
  display: grid;
  grid-gap: 5px;
}
.item {
  grid-column: span 1 / span 1;
}
.restart {
  margin-top: 10px;
  margin-bottom: 10px;
}

.grey-bg{
  position: absolute;
  top:0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 200;
}

.finished{
  z-index: 300;
  position:absolute;
  left:0;
  right:0;
  margin-left: auto;
  margin-right: auto;
  width:300px;
  background-color: white;
  border-radius: 10px;
}
.card-body{
  margin-top:10px;
  font-weight: bold;
}

.finished:hover{
  animation: 1s ease-in-out trembleXY infinite;
}
@keyframes trembleXY {
  0%{
    transform: translate(0px,0px);
  }
  20%{
    transform: translate(10px,10px);
  }
  40%{
    transform: translate(+10px,-10px);
  }
  60%{
    transform: translate(-10px,-10px);
  }
  80%{
    transform: translate(-10px,+10px);
  }
  100%{
    transform: translate(0px,0px);
  }
}

</style>
