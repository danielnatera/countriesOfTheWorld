<template>
  <div>
    <CountryDashboard />
    <!-- Contenido restante de tu app -->
  </div>
</template>

<script>
import CountryDashboard from '@/components/CountryDashboard.vue';

export default {
  components: {
    CountryDashboard
  },
};
</script>


<style lang="scss">
@import "@/assets/styles/styles.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-color;
  margin-top: 60px;
}
</style>
