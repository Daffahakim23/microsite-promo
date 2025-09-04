<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div
            class="w-sm max-w-sm flex flex-col bg-white rounded-2xl p-10 border border-neutral-200 relative mx-4 sm:mx-auto">
            <div class="text-left">
                <h3 class="text-xl font-semibold text-primary dark:text-white items-center">
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

            <div class="flex justify-between mt-4">
                <ButtonComponent variant="ghost" @click="closeModal">Batalkan</ButtonComponent>
                <ButtonComponent @click="handleSubmit">
                    Mengerti
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

export default {
    emits: ["close", "back"],
    components: {
        ButtonComponent,
    },
    props: {
        isOpen: Boolean,
        documentType: String,
    },
    data() {
        return {
            guides: [],
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
                    { icon: liveness3, text: "Untuk hasil yang akurat, ambil foto di tempat dengan pencahayaan yang cukup." },
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
    },
    methods: {
        handleSubmit() {
            this.$emit("close");
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
    padding: 8px;
    border-radius: 5px;
    margin: 16px auto;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
