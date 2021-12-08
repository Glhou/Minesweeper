<template>
  <v-app>
    <div class="menu">
      <div class="inside-menu">
        <v-slider thumb-label="always" value="10" v-model.number="size" color="orange" track-color="orange darken-3" thumb-color="orange" dense step="1" max="20" min="5"></v-slider>
      </div>
    </div>
    <div id="app">
      <Grid :bombs="size*size/7" :cols="size" :rows="size" />
    </div>
  </v-app>
</template>

<script>
import Grid from "./components/Grid.vue";

export default {
  name: "App",
  components: {
    Grid,
  },
  data(){
    return {
      size:5
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu{
  margin-top:20px;
  display: flex;
  justify-content: center;
}

.inside-menu{
  width:60vw;
  padding-top: 15px;
  background-color: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  border-radius: 10px;
}

.v-application--wrap{
  background-image: url("./assets/img/background.jpg");
  background-size: cover;
}

#confetti-canvas{
  z-index:250;
}
</style>
