<template>
    <div v-if="visible" class="modal" @click.self="closeModal">
        <div class="modal-content">
            <div class="image-container">
                <div class="image-box d-flex flex-column justify-content-between align-items-center">
                    <img :src="country.flags.svg" :alt="`Flag of ${country.name.common}`" class="image mt-4" />
                    <p class="image-label">Flag</p>
                </div>
                <div class="image-box d-flex flex-column justify-content-end align-items-center">
                    <img :src="country.coatOfArms.svg" :alt="`Coat of Arms of ${country.name.common}`"
                        onError="defaultImg" class="coat-of-arms" />
                    <p class="image-label mt-3">Coat of arms</p>
                </div>
            </div>
            <table class="info-table mt-2">
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>{{ country.name.official }}</td>
                    </tr>
                    <tr>
                        <th>Currency</th>
                        <td v-for="(currency) in country.currencies" :key="currency.name">{{ currency.name }} ( {{
                            currency.symbol }} )</td>
                    </tr>
                    <tr>
                        <th>Languages:</th>
                        <td>{{ languagesList }}</td>
                    </tr>
                    <tr>
                        <th>Continent:</th>
                        <td>
                            {{ country.region }}
                            <component :is="currentIconComponent" class="icon" />
                        </td>
                    </tr>
                    <tr>
                        <th>Capital:</th>
                        <td>{{ country.capital.join(", ") }}</td>
                    </tr>
                    <tr>
                        <th>Population:</th>
                        <td>{{ country.population.toLocaleString() }}</td>
                    </tr>
                </tbody>
            </table>
            <button @click="closeModal" class="close-button">Close</button>
        </div>
    </div>
</template>

<script>
import Ico_world from '../assets/svg/ico-world.vue';
import Ico_africa from '../assets/svg/ico-africa.vue';
import Ico_americas from '../assets/svg/ico-americas.vue';
import Ico_asia from '../assets/svg/ico-asia.vue';
import Ico_europe from '../assets/svg/ico-europe.vue';
import Ico_oceania from '../assets/svg/ico-oceania.vue';
import defaultImage from '@/assets/notFound.jpg';


export default {
    props: {
        country: Object,
        visible: Boolean,
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
            imgLoaded: false,
            defaultImage: defaultImage,
        };
    },
    // Com
    computed: {
        currentIconComponent() {
            const region = this.country.region.toLowerCase();
            switch (region) {
                case 'africa': return Ico_africa;
                case 'americas': return Ico_americas;
                case 'asia': return Ico_asia;
                case 'europe': return Ico_europe;
                case 'oceania': return Ico_oceania;
                default: return Ico_world;  // Default or unknown region
            }
        },
        languagesList() {
            return this.country.languages ? Object.values(this.country.languages).join(', ') : 'No languages';
        },
        shouldBeVisible() {
            return this.visible;
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        handleImageError(event) {
            console.log('Error al cargar la imagen');
            event.target.src = this.defaultImage;
        }
    },
};
</script>

<style lang="scss">
@import "@/assets/styles/styles.scss";

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex !important;
    justify-content: center;
    align-items: center;
    z-index: 100 !important;
}

.image-container {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    border: 1px solid #76ABAE;
}

.modal-content {
    background: #76ABAE;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
    text-align: start;
    z-index: 100 !important;
}


.image-box {
    text-align: center;
    padding: 10px;
    width: 150px;
}

.coat-of-arms {
    width: 65%;
}

.image {
    width: 100%;
    height: auto;
    margin-bottom: 10px;
}

.image-label {
    font-size: 14px;
    color: #333;
    margin: 8px 0 0 0;
}

.info-table {
    font-size: 12px;
}

.close-button {
    background-color: #f44336;
    color: white;
    border: none;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
}

th {
    display: flex;
    align-items: center;
    margin-right: 8px;
}
</style>