<template>
    <div class="main-container">
        <div class="fixed-header">
            <i class="fas fa-arrow-left text-lg md:text-xl text-neutral-900" @click="goBack"></i>
            <p class="header-title">{{ formattedCategoryName }}</p>
        </div>

        <div class="scrollable-content">
            <div v-if="loading" class="text-center text-gray-500">
                <p>Memuat promo untuk kategori {{ categoryName }}...</p>
            </div>

            <div v-else-if="promos.length === 0" class="text-center text-gray-500">
                <p>Tidak ada promo yang ditemukan untuk kategori ini.</p>
            </div>

            <div v-else class="main-container">
                <!-- <h2 class="text-2xl font-bold mb-4 capitalize">Promo Kategori {{ categoryName.replace(/-/g, ' ') }}</h2> -->
                <div class="grid grid-cols-2 gap-4 scrollable-content">
                    <div v-for="promo in promos" :key="promo.id" class="cursor-pointer"
                        @click="viewPromoDetail(promo.id)">
                        <img :src="promo.imageURL" :alt="promo.title" class="w-full h-28 object-cover mb-2" />
                        <p class="font-bold text-primary-900 text-sm">{{ promo.title }}</p>
                        <!-- <p class="text-neutral-900 font-semibold text-xl">{{ promo.subtitle }}</p> -->
                        <!-- <p class="text-gray-500 text-xs mt-2">{{ promo.address }}</p> -->
                        <p class="text-gray-500 text-xs mt-1 mb-3">Berlaku s.d {{ promo.validUntil }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-8"></div>
    </div>
</template>

<!-- <script>
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'CategoryPromoScreen',
    setup() {
        const route = useRoute();
        const categoryName = ref(route.params.categoryName);
        const promos = ref([]);
        const loading = ref(true);

        const fetchPromosByCategory = async () => {
            loading.value = true;
            try {
                const promosRef = collection(db, 'categories', categoryName.value, 'promos');
                const querySnapshot = await getDocs(promosRef);

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

        const formattedCategoryName = computed(() => {
            const name = categoryName.value.replace(/-/g, ' ');
            return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        });

        onMounted(fetchPromosByCategory);

        return {
            categoryName,
            promos,
            loading,
            goBack,
            formattedCategoryName,
        };
    }
};
</script> -->
<script>
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'CategoryPromoScreen',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const categoryName = ref(route.params.categoryName);
        const promos = ref([]);
        const loading = ref(true);

        const fetchPromosByCategory = async () => {
            loading.value = true;
            try {
                const promosRef = collection(db, 'categories', categoryName.value, 'promos');
                const querySnapshot = await getDocs(promosRef);

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
                name: 'DetailPromoScreen', // Ganti dengan nama rute untuk screen detail promo
                params: { promoId: promoId }
            });
        };

        const formattedCategoryName = computed(() => {
            const name = categoryName.value.replace(/-/g, ' ');
            return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        });

        onMounted(fetchPromosByCategory);

        return {
            categoryName,
            promos,
            loading,
            goBack,
            formattedCategoryName,
            viewPromoDetail,
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
