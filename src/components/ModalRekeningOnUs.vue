<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                class="w-full max-w-lg flex flex-col bg-white rounded-2xl p-6 border border-neutral-200 relative mx-4 sm:mx-auto">
                <div v-if="rekeningDitemukan" class="flex flex-col items-center py-4">
                    <div class="flex justify-center items-center mb-8">
                        <img :src="iconPath" alt="Icon" class="h-24 sm:h-28 md:h-32" />
                    </div>
                    <h2 class="text-xl font-semibold mb-4">Rekening Ditemukan!</h2>
                    <div class="initials-circle">
                        {{ getInitials(rekeningData.account_name) }}
                    </div>
                    <div class="text-center mt-4 mb-8">
                        <p class="text-lg font-semibold">{{ rekeningData.account_name }}</p>
                        <p class="text-sm">
                            BPR UNIVERSAL -
                            {{ rekeningData.account_number }}
                        </p>
                    </div>
                    <div class="mt-6">
                        <ButtonComponent type="button" @click="emitTransfer" class="w-full">
                            Transfer
                        </ButtonComponent>
                    </div>
                </div>
                <div v-else class="flex flex-col w-full ">
                    <div class="flex justify-between items-center w-full mb-2">
                        <h2 class="text-xl font-semibold mb-4">Masukkan Detail Penerima</h2>
                        <button @click="$emit('close')" class=" text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <FormField label="Nama Bank*" id="namaBank" v-model="form.namaBank" placeholder="Masukkan Nama Bank"
                        :readonly="true" required />

                    <!-- <FormField label="Nomor Rekening*" id="nomorRekening" v-model.number="form.nomorRekening"
                        placeholder="Masukkan Nomor Rekening" hint="*Nomor rekening harus terdiri dari 10 digit angka"
                        required /> -->

                    <FormField label="Nomor Rekening" id="nomorRekening" v-model="form.nomorRekening" variant="numeric" :maxlength="20"
                        placeholder="Masukkan Nomor Rekening"
                        :hint="nomorRekeningError ? '*Nomor Rekening yang Anda Masukkan Salah' : ''"
                        :error="nomorRekeningError" @blur="handleNomorRekeningBlur" required />

                    <div class="text-right mt-4 w-full">
                        <ButtonComponent type="button" @click="handlePreval" class="w-full"
                            :disabled="!form.namaBank || !form.nomorRekening || isPrevalLoading || isButtonDisabled">
                            {{ isPrevalLoading ? 'Mencari...' : 'Cari Nomor Rekening' }}
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
import { FormModelPenempatanDeposito } from "@/models/formModel";
import ButtonComponent from "@/components/button.vue";

export default {
    components: {
        FormField,
        ButtonComponent,
    },
    props: {
        isOpen: Boolean,
        handleTransfer: Function,
    },
    emits: ["close", "cardClick"],
    computed: {
        iconPath() {
            return new URL(`/src/assets/account-found.svg`, import.meta.url).href;
        },
        isButtonDisabled() {
            const nomorRekeningValid = this.form.nomorRekening && /^\d+$/.test(this.form.nomorRekening) && this.form.nomorRekening.length >= 6;
            if (!nomorRekeningValid) {
                return true;
            }
            return false;
        }
    },
    data() {
        return {
            touched: {
                nomorRekening: false,
            },
            form: new FormModelPenempatanDeposito("Universal BPR"),
            fileStore: useFileStore(),
            rekeningDitemukan: false,
            rekeningData: {
                account_bank: "",
                account_name: "",
                account_number: "",
                message: "",
            },
            isPrevalLoading: false,
            nomorRekeningError: false,
        };
    },
    watch: {
        isOpen(newVal) {
            if (newVal) {
                this.resetForm();
            }
        },
        'form.nomorRekening'(newVal) {
            // console.log('Nilai nomor rekening berubah menjadi:', newVal);
            this.touched.nomorRekening = true;
            // console.log('Status touched nomor rekening:', this.touched.nomorRekening);
            if (newVal) {
                const isValid = this.validateNomorRekening(newVal);
                this.nomorRekeningError = !isValid;
                // console.log('Hasil validasi nomor rekening:', isValid);
                // console.log('Status error nomor rekening:', this.nomorRekeningError);
            } else {
                this.nomorRekeningError = false;
                // console.log('Nomor rekening kosong, error direset menjadi:', this.nomorRekeningError);
            }
        },
    },
    created() {
        //  this.fetchBankOptions();
    },
    methods: {
        validateNomorRekening(nomorRekening) {
            return /^\d+$/.test(nomorRekening) && nomorRekening.length >= 10;
        },
        handleNomorRekeningBlur() {
            this.touched.nomorRekening = true;
            if (this.form.nomorRekening) {
                this.nomorRekeningError = !this.validateNomorRekening(this.form.nomorRekening);
            }
        },
        resetForm() {
            this.form = new FormModelPenempatanDeposito("Universal BPR",),
                this.rekeningDitemukan = false;
            this.rekeningData = {
                account_bank: "",
                account_name: "",
                account_number: "",
                message: "",
            };
            this.isPrevalLoading = false;
            this.nomorRekeningError = false;
            this.touched.nomorRekening = false;
        },
        async handlePreval() {
            if (!this.form.namaBank || !this.form.nomorRekening) {
                alert("Nama Bank dan Nomor Rekening harus diisi.");
                return;
            }

            this.isPrevalLoading = true;
            this.rekeningDitemukan = false;

            try {
                const payload = {
                    nomor_rekening: this.form.nomorRekening,
                    kode_bank: "bprUniversal",
                    no_hp: this.fileStore.no_hp,
                };
                const response = await api.post("/preval", payload);
                console.log("Preval Response:", response.data);

                if (response.status === 200) {
                    this.rekeningData = { ...response.data };
                    this.rekeningDitemukan = true;
                } else {
                    alert(response.data.message || "Rekening tidak ditemukan.");
                    this.rekeningDitemukan = false;
                }
            } catch (error) {
                console.error("Error during preval:", error);
                alert("Terjadi kesalahan saat memvalidasi rekening.");
                this.rekeningDitemukan = false;
            } finally {
                this.isPrevalLoading = false;
            }
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
        emitTransfer() {
            if (this.handleTransfer) {
                this.handleTransfer({
                    namaLengkap: this.rekeningData.account_name,
                    namaBank: this.rekeningData.account_bank,
                    nomorRekening: this.rekeningData.account_number,
                });
            }
            this.$emit("close");
        },
    },
};
</script>

<style scoped>
.initials-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #e0e0e0;
    font-size: 24px;
    font-weight: bold;
    color: #616161;
    text-transform: uppercase;
    margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>