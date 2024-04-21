<template>
  <div :class="{ 'country-list': true, 'list-view': viewMode === 'list', 'dark-theme': darkMode }"
    class="countryList-container">
    <CountryCard v-for="country in filteredCountries" :key="country.cca3" :country="country" @select="handleSelect" />
    <CountryModal :country="selectedCountry" :visible="isModalVisible" @close="closeModal" />
  </div>
</template>

<script>
import CountryCard from '@/components/CountryCard.vue';
import CountryModal from '@/components/CountryModal.vue';
import { useDarkMode } from '@/composables/useDarkMode';

export default {
  components: {
    CountryCard,
    CountryModal
  },
  props: {
    countries: Array,
    filterText: String,
    selectedRegion: String,
    viewMode: String
  },
  data() {
    return {
      selectedCountry: null,
      isModalVisible: false
    };
  },
  setup() {
    const { darkMode } = useDarkMode();
    return { darkMode };
  },
  computed: {
    filteredCountries() {
      return this.countries.filter(country => {
        const matchesFilterText = this.filterText ? country.name.common.toLowerCase().includes(this.filterText.toLowerCase()) : true;
        const matchesRegion = this.selectedRegion ? country.region.toLowerCase() === this.selectedRegion.toLowerCase() : true;
        return matchesFilterText && matchesRegion;
      });
    }
  },
  methods: {
    handleSelect(country) {
      this.selectedCountry = country;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<style scoped>
.country-list {
  display: flex;
  flex-wrap: wrap;
}

.country-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 200px;
}

.list-view .country-card {
  width: 100%;
}
</style>
