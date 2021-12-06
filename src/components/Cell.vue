<template>
  <v-btn :class="getClass()">
    <div class="inside" v-if="cell.ouvert && cell.bombVoisin && !cell.bomb">
      {{ cell.bombVoisin }}
    </div>
    <div class="inside" v-if="cell.flag"><v-icon color="white">mdi-flag</v-icon></div>
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
    animation: trembleX 0.2s;
  }
  &-bomb {
    background-color: #ff4400  !important;
    height:100% !important;
    z-index: 100;
    animation: explode 0.5s;
  }
  &-flag {
    background-color: #00a000 !important;
    height:100% !important;
    position: relative;
    animation: trembleY 0.2s;
  }
}
.v-btn:not(.v-btn--round).v-size--default.square{
  min-width: 0;
}
.inside{
  position:absolute;
  // width:100%;
  // height:100%;
  // top: 25%
}

@keyframes trembleX {
  0%{
    transform: translateX(2px);
  }
  25%{
    transform: translateX(-4px);
  }
  50%{
    transform: translateX(+4px);
  }
  75%{
    transform: translateX(-4px);
  }
  100%{
    transform: translateX(2px);
  }
}

@keyframes trembleY {
  0%{
    transform: translateY(2px);
  }
  25%{
    transform: translateY(-4px);
  }
  50%{
    transform: translateY(+4px);
  }
  75%{
    transform: translateY(-4px);
  }
  100%{
    transform: translateY(2px);
  }
}

@keyframes explode {
  0% {
    transform :scale(1);
    background : radial-gradient(#ff1e00, #ff3300);
  }
  50% {
    transform: scale(5);
    background : radial-gradient(#ff3c00, #ff8800);
  }
  100%{
    transform: scale(1);
    background : radial-gradient(#ff3c003b, #ff880069);
  }
}

</style>