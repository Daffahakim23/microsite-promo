<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="w-full max-w-lg flex flex-col bg-white rounded-3xl p-6 border border-neutral-200 relative">
                <div v-if="rekeningDitemukan" class="flex flex-col mt-6 items-center">
                    <div class="flex justify-center items-center mb-8">
                        <img :src="iconPath" alt="Icon" class="h-24 sm:h-28 md:h-32" />
                    </div>
                    <h2 class="text-xl font-semibold mb-4">Rekening Ditemukan!</h2>
                    <div class="initials-circle">
                        {{ getInitials(rekeningData.namaLengkap) }}
                    </div>
                    <div class="text-center mt-4 mb-8">
                        <p class="text-lg font-semibold">{{ rekeningData.namaLengkap }}</p>
                        <p class="text-sm">{{ form.namaBank }}-{{ form.nomorRekening }}</p>
                    </div>
                    <div class="mt-6">
                        <ButtonComponent type="button" @click="handleTransfer" class="w-full">
                            Transfer
                        </ButtonComponent>
                    </div>
                </div>
                <div v-else class="flex flex-col mt-6">
                    <FormField label="Nama Bank*" id="namaBank" :isDropdown="true" v-model="form.namaBank"
                        placeholder="Pilih Nama Bank" :options="bankOptions" required />

                    <FormField label="Nomor Rekening*" id="nomorRekening" v-model="form.nomorRekening"
                        placeholder="Masukkan Nomor Rekening" required />

                    <div class="text-right mt-4">
                        <ButtonComponent type="button" @click="handleSubmit" class="w-full">
                            Lanjutkan
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import api from "@/API/api";
import FormField from "@/components/FormField.vue";
import { useFileStore } from "@/stores/filestore";
import { FormModelPenerimaPemindahbukuan } from "@/models/formModel";
import ButtonComponent from "@/components/button.vue";

export default {
    components: {
        FormField,
        ButtonComponent,
    },
    props: {
        isOpen: Boolean,
    },
    emits: ["close", "cardClick"],
    computed: {
        iconPath() {
            return new URL(`/src/assets/account-found.svg`, import.meta.url).href;
        },
    },
    data() {
        return {
            form: new FormModelPenerimaPemindahbukuan(),
            bankOptions: [],
            fileStore: useFileStore(),
            rekeningDitemukan: false,
            rekeningData: {
                namaLengkap: "Mira Setiawan",
                bank: "",
                nomorRekening: "",
            },
        };
    },
    created() {
        this.fetchBankOptions();
    },
    methods: {
        async fetchBankOptions() {
            try {
                const response = await api.get("/list-bank");
                this.bankOptions = response.data.bank.map((bank) => ({
                    label: bank.bank_name,
                    value: bank.bank_name,
                }));
            } catch (error) {
                console.error("Error fetching bank options:", error);
            }
        },
        async handleSubmit() {
            this.rekeningDitemukan = true;
            this.form.namaLengkap = this.rekeningData.namaLengkap;
        },
        handleTransfer() {
            console.log("Transfer ke rekening:", this.rekeningData);
            this.$emit("close");
            this.fileStore.setFormDataPenerimaPemindahbukuan(this.form);
        },
        getInitials(name) {
            if (!name) return "";
            const names = name.split(" ");
            let initials = "";
            for (let i = 0; i < names.length; i++) {
                if (names[i] && names[i].length > 0) {
                    initials += names[i][0].toUpperCase();
                }
            }
            return initials;
        },
    },
};
</script>

<style scoped>
.bg-primary {
    background-color: #004AAD;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.initials-circle {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #D9E2EA;
    font-size: 24px;
    font-weight: bold;
    color: #003B70;

}
</style>