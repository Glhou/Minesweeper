<template>
  <div>
    <a href="#" @click.prevent="initGrid"> Restart </a>
    <div class="box">
      <div class="container" :style="gridStyle()">
        <Cell
          class="item"
          v-for="(cell, i) in grid"
          :key="i"
          :cell="cell"
        ></Cell>
      </div>
    </div>
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
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initGrid();
    });
  },
  props: {
    cols: {
      type: Number,
      default: 3,
    },
    rows: {
      type: Number,
      default: 3,
    },
    bombs: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    initGrid() {
      const { cols, rows } = this;
      const size = cols * rows;
      const grid = [];
      for (var i = 0; i < size; i++) {
        grid.push({
          bomb: false,
          flag: false,
          ouvert: false,
          bombVoisin: 0,
          voisins: null,
        });
      }
      this.grid = grid;
      this.$forceUpdate(); // comme ça c'est affiché à la fin
    },
    gridStyle() {
      const { cols } = this;
      return {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      };
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
.box{
  height:60vh;
  width:60vh;
  margin: 0 auto;
  background-color: #d6d6d6;
  position:relative;
  padding: 5px;
}

.container {
  height: 100%;
  width:100%;
  display: grid;
  grid-gap: 5px;
}
.item {
  grid-column: span 1 / span 1;
}
</style>
