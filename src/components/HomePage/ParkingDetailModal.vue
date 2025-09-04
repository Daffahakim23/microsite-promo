<template>
    <transition name="modal-fade-opacity">
        <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            @click.self="closeModal">

            <transition name="modal-slide">
                <div v-if="isVisible"
                    class="relative bg-white rounded-3xl max-w-md overflow-hidden shadow-xl border-none mx-12">
                    <button @click="closeModal"
                        class="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 z-10 w-10 h-10 flex items-center justify-center">
                        <i class="fas fa-times text-lg"></i>
                    </button>

                    <img :src="parkingLocation.imageUrl" :alt="parkingLocation.name"
                        class="text-xl md:text-2xl w-full h-48 object-cover ">

                    <div class="p-5">
                        <h2 class="text-xl md:text-2xl font-bold  text-gray-900 mb-4">{{ parkingLocation.name }}</h2>

                        <div class="border-2 w-fit px-2 py-1 rounded-full items-center mb-4 flex flex-row">
                            <i class="fas fa-map-marker-alt mr-2 text-gray-600"></i>
                            <span class="text-gray-700 font-regular text-xs ">
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
                        <div class="text-gray-600  font-medium text-sm md:text-md mb-4">
                            <span>{{ parkingLocation.address || 'Alamat tidak tersedia' }}</span>
                        </div>

                        <div class="bg-[#FFF6F5] p-4 rounded-lg mb-4 gap-2">
                            <div class="flex flex-row justify-between items-center">
                                <div class="flex flex-col py-2">
                                    <p class="text-sm font-bold  text-gray-700">Parkir tersedia</p>
                                    <p class="text-xs text-gray-500 ">Update terakhir: {{ lastUpdatedText }}</p>
                                </div>
                                <div class="flex flex-row items-center gap-1">
                                    <img :src="parkingSignIcon" alt="Parking Sign Icon" class="h- w-8">
                                    <p class="font-bold  text-2xl text-red-500">{{ parkingLocation.spots }}</p>
                                </div>
                            </div>
                            <div class="border-t border-gray-200 my-3"></div>
                            <div class="flex flex-row justify-between">
                                <p class="text-gray-700  text-sm py-2"><strong>Kapasitas Parkir</strong></p>
                                <p class="text-gray-700  text-sm py-2">{{
                                    parkingLocation.capacity
                                    || 'N/A' }}</p>
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
                imageUrl: 'https://via.placeholder.com/400x200?text=No+Image',
                address: 'Alamat tidak diketahui',
                spots: 0,
                capacity: 'N/A',
                lastUpdated: null,
                latitude: null,
                longitude: null,
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
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        viewDetails() {
            console.log('Lihat Detail untuk:', this.parkingLocation.name);
            this.closeModal();
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
/* Transisi untuk overlay (background hitam) */
.modal-fade-opacity-enter-active,
.modal-fade-opacity-leave-active {
    transition: opacity 0.3s ease;
    /* Hanya transisi opacity */
}

.modal-fade-opacity-enter-from,
/* Vue 3 */
.modal-fade-opacity-leave-to {
    /* Vue 3 & 2 */
    opacity: 0;
}

/* Transisi untuk konten modal (kotak putih) */
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
    /* Untuk Vue 3. Untuk Vue 2, Anda mungkin tidak butuh ini jika sudah di default */
    opacity: 1;
    transform: translateY(0);
    /* Modal berakhir di posisi aslinya */
}

/* Pastikan lebar konten modal agar transform berfungsi dengan baik dalam flexbox */
.relative.bg-white.rounded-3xl.max-w-md.overflow-hidden.shadow-xl.border-none.mx-6 {
    width: calc(100% - 3rem);
    /* Contoh: 100% minus margin 1.5rem di kiri dan kanan */
}

/* Pastikan elemen parent tidak memiliki transform yang berkonflik */
.fixed.inset-0.flex.items-center.justify-center {
    /* Transform harus dihapus jika sebelumnya ada dan berkonflik */
    transform: none;
}
</style>