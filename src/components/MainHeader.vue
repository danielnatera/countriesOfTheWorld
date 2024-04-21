<template>
  <header class="header">
    <div class="search-container">
      <div class="d-flex">
        <div class="input-container">
          <input type="text" v-model="searchTerm" placeholder="Search" @keyup.enter="performSearch">
          <Ico_search />
        </div>
        <button @click="performSearch" class="search-button">
          <p>Buscar</p>
          <Ico_search />
        </button>
      </div>
      <RegionSelect :initialRegion="selectedRegion" @filterByRegion="filterByRegion" />
    </div>
    <h3 class="w-50">Countries of the world</h3>
    <div class="options-container d-flex align-items-center w-75">
      <button class="d-flex button-reset" @click="resetFilters">
        <p>Reset</p>
        <Ico_reload />
      </button>
      <button @click="toggleViewMode" class="list-button d-flex align-items-center">
        <p>{{ viewMode === 'grid' ? 'List' : 'Grid' }}</p>
        <Ico_grid v-if="viewMode === 'list'" />
        <Ico_list v-else />
      </button>
      <button @click="toggleDarkMode" :class="darkMode ? 'btn-light' : 'btn-dark'">
        <component :is="darkMode ? Ico_darkMode : Ico_lightMode" />
        <Ico_darkMode v-if="!darkMode" />
        <Ico_lightMode v-if="darkMode" />
      </button>
    </div>
  </header>
</template>

<script>
import { useDarkMode } from '@/composables/useDarkMode';
import RegionSelect from './regionSelect';
import Ico_search from '../assets/svg/ico-search.vue'
import Ico_reload from '../assets/svg/ico-reload.vue'
import Ico_darkMode from '../assets/svg/ico-darkMode.vue';
import Ico_lightMode from '../assets/svg/ico-lightMode.vue';
import Ico_grid from '../assets/svg/ico-grid.vue';
import Ico_list from '../assets/svg/ico-list.vue';

export default {
  data() {
    return {
      searchTerm: '',
      selectedRegion: '',
      viewMode: 'grid'  // 'grid' or 'list'
    };
  },
  components: {
    RegionSelect,
    Ico_search,
    Ico_reload,
    Ico_darkMode,
    Ico_lightMode,
    Ico_list,
    Ico_grid,
  },
  setup() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    return { darkMode, toggleDarkMode };
  },
  methods: {
    performSearch() {
      //  Emit search term to the parent component
      this.$emit('search', this.searchTerm);
    },
    filterByRegion(newRegion) {
      this.selectedRegion = newRegion;
      this.$emit('filter-region', this.selectedRegion);
    },
    resetFilters() { // Resetting search term and region and emmiting reset to dashboard
      this.searchTerm = '';
      this.selectedRegion = '';
      this.$emit('reset');
    },
    toggleViewMode() {
      // Switching between 'grid' and 'list'
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
      // Emit the view change
      this.$emit('toggle-view-mode', this.viewMode);
    },
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/styles.scss";

.header {
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: $secondary-color;
  z-index: 10;
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.button-reset {
  p {
    display: none;
  }
}

input[type="text"] {
  flex: 1;
  margin-right: 1rem;
  padding: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
}

.list-button p {
  display: none;
}
</style>
