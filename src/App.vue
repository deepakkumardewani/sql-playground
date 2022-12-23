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
      <v-tooltip
        top
        open-delay="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="toggleDark()"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{isDark ? 'fas fa-sun' : 'fas fa-moon'}}</v-icon>
          </v-btn>
        </template>
        <span>{{isDark ? 'toggle light mode' : 'toggle dark mode'}}</span>
      </v-tooltip>
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
    toggleDark() {
      if (this.isDark) {
        this.$vuetify.theme.dark = false;
      } else {
        this.$vuetify.theme.dark = true;
      }
      this.isDark = !this.isDark;
    },
  },
};
</script>
