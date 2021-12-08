<template>
  <div :class="getClass()" class="btn">
    <div class="inside" v-if="cell.ouvert && cell.bombVoisin && !cell.bomb">
      <span :class="getColor()">{{ cell.bombVoisin }}</span>
    </div>
    <div class="inside" v-if="cell.bomb && cell.ouvert"></div>
    <div class="inside" v-if="cell.flag"><v-icon color="white">mdi-flag</v-icon></div>
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
    getColor() {
      const { cell } = this;
      for (let i = 1; i < 9; i++) {
        if (cell.bombVoisin == i){
        return 'cell-'.concat('', i);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.cell {

  &-base {
    background-color: #302474 !important;
    height:100% !important;
  }

  &-ouvert {
    background-color: #a69dcf !important;
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
  &-1 {
    color: blue;
  }
  &-2 {
    color: green;
  }
  &-3 {
    color: red;
  }
  &-4 {
    color: #930000;
  }
  &-5 {
    color: #5211B5;
  }
  &-6 {
    color: #0b7e6e;
  }
  &-7 {
    color: #935900;
  }
  &-8 {
    color: #930057;
  }
  
}

.inside{
  position:absolute;
  font-size: 2vw;
  top: 0; bottom: 0; left: 0; right: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  // width:100%;
  // height:100%;
  // top: 25%
  @media (max-width:1000px){
    font-size: 3vw;
  }
  @media (max-width:400px){
    font-size: 5vw;
  }
}

.bomb-icon {
  font-size: 35px !important;
}

.btn{
  border-radius: 5px;
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