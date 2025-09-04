<template>
    <div class=" max-w-lg mx-auto space-y-4">
        <h2 class="text-md font-semibold mb-4 self-start">Newest Promo</h2>
        <div v-if="loading" class="text-center text-gray-500">
            <p>Memuat promo terbaru...</p>
        </div>

        <div v-else-if="promos.length === 0" class="text-center text-gray-500">
            <p>Tidak ada promo terbaru yang ditemukan.</p>
        </div>

        <div v-else class="space-y-2">
            <div v-for="promo in promos" :key="promo.promoId" class="cursor-pointer" @click="viewPromoDetail(promo)">
                <div class="flex items-center justify-between space-x-4 pr-2">
                    <div class="flex items-center space-x-2">
                        <img :src="promo.imageURL" :alt="promo.title" class="h-20 w-28 object-cover">
                        <div class="py-1">
                            <p class="text-md font-semibold">{{ promo.title }}</p>
                            <p class="text-xs text-gray-500 mt-1">Berlaku s.d {{ promo.validUntil }}</p>
                        </div>
                    </div>

                    <i class="fas fa-chevron-right text-gray-400"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFirestore, collectionGroup, getDocs, Timestamp, query, orderBy, limit } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';

export default {
    name: 'LatestPromos',
    // Gunakan setup() untuk Composition API karena Anda menggunakannya
    setup() {
        const promos = ref([]);
        const loading = ref(true);
        const router = useRouter(); // Inisialisasi router di setup()

        const fetchLatestPromos = async () => {
            loading.value = true;
            try {
                const db = getFirestore(firebaseApp);
                const promosRef = collectionGroup(db, 'promos');
                const q = query(promosRef, orderBy('registeredDate', 'desc'), limit(5));
                const querySnapshot = await getDocs(q);

                promos.value = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const category = doc.ref.parent.parent.id; // Mengambil ID kategori dari path
                    return {
                        promoId: doc.id,
                        ...data,
                        category: category,
                    };
                });
            } catch (e) {
                console.error("Error saat mengambil promo terbaru: ", e);
            } finally {
                loading.value = false;
            }
        };

        const viewPromoDetail = (promo) => {
            // Mengirim kedua parameter yang dibutuhkan ke rute
            router.push({
                name: 'DetailPromoScreen', // Pastikan ini adalah nama rute yang benar
                params: {
                    categoryName: promo.category,
                    promoId: promo.promoId
                }
            });
        };

        const formatDate = (timestamp) => {
            if (timestamp instanceof Timestamp) {
                const date = timestamp.toDate();
                return date.toLocaleString();
            }
            return 'N/A';
        };

        onMounted(() => {
            fetchLatestPromos();
        });

        return {
            promos,
            loading,
            viewPromoDetail,
            formatDate
        };
    },
};
</script>

<style scoped>
/* Gaya CSS untuk tampilan riwayat promo */
</style>