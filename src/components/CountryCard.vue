<template>
    <div class="country-card" :class="{ 'dark-theme': darkMode }" @click="handleClick">
        <h4 class="mb-0">{{ country.name.common }}</h4>
        <div class="main-card">
            <div class="flag-container">
                <img :src="country.flags.svg" :alt="`Flag of ${country.name.common}`" />
                <h3>{{ country.name.common }}</h3>
            </div>
            <div class="countryData-container">
                <p><strong>Capital:</strong> {{ country.capital ? country.capital[0] : "No capital" }}</p>
                <p><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
                <p><strong>Languages:</strong> {{ languagesList }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { useDarkMode } from '@/composables/useDarkMode';

export default {
    props: {
        country: Object,
    },
    setup() {
        const { darkMode } = useDarkMode();
        return { darkMode };
    },
    data() {
        return {
            imgLoaded: false,  // Image load status
        };
    },
    // Computed so it recalculates only when a element changes
    computed: {
        languagesList() {
            if (this.country.languages) {
                const languages = Object.values(this.country.languages);
                // Showing a maximum of 4 languages at a time
                if (languages.length > 4) {
                    return `${languages.slice(0, 4).join(', ')}, etc.`;
                }
                return languages.join(', ');
            }
            return 'No languages';
        }
    },
    methods: {
        handleClick() {
            this.$emit("select", this.country);
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/styles/styles.scss";

.country-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    width: 260px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.20);
    cursor: pointer;
    transition: transform 0.3s ease;

    img {
        width: 180px;
        max-height: 100px;
    }

    p {
        margin-bottom: 0;
    }

    h4 {
        display: none;
    }

}

.flag-container {
    min-height: 1.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 10rem;
}

.list-view .country-card {
    width: 90%;

    .main-card {
        display: flex;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 120px;
        font-size: 12px;
        padding: 12px;
    }

    .main-card h3 {
        display: none;
    }

    img {
        width: 100px;
    }

    h4 {
        display: block;
        text-align: start;
        margin-left: 16px;
    }

    .countryData-container {
        width: 160px;
        text-align: right;
    }

}

.country-card:hover {
    transform: scale(1.05);
}
</style>
