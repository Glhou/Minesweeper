<template>
  <div>
    <!-- <a href="#" @click.prevent="initGrid"> Restart </a> -->
    <div v-if="this.win">Tu as gagné</div>
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
    <v-btn class="restart" color="primary" @click.prevent="initGrid">
      <v-icon dark left>mdi-restart</v-icon>
      Restart
    </v-btn>
  </div>
</template>

<script>
import Cell from "./Cell.vue";

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
  mounted() {
    this.$nextTick(() => {
      this.initGrid();
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
    initGrid() {
      const { cols, rows } = this;
      var { bombs } = this;
      const size = cols * rows;
      const grid = [];
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
          }
        }
      }
      if (this.isWin()) {
        this.finished = true;
        this.win = true;
      }
    },
    flag(cell) {
      if (cell.ouvert != true) {
        cell.flag = !cell.flag;
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
      return test;
    },
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
  height: 60vh;
  width: 60vh;
  margin: 0 auto;
  background-color: #d6d6d6;
  position: relative;
  padding: 5px;
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
</style>
