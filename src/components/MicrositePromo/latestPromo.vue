<template>
    <div class=" max-w-lg mx-auto space-y-4">
        <div class="flex items-center justify-between mb-4 self-start">
            <h2 class="text-md font-semibold">{{ titleDisplay }}</h2>
            <div class="relative">
                <button @click="toggleSortDropdown"
                    class="text-xs font-medium text-gray-500 hover:text-gray-700 focus:outline-none">
                    Sort By: {{ sortOptionDisplay }}
                    <i class="fas fa-chevron-down ml-1 text-gray-400"></i>
                </button>
                <div v-if="showSortDropdown" class="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                    <button @click="selectSortOption('newest')"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Newest
                    </button>
                    <button @click="selectSortOption('nearest')"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Nearest
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loading" class="text-center text-gray-500 ">
            <p class="mt-16">Loading {{ titleDisplay }}...</p>
        </div>

        <div v-else-if="promos.length === 0" class="text-center text-gray-500">
            <p class="mt-16">No {{ titleDisplay }} found.</p>
        </div>

        <div v-else class="space-y-2">
            <div v-for="promo in promos" :key="promo.promoId" class="cursor-pointer" @click="viewPromoDetail(promo)">
                <div class="flex items-center justify-between space-x-4 pr-2">
                    <div class="flex items-center space-x-2">
                        <img :src="promo.imageURL" :alt="promo.title" class="h-20 w-28 object-cover">
                        <div class="py-1">
                            <p class="text-md font-semibold">{{ promo.title }}</p>
                            <div class="flex gap-1">
                                <p class="text-gray-500 text-xs mt-1 mb-3">
                                    Berlaku s.d
                                </p>
                                <p class="text-gray-700 text-xs mt-1 mb-3">
                                    {{ formatValidUntil(promo.validUntil) }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFirestore, collectionGroup, getDocs, Timestamp, query, orderBy, limit, where } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

export default {
    name: 'LatestPromos',
    setup() {
        const promos = ref([]);
        const loading = ref(true);
        const router = useRouter();
        const showSortDropdown = ref(false);
        const currentSortOption = ref('newest');
        const userLocation = ref(null);

        const formatValidUntil = (validUntilData) => {
            if (!validUntilData) {
                return 'Tanggal tidak tersedia';
            }

            let date;
            // Periksa apakah ini objek Timestamp dari Firestore
            if (typeof validUntilData.toDate === 'function') {
                date = validUntilData.toDate();
            }
            // Jika bukan Timestamp, coba proses sebagai string atau tipe data lain
            else {
                date = new Date(validUntilData);
            }

            // Periksa apakah objek Date valid sebelum memformat
            if (isNaN(date.getTime())) {
                return 'Tanggal tidak valid'; // Menambahkan pesan kesalahan yang lebih spesifik
            }

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        };

        const titleDisplay = computed(() => {
            return currentSortOption.value === 'newest' ? 'Newest Promo' : 'Nearest Promo';
        });

        const sortOptionDisplay = computed(() => {
            return currentSortOption.value === 'newest' ? 'Newest' : 'Nearest';
        });

        const toggleSortDropdown = () => {
            showSortDropdown.value = !showSortDropdown.value;
        };

        const selectSortOption = async (option) => {
            currentSortOption.value = option;
            showSortDropdown.value = false;
            await fetchLatestPromos();
        };

        const getUserLocation = () => {
            return new Promise((resolve, reject) => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve({
                                lat: position.coords.latitude,
                                long: position.coords.longitude
                            });
                        },
                        (error) => {
                            console.error("Error getting user location:", error);
                            reject(error);
                        }
                    );
                } else {
                    reject(new Error("Geolocation is not supported by this browser."));
                }
            });
        };

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const fetchLatestPromos = async () => {
            loading.value = true;
            try {
                const db = getFirestore(firebaseApp);
                const promosRef = collectionGroup(db, 'promos');
                let q;

                const now = Timestamp.now();
                console.log("Timestamp saat ini:", now);

                if (currentSortOption.value === 'newest') {
                    q = query(promosRef,
                        where('validUntil', '>=', now),
                        orderBy('registeredDate', 'desc'),
                        limit(10)
                    );
                } else if (currentSortOption.value === 'nearest') {
                    if (!userLocation.value) {
                        userLocation.value = await getUserLocation();
                    }
                    const userLat = userLocation.value.lat;
                    const userLong = userLocation.value.long;
                    const latOffset = 0.5;
                    const longOffset = 0.5;

                    q = query(promosRef,
                        where('validUntil', '>=', now),
                        where('latitude', '>=', userLat - latOffset),
                        where('latitude', '<=', userLat + latOffset),
                        where('longitude', '>=', userLong - longOffset),
                        where('longitude', '<=', userLong + longOffset)
                    );
                }

                const querySnapshot = await getDocs(q);
                let fetchedPromos = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const category = doc.ref.parent.parent.id;

                    const formattedValidUntil = data.validUntil ? formatDate(data.validUntil.toDate()) : null;

                    return {
                        promoId: doc.id,
                        ...data,
                        category: category,
                        validUntil: formattedValidUntil, // Menggunakan format baru
                    };
                });

                if (currentSortOption.value === 'nearest' && userLocation.value) {
                    fetchedPromos = fetchedPromos.map(promo => {
                        const distance = calculateDistance(userLocation.value.lat, userLocation.value.long, promo.latitude, promo.longitude);
                        return { ...promo, distance };
                    });
                    fetchedPromos.sort((a, b) => a.distance - b.distance);
                }

                promos.value = fetchedPromos;
            } catch (e) {
                console.error("Error fetching promos: ", e);
                if (currentSortOption.value === 'nearest') {
                    promos.value = [];
                }
            } finally {
                loading.value = false;
            }
        };

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Radius of the Earth in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance;
        };

        const viewPromoDetail = (promo) => {
            router.push({
                name: 'DetailPromoScreen',
                params: {
                    categoryName: promo.category,
                    promoId: promo.promoId
                }
            });
        };


        onMounted(() => {
            fetchLatestPromos();
        });

        return {
            promos,
            loading,
            viewPromoDetail,
            formatDate,
            showSortDropdown,
            toggleSortDropdown,
            selectSortOption,
            sortOptionDisplay,
            titleDisplay,
            formatValidUntil
        };
    },
};
</script>

<style scoped>
/* Your existing CSS styles */
</style>