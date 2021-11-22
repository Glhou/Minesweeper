<template>
  <div :class="getClass()">
    <div class="inside" v-if="cell.ouvert && cell.bombVoisin && !cell.bomb">
      {{ cell.bombVoisin }}
    </div>
    <div class="inside" v-if="cell.flag">&#9873;</div>
  </div>
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
        return "cell-ouvert";
      }
      if (cell.flag) {
        return "cell-flag";
      }
      if (cell.bomb && cell.ouvert) {
        return "cell-bomb";
      }
      return "cell-base";
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {

  &-base {
    background-color: #7a7a7a;
    height:100%
  }

  &-ouvert {
    background-color: #b1b1b1;
    height:100%;
    position: relative;
  }
  &-bomb {
    background-color: #000000;
    height:100%
  }
  &-flag {
    background-color: #00a000;
    height:100%;
    position: relative;
  }
}
.inside{
  position:absolute;
  width:100%;
  height:100%;
  top: 25%
}
</style>