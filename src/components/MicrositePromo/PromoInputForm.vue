<template>
    <div class="py-6 pb-6 max-w-lg mx-auto space-y-4 bg-white relative">
        <transition name="">
            <div v-if="statusMessage"
                class="fixed top-18 left-1/2 transform -translate-x-1/2 rounded-xl text-white w-56 p-4 flex space-x-2 items-center justify-center"
                :class="statusClass">
                <i v-if="statusClass === 'toast-success'" class="fas fa-check-circle"></i>
                <i v-else-if="statusClass === 'toast-error'" class="fas fa-exclamation-circle"></i>
                <i v-else-if="statusClass === 'toast-info'" class="fas fa-info-circle"></i>
                <span>{{ statusMessage }}</span>
            </div>
        </transition>
        <form @submit.prevent="addPromo">
            <div class="space-y-8">

                <InputField id="name" label="KATEGORI PROMO" type="select" placeholder="" hint="" required="true"
                    v-model="promoData.category" :options="categoryOptions" />

                <InputField id="name" label="NAMA PROMO" type="text" placeholder="" hint="" v-model="promoData.title" />

                <InputField id="subtitle" label="DESKRIPSI PROMO" type="text" placeholder="" hint=""
                    v-model="promoData.subtitle" />


                <InputField id="detail" label="DETAIL PROMO" type="text" placeholder="" hint="" required="true"
                    v-model="promoData.details" />


                <InputField id="date" label="BERLAKU SAMPAI" type="date" placeholder="" hint=""
                    v-model="promoData.validUntil" />

                <div class="">
                    <InputField id="addreess" label="ALAMAT" type="text" placeholder="" v-model="promoData.address">
                    </InputField>

                    <button type="button" @click="getLocation"
                        class="w-full border-1 border-neutral-600 text-neutral-600 rounded-xl font-semibold py-3 px-4 hover:border-neutral-800 focus:outline-none focus:ring-1 inline-flex items-center justify-center space-x-2">
                        <i class="fas fa-location-arrow"></i>
                        <span>Lokasi Saat Ini</span>
                    </button>
                </div>


                <div>
                    <label for="imageUpload" class="block text-sm font-regular text-gray-900 mb-1">Gambar Promo</label>
                    <input type="file" id="imageUpload" ref="fileInput" @change="onFileChange"
                        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer text-center bg-white focus:outline-none" />
                    <p v-if="imagePreview" class="mt-2 text-center text-sm relative">
                        <img :src="imagePreview" alt="Image Preview" class="mx-auto h-24 w-auto rounded" />
                        <button @click="removeImage" type="button"
                            class="absolute top-4 right-3 transform translate-x-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 focus:outline-none">
                            <i class="fas fa-times-circle text-2xl rounded-full"></i>
                        </button>
                    </p>
                </div>

            </div>
            <div class="my-6">
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center justify-center space-x-2"
                    :disabled="!promoData.address">
                    <span>Simpan</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { firebaseApp } from '@/firebase';
import { getFirestore, doc, collection, setDoc, Timestamp } from 'firebase/firestore';
import InputField from '../MicrositePromo/InputField.vue';
import { useFileStore } from "@/stores/filestore";

let geocoder = null;
let geocoderReadyPromiseResolve = null;
const geocoderReadyPromise = new Promise(resolve => {
    geocoderReadyPromiseResolve = resolve;
});

window.initMapCallback = () => {
    geocoder = new google.maps.Geocoder();
    geocoderReadyPromiseResolve(true);
};

