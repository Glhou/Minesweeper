<template>
  <v-app>
    <div id="app">
      <Grid :bombs="10" :cols="9" :rows="9" />
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

.v-application--wrap{
  background-image: url("./assets/img/background.jpg");
}

#confetti-canvas{
  z-index:250;
}
</style>
