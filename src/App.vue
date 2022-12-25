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
      <v-switch
        @change="toggleDarkMode()"
        v-model="isDark"
        label="Dark mode"
        color="orange"
      ></v-switch>
    </v-app-bar>
    <v-main>
      <Dashboard :isDark="isDark" />
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
    isDark: false,
  }),
  methods: {
    toggleDarkMode() {
      if (this.isDark) {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
  },
};
</script>
