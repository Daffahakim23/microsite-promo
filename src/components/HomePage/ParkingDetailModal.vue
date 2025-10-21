<template>
    <transition name="modal-fade-opacity">
        <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            @click.self="closeModal">

            <transition name="modal-slide">
                <div v-if="isVisible"
                    class="relative bg-white rounded-3xl max-w-md overflow-hidden shadow-xl border-none mx-12">
                    <button @click="closeModal"
                        class="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 z-10 w-10 h-10 flex items-center justify-center">
                        <i class="fas fa-times text-xl"></i>
                    </button>

                    <img :src="parkingLocation.imageUrl" :alt="parkingLocation.exp"
                        class="text-xl md:text-2xl w-full h-64 object-cover ">

                    <!-- <div
                        class="absolute top-36 right-3 border-2 w-fit px-3 py-1 rounded-full items-center flex flex-row bg-slate-50 bg-opacity-100">
                        <i class="fas fa-map-marker-alt mr-2 text-gray-600"></i>
                        <span class="text-gray-700 font-regular text-sm ">
                            <span v-if="userCurrentLocation && parkingLocation.latitude && parkingLocation.longitude">
                                {{ calculateDistance(userCurrentLocation.lat, userCurrentLocation.lng,
                                    parkingLocation.latitude, parkingLocation.longitude) }}
                            </span>
                            <span v-else>
                                N/A
                            </span>
                        </span>
                    </div> -->

                    <div class="p-5">
                        <div class="flex justify-between items-center">
                            <h2 class="text-3xl md:text-4xl font-bold  text-gray-900 mb-4">{{ parkingLocation.name }}
                            </h2>
                            <div class="text-gray-600 font-medium text-sm md:text-md mb-4">
                                <span>{{ parkingLocation.categories || 'Alamat tidak tersedia' }}</span>
                            </div>
                        </div>
                        <div
                            class="border-2 w-fit px-3 py-1 rounded-full items-center flex flex-row bg-slate-50 bg-opacity-100 mb-6">
                            <i class="fas fa-map-marker-alt mr-2 text-gray-600"></i>
                            <span class="text-gray-700 font-regular text-sm ">
                                <span
                                    v-if="userCurrentLocation && parkingLocation.latitude && parkingLocation.longitude">
                                    {{ calculateDistance(userCurrentLocation.lat, userCurrentLocation.lng,
                                        parkingLocation.latitude, parkingLocation.longitude) }}
                                </span>
                                <span v-else>
                                    N/A
                                </span>
                            </span>
                        </div>
                        <div class="flex flex-col w-full px-2 mb-8 gap-4">
                            <div @click="openGoogleMaps"
                                :disabled="!parkingLocation.latitude || !parkingLocation.longitude"
                                class="flex justify-start items-center gap-4 cursor-pointer text-gray-700 hover:text-blue-900">
                                <i class="fa-solid fa-location-dot text-xl"></i>
                                <div class="font-regular text-sm md:text-md">
                                    <span>{{ parkingLocation.address || 'Alamat tidak tersedia' }}</span>
                                </div>
                            </div>

                            <div @click="copyPhoneNumber" :disabled="!parkingLocation.phone"
                                class="flex justify-start items-center gap-4 cursor-pointer text-gray-700 hover:text-blue-900 w-full">
                                <i class="fa-solid fa-phone text-xl"></i>
                                <div class="font-regular text-sm md:text-md">
                                    <span>{{ parkingLocation.phone || '-' }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="bg-[#FFF6F5] p-4 rounded-lg mb-4 gap-2">
                            <div class="flex flex-row justify-between items-center">
                                <div class="flex flex-col py-2">
                                    <p class="text-md font-bold text-gray-700">Promo tersedia</p>
                                    <p class="text-sm text-gray-500 ">Update terakhir: {{ formattedLastLogin }}
                                    </p>
                                </div>
                                <div class="flex flex-row items-center gap-1">
                                    <!-- <img :src="parkingSignIcon" alt="Parking Sign Icon" class="h- w-8"> -->
                                    <p class="font-bold  text-2xl text-red-500">{{ parkingLocation.promoAvailable }}</p>
                                </div>
                            </div>
                            <div class="border-t border-gray-200 my-3"></div>
                            <div class="flex flex-row justify-between">
                                <p class="text-gray-700  text-sm py-2"><strong>Website Official</strong></p>
                                <p @click="openWebsite"
                                    class="text-gray-700 hover:text-blue-900 cursor-pointer font-semibold text-sm py-2">
                                    Kunjungi
                                    Link</p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
import ParkingSignIcon from '../../assets/icons/parking-sign.svg';

export default {
    emits: ['close', 'copy-success'],
    data() {
        return {
            parkingSignIcon: ParkingSignIcon,
        }
    },
    name: 'ParkingDetailsModal',
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        parkingLocation: {
            type: Object,
            default: () => ({
                name: 'Lokasi Parkir',
                lastLogin: null,
                imageUrl: 'https://via.placeholder.com/400x200?text=No+Image',
                address: null,
                spots: 0,
                capacity: 'N/A',
                lastUpdated: null,
                latitude: null,
                longitude: null,
                phone: null,
                categories: null,
                promoAvailable: null,
                websiteUrl: null,
            })
        },
        userCurrentLocation: {
            type: Object,
            default: () => null
        }
    },
    computed: {
        lastUpdatedText() {
            if (this.parkingLocation.lastUpdated) {
                const now = new Date();
                const updatedTime = new Date(this.parkingLocation.lastUpdated);
                const diffMinutes = Math.floor((now - updatedTime) / (1000 * 60));
                if (diffMinutes < 1) return 'Baru saja';
                return `${diffMinutes} menit lalu`;
            }
            return 'Tidak diketahui';
        },
        formattedLastLogin() {
            const dateString = this.parkingLocation.lastLogin;
            if (!dateString) return 'Tidak diketahui';

            try {
                const date = new Date(dateString);
                return new Intl.DateTimeFormat('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }).format(date);

            } catch (e) {
                console.error("Gagal memformat tanggal:", e);
                return 'Format tanggal salah';
            }
        }
    },
    methods: {
        openWebsite() {
            const url = this.parkingLocation.websiteUrl;
            const name = this.parkingLocation.name;

            if (url) {
                // Pastikan URL memiliki protokol (http/https)
                const finalUrl = url.startsWith('http') ? url : `http://${url}`;
                window.open(finalUrl, '_blank');
            } else {
                alert(`Website ${name || 'Merchant'} tidak tersedia.`);
            }
        },
        async copyPhoneNumber() {
            const phoneNumber = this.parkingLocation.phone;

            if (phoneNumber) {
                try {
                    await navigator.clipboard.writeText(phoneNumber);
                    this.$emit('copy-success', `Nomor ${phoneNumber} berhasil disalin!`);
                    console.log(`Nomor disalin: ${phoneNumber}`);

                } catch (err) {
                    console.error('Gagal menyalin:', err);
                    this.$emit('copy-success', `Gagal menyalin nomor telepon. Coba lagi.`, 'error');
                }
            }
        },
        closeModal() {
            this.$emit('close');
        },
        viewDetails() {
            console.log('Lihat Detail untuk:', this.parkingLocation.name);
            this.closeModal();
        },
        openGoogleMaps() {
            const lat = this.parkingLocation.latitude;
            const lng = this.parkingLocation.longitude;
            const name = this.parkingLocation.name;

            if (lat && lng) {
                // Format URL standar Google Maps untuk navigasi atau pencarian
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

                // Atau, untuk menunjukkan lokasi spesifik:
                // const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

                window.open(mapsUrl, '_blank');
            } else {
                alert(`Lokasi ${name || 'Merchant'} tidak memiliki koordinat (Latitude/Longitude) yang valid.`);
            }
        },
        calculateDistance(lat1, lon1, lat2, lon2) {
            if (lat1 === null || lon1 === null || lat2 === null || lon2 === null || lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
                return 'N/A';
            }
            const R = 6371; // Radius of Earth in kilometers
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in km
            return distance.toFixed(1) + 'Km';
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
    }
};
</script>

<style scoped>
.modal-fade-opacity-enter-active,
.modal-fade-opacity-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-opacity-enter-from,
.modal-fade-opacity-leave-to {
    opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-slide-enter-from {
    opacity: 0;
    transform: translateY(100%);
}

.modal-slide-leave-to {
    opacity: 0;
    transform: translateY(100%);
}

.modal-slide-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.relative.bg-white.rounded-3xl.max-w-md.overflow-hidden.shadow-xl.border-none.mx-6 {
    width: calc(100% - 3rem);
}
</style>