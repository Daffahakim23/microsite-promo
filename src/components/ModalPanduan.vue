<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
            class="w-sm max-w-sm flex flex-col bg-white rounded-2xl p-10 border border-neutral-200 relative mx-4 sm:mx-auto">
            <div class="text-left">
                <h3 class="text-2xl font-semibold text-primary dark:text-white items-center">
                    Panduan {{ documentTypeText }}
                </h3>
                <p class="text-neutral-800 dark:text-gray-300 mt-2">
                    Pastikan hal berikut saat {{ documentTypeTextSub }}:
                </p>
            </div>

            <div class="mt-4 space-y-4">
                <div v-for="(guide, index) in guideList" :key="index"
                    class="flex items-center bg-gray-100 p-3 rounded-lg dark:bg-neutral-900">
                    <img :src="guide.icon" :alt="guide.text" class="w-6 h-6 mr-3" />
                    <p class="text-neutral-900 dark:text-gray-300 text-sm">{{ guide.text }}</p>
                </div>
            </div>

            <div v-if="requiresCaptcha && !captchaVerified" class="mt-4">
                <p class="justify-center text-sm font-medium text-neutral-900">Masukkan kode berikut:</p>
                <div
                    class="captcha-box bg-neutral-50 border-dashed border-1 flex justify-center items-center p-12 rounded-md mt-2 w-full">
                    <span class="font-bold text-3xl flex">
                        <span v-for="(item, index) in captcha" :key="index">
                            {{ item.char }}
                        </span>
                    </span>
                    <button @click="refreshCaptcha" class="ml-2">
                        <img :src="reloadIcon" alt="Refresh Captcha" class="h-4 w-4 align-text-bottom">
                    </button>
                </div>

                <div>
                    <FormField v-model="userInput" placeholder="Masukkan Captcha" label="" id=""
                        :hint="isValid ? 'Captcha tidak valid, silakan periksa kembali' : ''" :error="isValid"
                        class="mb--4" />
                </div>
            </div>

            <div class="flex justify-between mt-4">
                <ButtonComponent variant="ghost" @click="closeModal">Batalkan</ButtonComponent>
                <ButtonComponent @click="handleSubmit" :disabled="isButtonDisabled">
                    {{ submitButtonText }}
                </ButtonComponent>
            </div>
        </div>
    </div>
</template>

<script>
import ektpIcon1 from "../assets/PanduanEKTP1.svg";
import ektpIcon2 from "../assets/PanduanEKTP2.svg";
import ektpIcon3 from "../assets/PanduanEKTP3.svg";
import liveness1 from "../assets/PanduanLiveness1.svg";
import liveness2 from "../assets/PanduanLiveness2.svg";
import liveness3 from "../assets/PanduanLiveness3.svg";
import Npwp1 from "../assets/PanduanNPWP1.svg";
import Npwp2 from "../assets/PanduanNPWP2.svg";
import Npwp3 from "../assets/PanduanNPWP3.svg";
import tandaTangan1 from "../assets/PanduanTandaTangan1.svg";
import tandaTangan2 from "../assets/PanduanTandaTangan2.svg";
import tandaTangan3 from "../assets/PanduanTandaTangan3.svg";
import ButtonComponent from "@/components/button.vue";
import reloadIcon from '@/assets/reload-icon.svg';
import FormField from "@/components/FormField.vue";

