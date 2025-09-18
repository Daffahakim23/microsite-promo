<template>
    <div class="main-container">
        <div class="fixed-header">
            <i class="fas fa-arrow-left text-lg md:text-xl text-neutral-900" @click="goBack"></i>
            <p class="header-title">{{ formattedCategoryName }}</p>
        </div>

        <div class="scrollable-content">
            <div v-if="loading" class="text-center text-gray-500">
                <p>Memuat promo untuk kategori {{ formattedCategoryName }}...</p>
            </div>

            <div v-else-if="promos.length === 0" class="text-center text-gray-500">
                <p>Tidak ada promo yang ditemukan untuk kategori ini.</p>
            </div>

            <div v-else class="main-container">
                <div class="grid grid-cols-2 gap-4 scrollable-content">
                    <div v-for="promo in promos" :key="promo.id" class="cursor-pointer"
                        @click="viewPromoDetail(promo.id)">
                        <img :src="promo.imageURL" :alt="promo.title" class="w-full h-28 object-cover mb-2" />
                        <p class="font-bold text-primary-900 text-sm">{{ promo.title }}</p>
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
            </div>
        </div>
        <div class="h-8"></div>
    </div>
</template>

<script>
import { db } from '../firebase';
import { collection, getDocs, where, query, Timestamp } from 'firebase/firestore';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'CategoryPromoScreen',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const categoryName = ref(route.params.categoryName);
        const promos = ref([]);
        const loading = ref(true);

        const formatValidUntil = (timestamp) => {
            if (!timestamp || typeof timestamp.toDate !== 'function') {
                return 'Tanggal tidak tersedia';
            }
            const date = timestamp.toDate();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        };

        const fetchPromosByCategory = async () => {
            loading.value = true;
            try {
                const now = Timestamp.now();
                const promosRef = collection(db, 'categories', categoryName.value, 'promos');

                // Tambahkan filter untuk promo yang belum expired
                const q = query(promosRef, where('validUntil', '>=', now));

                const querySnapshot = await getDocs(q);

                promos.value = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

            } catch (err) {
                console.error("Gagal mengambil data promo:", err);
            } finally {
                loading.value = false;
            }
        };

        const goBack = () => {
            window.history.back();
        };

        const viewPromoDetail = (promoId) => {
            router.push({
                name: 'DetailPromoScreen',
                params: { categoryName: categoryName.value, promoId: promoId }
            });
        };

        const formattedCategoryName = computed(() => {
            const name = categoryName.value.replace(/-/g, ' ');
            return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        });

        onMounted(fetchPromosByCategory);

        // Tambahkan watch untuk memuat ulang data jika categoryName di URL berubah
        watch(() => route.params.categoryName, (newCategory) => {
            if (newCategory) {
                categoryName.value = newCategory;
                fetchPromosByCategory();
            }
        });

        return {
            categoryName,
            promos,
            loading,
            goBack,
            formattedCategoryName,
            viewPromoDetail,
            formatValidUntil
        };
    }
};
</script>
<style scoped>
.main-container {
    width: 100%;
    max-width: 500px;
    /* Optional: Adjust for mobile-first design */
    margin: 0 auto;
    min-height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

.fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 20;
}

.header-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.125rem;
    font-weight: bold;
    color: #171717;
}

.scrollable-content {
    margin-top: 3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    overflow-y: auto;
}
</style>
