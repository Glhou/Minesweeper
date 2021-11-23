<template>
  <v-btn :class="getClass()">
    <div class="inside" v-if="cell.ouvert && cell.bombVoisin && !cell.bomb">
      {{ cell.bombVoisin }}
    </div>
    <div class="inside" v-if="cell.flag">&#9873;</div>
  </v-btn>
</template>

<script>
export default {
  name: "Cell",
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getClass() {
      const { cell } = this;
      if (cell.ouvert && !cell.bomb) {
        return "cell-ouvert square";
      }
      if (cell.flag) {
        return "cell-flag square";
      }
      if (cell.bomb && cell.ouvert) {
        return "cell-bomb square";
      }
      return "cell-base square";
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {

  &-base {
    background-color: #7a7a7a !important;
    height:100% !important;
  }

  &-ouvert {
    background-color: #b1b1b1 !important;
    height:100% !important;
    position: relative;
  }
  &-bomb {
    background-color: #000000 !important;
    height:100% !important;
  }
  &-flag {
    background-color: #00a000 !important;
    height:100% !important;
    position: relative;
  }
}
.v-btn:not(.v-btn--round).v-size--default.square{
  min-width: 0;
}
.inside{
  position:absolute;
  width:100%;
  height:100%;
  top: 25%
}
</style>