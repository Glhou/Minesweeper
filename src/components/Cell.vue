<template>
  <div :class="getClass()">
    <div v-if="cell.ouvert && cell.bombVoisin">
      {{ cell.bombVoisin }}
    </div>
    <div v-if="cell.flag">&#9873;</div>
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
      if (cell.ouvert && cell.bombVoisin) {
        return "cell-ouvert";
      }
      if (cell.flag) {
        return "cell-flag";
      }
      if (cell.bomb) {
        return "cell-bomb";
      }
      // else
      return "cell-";
    },
  },
};
</script>

<style lang="scss" scoped>
.cell- {
  background-color: #7a7a7a;
  height:100%;

  &ouvert {
    background-color: #b1b1b1;
  }
  &bomb {
    background-color: #000000;
  }
  &flag {
    background-color: #00a000;
  }
}
</style>