<template>
    <b-dropdown :text="dropdownText" class="select-region ml-3 d-flex" no-caret>
        <template #button-content>
            <div class="d-flex">
                <p>{{ initialRegion ? (initialRegion?.charAt(0).toUpperCase() + initialRegion?.slice(1)) : 'Region' }}
                </p>
                <component :is="currentIcon" />
            </div>
        </template>
        <b-dropdown-item @click="selectRegion('', 'All', 'Ico_world')">All</b-dropdown-item>
        <b-dropdown-item @click="selectRegion('africa', 'Africa', 'Ico_africa')">Africa</b-dropdown-item>
        <b-dropdown-item @click="selectRegion('americas', 'Americas', 'Ico_americas')">Americas</b-dropdown-item>
        <b-dropdown-item @click="selectRegion('asia', 'Asia', 'Ico_asia')">Asia</b-dropdown-item>
        <b-dropdown-item @click="selectRegion('europe', 'Europe', 'Ico_europe')">Europe</b-dropdown-item>
        <b-dropdown-item @click="selectRegion('oceania', 'Oceania', 'Ico_oceania')">Oceania</b-dropdown-item>
    </b-dropdown>
</template>


<script>
import Ico_world from '../assets/svg/ico-world.vue';
import Ico_africa from '../assets/svg/ico-africa.vue';
import Ico_americas from '../assets/svg/ico-americas.vue';
import Ico_asia from '../assets/svg/ico-asia.vue';
import Ico_europe from '../assets/svg/ico-europe.vue';
import Ico_oceania from '../assets/svg/ico-oceania.vue';

export default {
    props: {
        initialRegion: String
    },
    components: {
        Ico_world,
        Ico_africa,
        Ico_americas,
        Ico_asia,
        Ico_europe,
        Ico_oceania,
    },
    data() {
        return {
            selectedRegion: this.initialRegion,
            currentIcon: 'Ico_world',
            dropdownText: 'Seleccione una región'
        };
    },
    watch: {
        initialRegion(newRegion) {
            this.updateRegion(newRegion);
        }
    },
    mounted() {
        this.updateRegion(this.initialRegion); // Initial setting when the component mounts
    },
    methods: {
        selectRegion(region, text, iconComponent) {
            this.selectedRegion = region;
            this.dropdownText = text;
            this.currentIcon = iconComponent;
            this.$emit('filterByRegion', this.selectedRegion);
        },
        updateRegion(region) {
            switch (region) {
                case 'africa':
                    this.selectRegion('africa', 'Africa', 'Ico_africa');
                    break;
                case 'americas':
                    this.selectRegion('americas', 'Americas', 'Ico_americas');
                    break;
                case 'asia':
                    this.selectRegion('asia', 'Asia', 'Ico_asia');
                    break;
                case 'europe':
                    this.selectRegion('europe', 'Europe', 'Ico_europe');
                    break;
                case 'oceania':
                    this.selectRegion('oceania', 'Oceania', 'Ico_oceania');
                    break;
                default:
                    this.selectRegion('', 'All', 'Ico_world');
                    break;
            }
        }
    }
};
</script>


<style scoped>
.select-region {
    height: 40px;
}

.icon {
    display: block;
    width: 24px;
    height: 24px;
}

.dropdown-menu {
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 100 !important;
}

.dropdown-menu li {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    color: #333;

    &:hover {
        background-color: #f1f1f1;
    }
}

.dropdown-menu {
    background: none !important;

    button {
        background-color: none !important;
    }
}
</style>
