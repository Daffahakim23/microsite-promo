<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
            class="w-sm max-w-xl flex flex-col bg-white rounded-2xl p-10 border border-neutral-200 relative mx-4 sm:mx-auto h-[80vh]">
            <div class="flex items-center pb-4 justify-between dark:border-gray-600">
                <h3 class="text-2xl font-semibold text-primary dark:text-white">{{ apiData ? apiData.title : title }}
                </h3>
                <button @click="closeModal" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                    <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6">
                </button>
            </div>
            <div v-if="isLoading">Loading...</div>
            <div class="overflow-y-auto flex-1">
                <div v-if="apiData" v-html="apiData.detail"></div>
                <div v-for="(checkbox, index) in checkboxes" :key="index" class="mt-4">
                    <CustomCheckbox v-model="checkbox.checked" :labelText="checkbox.label" />
                </div>
            </div>
            <div class="flex justify-center pt-8">
                <ButtonComponent :disabled="!allChecked" @click="$emit('confirm')">Saya Setuju dan Mengerti
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ButtonComponent from "@/components/button.vue";
import CustomCheckbox from "@/components/CustomCheckbox.vue";

export default {
    components: {
        ButtonComponent,
        CustomCheckbox,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        isOpen: {
            type: Boolean,
            required: true,
        },
        apiUrl: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            apiData: null,
            checkboxes: [
                { label: "Saya tidak memiliki kewajiban/domisili perpajakan di negara selain Indonesia", checked: false },
                { label: "Bahwa berkaitan dengan Pajak Amerika, saya bukan penduduk US", checked: false },
            ],
            isLoading: false,
        };
    },
    computed: {
        allChecked() {
            return this.checkboxes.every(checkbox => checkbox.checked);
        },
    },
    methods: {
        async fetchApiData() {
            this.isLoading = true;
            try {
                const response = await axios.get(this.apiUrl);
                console.log("API Response:", response.data);
                if (response.data && response.data.data && response.data.data.content) {
                    this.apiData = response.data.data.content;
                } else {
                    console.error('API response is missing required properties.');
                    this.apiData = null;
                }
            } catch (error) {
                console.error('Error fetching API data:', error);
                console.log(error);
                this.apiData = null;
            } finally {
                this.isLoading = false;
            }
        },
        closeModal() {
            this.$emit('close');
        },
    },
    watch: {
        apiUrl: 'fetchApiData',
    },
    mounted() {
        this.fetchApiData();
    },
};
</script>

<style scoped>
.bg-primary {
    background-color: #004AAD;
}
</style>