export default {
    emits: ["close", "back"],
    components: {
        ButtonComponent,
        FormField,
    },
    props: {
        isOpen: Boolean,
        documentType: String,
    },
    data() {
        return {
            reloadIcon,
            userInput: "",
            message: "",
            isValid: false,
            captcha: this.generateCaptcha(),
            guides: [],
            captchaVerified: false,
        };
    },
    computed: {
        guideList() {
            const guides = {
                ktp: [
                    { icon: ektpIcon1, text: "Gunakan e-KTP asli, dengan kondisi baik dan tidak rusak" },
                    { icon: ektpIcon2, text: "Pastikan semua sisi dan informasi e-KTP Anda terlihat jelas" },
                    { icon: ektpIcon3, text: "Hindari pantulan cahaya dan pastikan gambar tidak blur" },
                ],
                npwp: [
                    { icon: Npwp1, text: "Ambil foto NPWP asli, bukan versi hasil scan" },
                    { icon: Npwp2, text: "Pastikan seluruh dokumen NPWP terlihat utuh dan tidak terpotong" },
                    { icon: Npwp3, text: "Pastikan semua data dan informasi pada NPWP terbaca dengan jelas" },
                ],
                tandaTangan: [
                    { icon: tandaTangan1, text: "Ambil foto tanda tangan Anda tepat di sepanjang garis bantu yang tersedia" },
                    { icon: tandaTangan2, text: "Pastikan tanda tangan yang difoto sesuai sama persis dengan yang tertera di E-KTP Anda" },
                    { icon: tandaTangan3, text: "Periksa kembali bahwa foto tidak terpotong sebelum mengunggahnya melalui e-form" },
                ],
                fotoDiri: [
                    { icon: liveness1, text: "Lepas kacamata, masker, topi atau aksesoris wajah lainnya." },
                    { icon: liveness2, text: "Sesuaikan wajah Anda di area foto yang sudah ditentukan" },
                    { icon: liveness3, text: "Untuk hasil yang akurat, verifikasi di tempat dengan pencahayaan yang baik." },
                ],
            };
            return guides[this.documentType] || [];
        },
        documentTypeText() {
            const textMap = {
                ktp: "Upload e-KTP",
                npwp: "Upload NPWP",
                tandaTangan: "Upload Tanda Tangan",
                // fotoDiri: "Upload Foto Diri",
                fotoDiri: "Ambil Foto Wajah",
            };
            return textMap[this.documentType] || "Dokumen";
        },
        documentTypeTextSub() {
            const textMap = {
                ktp: "Upload e-KTP",
                npwp: "Upload NPWP",
                tandaTangan: "Upload Tanda Tangan",
                // fotoDiri: "Upload Foto Diri",
                fotoDiri: "ambil foto wajah Anda",
            };
            return textMap[this.documentType] || "Dokumen";
        },
        requiresCaptcha() {
            return ["ktp", "fotoDiri"].includes(this.documentType);
        },
        submitButtonText() {
            if (this.captchaVerified) {
                return "Mengerti";
            }
            return ["tandaTangan", "npwp"].includes(this.documentType) ? "Mengerti" : "Mengerti";
        },
        isButtonDisabled() {
            return this.requiresCaptcha && !this.captchaVerified && (this.userInput.length !== 6);
        },
    },
    methods: {
        generateCaptcha() {
            const spacing = '20px'
            return Math.random()
                .toString(36)
                .substring(2, 8)
                .split("")
                .map((char) => {
                    return {
                        char: char.toUpperCase(),
                        style: { letterSpacing: spacing }
                    };
                });
        },
        handleCaptchaBlur() {
            if (this.userInput) {
                const generatedCaptcha = this.captcha.map((item) => item.char).join("");
                if (this.userInput === generatedCaptcha) {
                    this.isValid = false;
                    this.message = "Captcha benar!";
                    this.captchaVerified = true;
                } else {
                    this.isValid = true;
                    this.message = "Captcha salah, coba lagi.";
                    this.captchaVerified = false;
                }
            } else {
                this.isValid = true;
                this.message = "Captcha harus diisi.";
                this.captchaVerified = false;
            }
        },
        refreshCaptcha() {
            this.captcha = this.generateCaptcha();
            this.userInput = "";
            this.message = "";
            this.isValid = false;
            this.captchaVerified = false;
        },
        handleSubmit() {
            if (this.requiresCaptcha && !this.captchaVerified) {
                const generatedCaptcha = this.captcha.map((item) => item.char).join("");
                if (this.userInput === generatedCaptcha) {
                    this.isValid = false;
                    this.message = "Captcha benar!";
                    this.captchaVerified = true;
                } else {
                    this.isValid = true;
                    this.message = "Captcha salah, coba lagi.";
                }
            } else {
                this.$emit("close");
            }
        },
        closeModal() {
            this.$emit("back");
        },
    },
};
</script>

<style scoped>
.captcha-box {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 5px;
    margin: 16px auto;
}

.input-group {
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
}

.captcha-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.captcha-btn {
    color: white;
    padding: 8px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
