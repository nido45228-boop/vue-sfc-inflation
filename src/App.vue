<script setup></script>

<template>
  <TicketManager />
</template>

<script>
import TicketManager from './components/TicketManager.vue';

export default {
  name: 'App',
  components: {
    TicketManager
  }
};
</script>

<style>
/* Global styles */
body {
  margin: 0;
  background-color: #f4f7f6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
