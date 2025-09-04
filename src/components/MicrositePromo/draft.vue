<template>
    <div class="p-6 pb-12 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        <!-- <h2 class="text-2xl font-bold text-gray-900 text-center">Input Data Merchant</h2>
        <form @submit.prevent="addMerchant">
            <div class="space-y-4">
                <div>
                    <label for="newMerchantName" class="block text-sm font-medium text-gray-700">Nama Merchant</label>
                    <input v-model="newMerchantData.merchantName" id="newMerchantName" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newOwnerName" class="block text-sm font-medium text-gray-700">Nama Pemilik</label>
                    <input v-model="newMerchantData.ownerName" id="newOwnerName" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newIdNumber" class="block text-sm font-medium text-gray-700">Nomor ID</label>
                    <input v-model="newMerchantData.idNumber" id="newIdNumber" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newBankAccount" class="block text-sm font-medium text-gray-700">Nomor Rekening
                        Bank</label>
                    <input v-model="newMerchantData.bankAccount" id="newBankAccount" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newCategoryMcc" class="block text-sm font-medium text-gray-700">Kategori MCC</label>
                    <select v-model="newMerchantData.category_mcc" id="newCategoryMcc"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required>
                        <option value="food-&-beverages">Food & Beverages</option>
                        <option value="shopping">Shopping</option>
                        <option value="travel">Travel</option>
                        <option value="entertaiment">Entertainment</option>
                        <option value="house">House</option>
                        <option value="hotel">Hotel</option>
                    </select>
                </div>
            </div>
            <div class="mt-6">
                <button type="submit"
                    class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Tambah Merchant Baru
                </button>
            </div>
        </form>
        <p v-if="merchantStatusMessage" :class="merchantStatusClass">{{ merchantStatusMessage }}</p>

        <hr class="my-8"> -->

        <h2 class="text-2xl font-bold text-gray-900 text-center">Input Data Promo</h2>
        <form @submit.prevent="addPromo">
            <div class="space-y-4">
                <div>
                    <label for="category" class="block text-sm font-medium text-gray-700">Kategori</label>
                    <select v-model="promoData.category" id="category"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="food-&-beverages">Food & Beverages</option>
                        <option value="shopping">Shopping</option>
                        <option value="travel">Travel</option>
                        <option value="entertaiment">Entertainment</option>
                        <option value="house">House</option>
                        <option value="hotel">Hotel</option>
                    </select>
                </div>
                <!-- <div>
                    <label for="merchant" class="block text-sm font-medium text-gray-700">Pilih Merchant</label>
                    <select v-model="promoData.merchantId" id="merchant"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required>
                        <option v-for="merchant in merchants" :key="merchant.id" :value="merchant.id">
                            {{ merchant.merchantName }}
                        </option>
                    </select>
                </div> -->
                <div>
                    <label for="title" class="block text-sm font-medium text-gray-700">Judul Promo</label>
                    <input v-model="promoData.title" id="title" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="subtitle" class="block text-sm font-medium text-gray-700">Subjudul</label>
                    <input v-model="promoData.subtitle" id="subtitle" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="details" class="block text-sm font-medium text-gray-700">Detail Promo</label>
                    <textarea v-model="promoData.details" id="details" rows="3" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <label for="validUntil" class="block text-sm font-medium text-gray-700">Berlaku Sampai</label>
                    <input v-model="promoData.validUntil" id="validUntil" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="imageURL" class="block text-sm font-medium text-gray-700">URL Gambar</label>
                    <input v-model="promoData.imageURL" id="imageURL" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="address" class="block text-sm font-medium text-gray-700">Alamat</label>
                    <input v-model="promoData.address" id="address" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        readonly>
                </div>
                <div class="mt-4">
                    <button type="button" @click="getLocation"
                        class="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Gunakan Lokasi Saat Ini
                    </button>
                </div>
            </div>
            <div class="my-6">
                <button type="submit"
                    class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    :disabled="!promoData.address">
                    Tambah Promo
                </button>
            </div>
            <p v-if="statusMessage" :class="statusClass">{{ statusMessage }}</p>
        </form>

        <!-- Tabel untuk menampilkan daftar merchant -->
        <!-- <div class="mt-8">
            <h3 class="text-xl font-bold text-gray-900">Daftar Merchant</h3>
            <table class="min-w-full divide-y divide-gray-200 mt-4">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID
                            Merchant</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama
                            Merchant</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kategori</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="merchant in merchants" :key="merchant.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ merchant.id }}</td>
                        <td class="px-6 py-4 whitespace-now-wrap text-sm font-medium text-gray-900">{{
                            merchant.merchantName }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ merchant.category_mcc }}</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { firebaseApp } from '@/firebase';
import { getFirestore, doc, collection, addDoc, setDoc, getDocs, Timestamp } from 'firebase/firestore';

const geocoder = ref(null);
let geocoderReadyPromiseResolve = null;
const geocoderReadyPromise = new Promise(resolve => {
    geocoderReadyPromiseResolve = resolve;
});

