<template>
  <div :class="{ 'dark-theme': darkMode }" class="dashboard-container">
    <MainHeader @search="handleSearch" @filter-region="handleFilterRegion" @toggle-view-mode="handleViewModeChange"
      @reset="resetAll" />
    <CountryList :countries="countries" :filterText="filterText" :selectedRegion="selectedRegion"
      :viewMode="viewMode" />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import CountryList from "@/components/CountryList.vue";
import countryService from "@/services/countriesService.js";
import { useDarkMode } from '@/composables/useDarkMode';

export default {
  components: {
    MainHeader,
    CountryList,
  },
  data() {
    return {
      countries: [],
      filterText: "",
      searchTerm: "",
      selectedRegion: "",
      viewMode: "grid",
    };
  },
  setup() {
    const { darkMode } = useDarkMode();
    return { darkMode };
  },
  methods: {
    handleSearch(searchTerm) {
      this.filterText = searchTerm;
    },
    handleFilterRegion(region) {
      this.selectedRegion = region;
    },
    handleViewModeChange(mode) {
      this.viewMode = mode;  // Changing the view mode 
    },
    resetAll() {
      this.filterText = "";
      this.selectedRegion = "";
      this.filteredCountries = [...this.countries];
    }
  },
  async created() {
    try {
      this.countries = await countryService.fetchAllCountries();
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },
};
</script>
