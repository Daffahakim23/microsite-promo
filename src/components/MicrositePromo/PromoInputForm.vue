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
                        <!-- <p v-if="statusMessage" :class="statusClass">{{ statusMessage }}</p> -->
                    </InputField>

                    <button type="button" @click="getLocation"
                        class="w-full border-1 border-neutral-600 text-neutral-600 rounded-xl font-semibold py-3 px-4 hover:border-neutral-800 focus:outline-none focus:ring-1 inline-flex items-center justify-center space-x-2">
                        <i class="fas fa-location-arrow"></i>
                        <span>Lokasi Saat Ini</span>
                    </button>
                </div>


                <InputField id="gambar" label="URL GAMBAR" type="text" placeholder="" hint=""
                    v-model="promoData.imageURL" />
            </div>
            <div class="my-6">
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center justify-center space-x-2"
                    :disabled="!promoData.address">
                    <!-- <i class="fas fa-plus"></i> -->
                    <span>Simpan</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { firebaseApp } from '@/firebase';
import { getFirestore, doc, collection, addDoc, setDoc, getDocs, Timestamp } from 'firebase/firestore';
import InputField from '../MicrositePromo/InputField.vue';// <-- 1. Import Pinia store
import { useFileStore } from "@/stores/filestore";

const geocoder = ref(null);
let geocoderReadyPromiseResolve = null;
const geocoderReadyPromise = new Promise(resolve => {
    geocoderReadyPromiseResolve = resolve;
});

window.initMapCallback = () => {
    geocoder.value = new google.maps.Geocoder();
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
        if (!geocoder.value) {
            window.initMapCallback();
        }
    }
};

export default {
    name: 'PromoInputForm',
    components: {
        InputField
    },
    setup() {
        // 2. Access the Pinia store
        const fileStore = useFileStore();

        // Reactive state
        const promoData = ref({
            category: '',
            merchantId: '', // We'll get this from Pinia
            title: '',
            subtitle: '',
            details: '',
            validUntil: '',
            imageURL: '',
            address: '',
            latitude: null,
            longitude: null,
        });

        const categoryOptions = ref([
            { value: 'food-&-beverages', text: 'Food & Beverages' },
            { value: 'shopping', text: 'Shopping' },
            { value: 'travel', text: 'Travel' },
            { value: 'entertaiment', text: 'Entertainment' },
            { value: 'house', text: 'House' },
            { value: 'hotel', text: 'Hotel' },
        ]);

        const statusMessage = ref('');
        const statusClass = ref('');

        // Computed property to check if all fields are filled
        const isFormValid = computed(() => {
            const data = promoData.value;
            return (
                data.category &&
                data.title &&
                data.subtitle &&
                data.details &&
                data.validUntil &&
                data.imageURL &&
                data.address
            );
        });

        // Methods
        const clearStatusMessageAfterDelay = () => {
            setTimeout(() => {
                statusMessage.value = '';
                statusClass.value = '';
            }, 1500);
        };

        const getLocation = async () => {
            statusMessage.value = 'Mengambil lokasi...';
            statusClass.value = 'toast-info';
            clearStatusMessageAfterDelay();

            await geocoderReadyPromise;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latlng = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        promoData.value.latitude = latlng.lat;
                        promoData.value.longitude = latlng.lng;

                        geocoder.value.geocode({ 'location': latlng }, (results, status) => {
                            if (status === 'OK') {
                                if (results[0]) {
                                    promoData.value.address = results[0].formatted_address;
                                    statusMessage.value = 'Lokasi berhasil diambil!';
                                    statusClass.value = 'toast-success';
                                } else {
                                    statusMessage.value = 'Tidak ada hasil alamat ditemukan.';
                                    statusClass.value = 'toast-error';
                                }
                            } else {
                                statusMessage.value = 'Geocoder gagal karena: ' + status;
                                statusClass.value = 'toast-error';
                            }
                            clearStatusMessageAfterDelay();
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
                        statusMessage.value = errorMessage;
                        statusClass.value = 'toast-error';
                        clearStatusMessageAfterDelay();
                    }
                );
            } else {
                statusMessage.value = 'Geolocation tidak didukung oleh browser ini.';
                statusClass.value = 'toast-error';
                clearStatusMessageAfterDelay();
            }
        };

        const addPromo = async () => {
            try {
                // 3. Get the merchantId from the Pinia store's state
                const merchantIdFromPinia = fileStore.uuid;

                if (!merchantIdFromPinia) {
                    console.error('Error: merchantId tidak ditemukan di Pinia store.');
                    statusMessage.value = 'Error: ID merchant tidak ditemukan. Silakan login ulang.';
                    statusClass.value = 'toast-error';
                    clearStatusMessageAfterDelay();
                    return; // Stop the function if no merchantId is found
                }

                // Assign the ID to promoData
                promoData.value.merchantId = merchantIdFromPinia;

                const db = getFirestore(firebaseApp);
                const categoryDocRef = doc(db, 'categories', promoData.value.category);
                const promosCollectionRef = collection(categoryDocRef, 'promos');

                const newPromoRef = doc(promosCollectionRef);
                const newPromoId = newPromoRef.id;

                await setDoc(newPromoRef, {
                    promoId: newPromoId,
                    merchantId: promoData.value.merchantId,
                    title: promoData.value.title,
                    subtitle: promoData.value.subtitle,
                    details: promoData.value.details,
                    imageURL: promoData.value.imageURL,
                    validUntil: promoData.value.validUntil,
                    address: promoData.value.address,
                    latitude: promoData.value.latitude,
                    longitude: promoData.value.longitude,
                    registeredDate: Timestamp.now(),
                });

                console.log("Dokumen berhasil ditambahkan dengan ID: ", newPromoId);
                statusMessage.value = 'Promo berhasil ditambahkan!';
                statusClass.value = 'toast-success';

                clearStatusMessageAfterDelay();

                // Reset form fields
                promoData.value = {
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
            } catch (e) {
                console.error("Error saat menambahkan dokumen: ", e);
                statusMessage.value = 'Error: Gagal menambahkan promo.';
                statusClass.value = 'toast-error';
                clearStatusMessageAfterDelay();
            }
        };

        onMounted(() => {
            loadGoogleMapsScript();
        });

        // Expose to the template
        return {
            promoData,
            categoryOptions,
            statusMessage,
            statusClass,
            isFormValid,
            getLocation,
            addPromo,
        };
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

/* Vue Transition styles for fading in and out */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