const loadGoogleMapsScript = () => {
    if (!window.google) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPIPNe7opK1Q5ab7B6_w0TPjRZdzUYOs4&libraries=places&callback=initMapCallback`;
        script.async = true;
        document.head.appendChild(script);
    } else {
        if (!geocoder) {
            window.initMapCallback();
        }
    }
};

export default {
    name: 'PromoInputForm',
    components: {
        InputField
    },
    data() {
        return {
            promoData: {
                category: '',
                merchantId: '',
                title: '',
                subtitle: '',
                details: '',
                validUntil: '',
                imageURL: '',
                address: '',
                latitude: null,
                longitude: null,
            },
            categoryOptions: [
                { value: 'food-&-beverages', text: 'Food & Beverages' },
                { value: 'shopping', text: 'Shopping' },
                { value: 'travel', text: 'Travel' },
                { value: 'entertaiment', text: 'Entertainment' },
                { value: 'house', text: 'House' },
                { value: 'hotel', text: 'Hotel' },
            ],
            statusMessage: '',
            statusClass: '',
            geocoder: null,
            file: null,
            imagePreview: null,
            cloudinary: {
                cloudName: 'djbmsngde',
                uploadPreset: 'smart-parking-solution',
            }
        };
    },
    computed: {
        isFormValid() {
            const data = this.promoData;
            return (
                data.category &&
                data.title &&
                data.subtitle &&
                data.details &&
                data.validUntil &&
                data.address
            );
        },
    },
    methods: {
        clearStatusMessageAfterDelay() {
            setTimeout(() => {
                this.statusMessage = '';
                this.statusClass = '';
            }, 1500);
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.file = file;
                this.imagePreview = URL.createObjectURL(file);
            }
        },
        removeImage() {
            this.file = null;
            this.imagePreview = null;
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = '';
            }
        },
        async uploadImageToCloudinary() {
            if (!this.file) return null; // Jika tidak ada file, lewati proses upload
            this.statusMessage = 'Mengunggah gambar...';
            this.statusClass = 'toast-info';

            const formData = new FormData();
            formData.append('file', this.file);
            formData.append('upload_preset', this.cloudinary.uploadPreset);

            try {
                const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudinary.cloudName}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                return data.secure_url;
            } catch (error) {
                console.error("Error mengunggah gambar ke Cloudinary:", error);
                this.statusMessage = 'Gagal mengunggah gambar.';
                this.statusClass = 'toast-error';
                return null;
            }
        },
        async getLocation() {
            this.statusMessage = 'Mengambil lokasi...';
            this.statusClass = 'toast-info';
            this.clearStatusMessageAfterDelay();

            await geocoderReadyPromise;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latlng = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        this.promoData.latitude = latlng.lat;
                        this.promoData.longitude = latlng.lng;

                        geocoder.geocode({ 'location': latlng }, (results, status) => {
                            if (status === 'OK') {
                                if (results[0]) {
                                    this.promoData.address = results[0].formatted_address;
                                    this.statusMessage = 'Lokasi berhasil diambil!';
                                    this.statusClass = 'toast-success';
                                } else {
                                    this.statusMessage = 'Tidak ada hasil alamat ditemukan.';
                                    this.statusClass = 'toast-error';
                                }
                            } else {
                                this.statusMessage = 'Geocoder gagal karena: ' + status;
                                this.statusClass = 'toast-error';
                            }
                            this.clearStatusMessageAfterDelay();
                        });
                    },
                    (error) => {
                        console.error('Error saat mengambil lokasi: ', error);
                        let errorMessage = 'Error: Gagal mengambil lokasi.';
                        if (error.code === error.PERMISSION_DENIED) {
                            errorMessage += ' Izin lokasi ditolak.';
                        } else if (error.code === error.POSITION_UNAVAILABLE) {
                            errorMessage += ' Lokasi tidak tersedia.';
                        } else if (error.code === error.TIMEOUT) {
                            errorMessage += ' Waktu habis.';
                        }
                        this.statusMessage = errorMessage;
                        this.statusClass = 'toast-error';
                        this.clearStatusMessageAfterDelay();
                    }
                );
            } else {
                this.statusMessage = 'Geolocation tidak didukung oleh browser ini.';
                this.statusClass = 'toast-error';
                this.clearStatusMessageAfterDelay();
            }
        },
        // async addPromo() {
        //     // Cek kelengkapan field utama terlebih dahulu
        //     if (!this.promoData.title || !this.promoData.subtitle || !this.promoData.details || !this.promoData.validUntil || !this.promoData.address) {
        //         this.statusMessage = "Mohon lengkapi semua field yang diperlukan.";
        //         this.statusClass = 'toast-error';
        //         this.clearStatusMessageAfterDelay();
        //         return;
        //     }

        //     try {
        //         const fileStore = useFileStore();
        //         const merchantIdFromPinia = fileStore.uuid;

        //         if (!merchantIdFromPinia) {
        //             console.error('Error: merchantId tidak ditemukan di Pinia store.');
        //             this.statusMessage = 'Error: ID merchant tidak ditemukan. Silakan login ulang.';
        //             this.statusClass = 'toast-error';
        //             this.clearStatusMessageAfterDelay();
        //             return;
        //         }

        //         let finalImageURL;
        //         // Jika tidak ada file yang diunggah, gunakan URL placeholder
        //         if (!this.file) {
        //             finalImageURL = 'https://operaparallele.org/wp-content/uploads/2023/09/Placeholder_Image.png';
        //         } else {
        //             // Jika ada file, unggah ke Cloudinary
        //             finalImageURL = await this.uploadImageToCloudinary();
        //             if (!finalImageURL) {
        //                 return; // Berhenti jika upload gagal
        //             }
        //         }

        //         this.promoData.imageURL = finalImageURL;
        //         this.promoData.merchantId = merchantIdFromPinia;

        //         const db = getFirestore(firebaseApp);
        //         const categoryDocRef = doc(db, 'categories', this.promoData.category);
        //         const promosCollectionRef = collection(categoryDocRef, 'promos');

        //         const newPromoRef = doc(promosCollectionRef);
        //         const newPromoId = newPromoRef.id;

        //         await setDoc(newPromoRef, {
        //             promoId: newPromoId,
        //             merchantId: this.promoData.merchantId,
        //             title: this.promoData.title,
        //             subtitle: this.promoData.subtitle,
        //             details: this.promoData.details,
        //             imageURL: this.promoData.imageURL,
        //             validUntil: this.promoData.validUntil,
        //             address: this.promoData.address,
        //             latitude: this.promoData.latitude,
        //             longitude: this.promoData.longitude,
        //             registeredDate: Timestamp.now(),
        //         });

        //         console.log("Dokumen berhasil ditambahkan dengan ID: ", newPromoId);
        //         this.statusMessage = 'Promo berhasil ditambahkan!';
        //         this.statusClass = 'toast-success';
        //         this.clearStatusMessageAfterDelay();

        //         this.promoData = {
        //             category: '',
        //             merchantId: '',
        //             title: '',
        //             subtitle: '',
        //             details: '',
        //             validUntil: '',
        //             imageURL: '',
        //             address: '',
        //             latitude: null,
        //             longitude: null,
        //         };
        //         this.file = null;
        //         this.imagePreview = null;
        //         this.$refs.fileInput.value = '';
        //     } catch (e) {
        //         console.error("Error saat menambahkan dokumen: ", e);
        //         this.statusMessage = 'Error: Gagal menambahkan promo.';
        //         this.statusClass = 'toast-error';
        //         this.clearStatusMessageAfterDelay();
        //     }
        // },

        async addPromo() {
            // Cek kelengkapan field utama terlebih dahulu
            if (!this.promoData.title || !this.promoData.subtitle || !this.promoData.details || !this.promoData.validUntil || !this.promoData.address) {
                this.statusMessage = "Mohon lengkapi semua field yang diperlukan.";
                this.statusClass = 'toast-error';
                this.clearStatusMessageAfterDelay();
                return;
            }

            try {
                const fileStore = useFileStore();
                const merchantIdFromPinia = fileStore.uuid;

                if (!merchantIdFromPinia) {
                    console.error('Error: merchantId tidak ditemukan di Pinia store.');
                    this.statusMessage = 'Error: ID merchant tidak ditemukan. Silakan login ulang.';
                    this.statusClass = 'toast-error';
                    this.clearStatusMessageAfterDelay();
                    return;
                }

                let finalImageURL;
                // Jika tidak ada file yang diunggah, gunakan URL placeholder
                if (!this.file) {
                    finalImageURL = 'https://operaparallele.org/wp-content/uploads/2023/09/Placeholder_Image.png';
                } else {
                    // Jika ada file, unggah ke Cloudinary
                    finalImageURL = await this.uploadImageToCloudinary();
                    if (!finalImageURL) {
                        return; // Berhenti jika upload gagal
                    }
                }

                this.promoData.imageURL = finalImageURL;
                this.promoData.merchantId = merchantIdFromPinia;

                const db = getFirestore(firebaseApp);
                const categoryDocRef = doc(db, 'categories', this.promoData.category);
                const promosCollectionRef = collection(categoryDocRef, 'promos');

                const newPromoRef = doc(promosCollectionRef);
                const newPromoId = newPromoRef.id;

                // **PERUBAHAN DI SINI:** Konversi string validUntil menjadi Timestamp
                const validUntilDate = new Date(this.promoData.validUntil);
                const validUntilTimestamp = Timestamp.fromDate(validUntilDate);

                await setDoc(newPromoRef, {
                    promoId: newPromoId,
                    merchantId: this.promoData.merchantId,
                    title: this.promoData.title,
                    subtitle: this.promoData.subtitle,
                    details: this.promoData.details,
                    imageURL: this.promoData.imageURL,
                    validUntil: validUntilTimestamp, // Gunakan Timestamp yang sudah dikonversi
                    address: this.promoData.address,
                    latitude: this.promoData.latitude,
                    longitude: this.promoData.longitude,
                    registeredDate: Timestamp.now(),
                });

                console.log("Dokumen berhasil ditambahkan dengan ID: ", newPromoId);
                this.statusMessage = 'Promo berhasil ditambahkan!';
                this.statusClass = 'toast-success';
                this.clearStatusMessageAfterDelay();

                // Reset data setelah berhasil
                this.promoData = {
                    category: '',
                    merchantId: '',
                    title: '',
                    subtitle: '',
                    details: '',
                    validUntil: '',
                    imageURL: '',
                    address: '',
                    latitude: null,
                    longitude: null,
                };
                this.file = null;
                this.imagePreview = null;
                this.$refs.fileInput.value = '';
            } catch (e) {
                console.error("Error saat menambahkan dokumen: ", e);
                this.statusMessage = 'Error: Gagal menambahkan promo.';
                this.statusClass = 'toast-error';
                this.clearStatusMessageAfterDelay();
            }
        },
    },
    mounted() {
        loadGoogleMapsScript();
    },
};
</script>

<style scoped>
.toast-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1500;
    padding: 1rem 1rem;
    border-radius: 20px;
    color: white;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.toast-success {
    background-color: #22c55e;
}

.toast-error {
    background-color: #ef4444;
}

.toast-info {
    background-color: #3b82f6;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>