window.initMapCallback = () => {
    geocoder.value = new google.maps.Geocoder();
    geocoderReadyPromiseResolve(true); // Resolve the promise once geocoder is ready
};

const loadGoogleMapsScript = () => {
    if (!window.google) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPIPNe7opK1Q5ab7B6_w0TPjRZdzUYOs4&libraries=places&callback=initMapCallback`;
        script.async = true;
        document.head.appendChild(script);
    } else {
        // If the script is already loaded (e.g., in development with hot reloading), call the callback
        if (!geocoder.value) {
            window.initMapCallback();
        }
    }
};

export default {
    name: 'PromoInputForm',
    data() {
        return {
            promoData: {
                category: 'food-&-beverages',
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
            newMerchantData: {
                merchantName: '',
                ownerName: '',
                idNumber: '',
                bankAccount: '',
                category_mcc: 'food-&-beverages',
            },
            merchants: [],
            statusMessage: '',
            statusClass: '',
            merchantStatusMessage: '',
            merchantStatusClass: '',
        };
    },
    mounted() {
        this.fetchMerchants();
        loadGoogleMapsScript(); // Panggil saat komponen dipasang
    },
    methods: {
        async fetchMerchants() {
            const db = getFirestore(firebaseApp);
            const merchantsCol = collection(db, 'merchants');
            const merchantSnapshot = await getDocs(merchantsCol);
            this.merchants.length = 0;
            merchantSnapshot.forEach(doc => {
                this.merchants.push({ id: doc.id, ...doc.data() });
            });
        },
        async addMerchant() {
            try {
                const db = getFirestore(firebaseApp);
                const merchantsCol = collection(db, 'merchants');
                const docRef = await addDoc(merchantsCol, this.newMerchantData);

                console.log("Merchant berhasil ditambahkan dengan ID: ", docRef.id);
                this.merchantStatusMessage = 'Merchant berhasil ditambahkan!';
                this.merchantStatusClass = 'text-green-600';

                // Clear the form fields and refresh the merchant list
                this.newMerchantData.merchantName = '';
                this.newMerchantData.ownerName = '';
                this.newMerchantData.idNumber = '';
                this.newMerchantData.bankAccount = '';
                this.newMerchantData.category_mcc = 'food-&-beverages';

                this.fetchMerchants(); // Refresh the list of merchants
            } catch (e) {
                console.error("Error saat menambahkan merchant: ", e);
                this.merchantStatusMessage = 'Error: Gagal menambahkan merchant.';
                this.merchantStatusClass = 'text-red-600';
            }
        },
        async getLocation() {
            this.statusMessage = 'Mengambil lokasi...';
            this.statusClass = 'text-blue-600';

            // Wait for the geocoder to be ready before proceeding
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

                        // Use the geocoder now that we know it's ready
                        geocoder.value.geocode({ 'location': latlng }, (results, status) => {
                            if (status === 'OK') {
                                if (results[0]) {
                                    this.promoData.address = results[0].formatted_address;
                                    this.statusMessage = 'Lokasi berhasil diambil!';
                                    this.statusClass = 'text-green-600';
                                } else {
                                    this.statusMessage = 'Tidak ada hasil alamat ditemukan.';
                                    this.statusClass = 'text-red-600';
                                }
                            } else {
                                this.statusMessage = 'Geocoder gagal karena: ' + status;
                                this.statusClass = 'text-red-600';
                            }
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
                        this.statusClass = 'text-red-600';
                    }
                );
            } else {
                this.statusMessage = 'Geolocation tidak didukung oleh browser ini.';
                this.statusClass = 'text-red-600';
            }
        },
        async addPromo() {
            try {
                const db = getFirestore(firebaseApp);
                const categoryDocRef = doc(db, 'categories', this.promoData.category);
                const promosCollectionRef = collection(categoryDocRef, 'promos');

                const newPromoRef = doc(promosCollectionRef);
                const newPromoId = newPromoRef.id;

                await setDoc(newPromoRef, {
                    promoId: newPromoId,
                    merchantId: this.promoData.merchantId,
                    title: this.promoData.title,
                    subtitle: this.promoData.subtitle,
                    details: this.promoData.details,
                    imageURL: this.promoData.imageURL,
                    validUntil: this.promoData.validUntil,
                    address: this.promoData.address,
                    latitude: this.promoData.latitude,
                    longitude: this.promoData.longitude,
                    registeredDate: Timestamp.now(),
                });

                console.log("Dokumen berhasil ditambahkan dengan ID: ", newPromoId);
                this.statusMessage = 'Promo berhasil ditambahkan!';
                this.statusClass = 'text-green-600';

                this.promoData.title = '';
                this.promoData.subtitle = '';
                this.promoData.details = '';
                this.promoData.validUntil = '';
                this.promoData.imageURL = '';
                this.promoData.address = '';
                this.promoData.latitude = null;
                this.promoData.longitude = null;

            } catch (e) {
                console.error("Error saat menambahkan dokumen: ", e);
                this.statusMessage = 'Error: Gagal menambahkan promo.';
                this.statusClass = 'text-red-600';
            }
        },
    },
};
</script>

<style scoped></style>
