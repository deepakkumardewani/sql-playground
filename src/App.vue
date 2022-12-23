<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

        <h1>SQL playground</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <Dashboard />
    </v-main>
  </v-app>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";

export default {
  name: "App",

  components: {
    Dashboard,
  },

  data: () => ({
    //
  }),
};
</script>
