<template>
    <div class="main-container bg-neutral-50 min-h-screen">
        <i class="absolute left-4 top-4 fas fa-arrow-left text-lg md:text-xl text-neutral-900 py-2 px-3.5 bg-white/20 backdrop-blur-sm rounded-full"
            @click="goBack"></i>

        <div class="scrollable-content">
            <div v-if="loading" class="text-center text-gray-500 mt-8">
                <p>Memuat detail promo...</p>
            </div>

            <div v-else-if="!promo" class="text-center text-gray-500 mt-8">
                <p>Promo tidak ditemukan.</p>
            </div>

            <div v-else class="promo-detail-card">
                <img :src="promo.imageURL" :alt="promo.title" class="promo-image" />

                <div class="py-2 px-4 space-y-4">
                    <p class="text-2xl font-semibold">{{ promo.title }}</p>
                    <p class="text-sm text-neutral-800">{{ promo.subtitle }}</p>
                    <div class="py-3 px-4 bg-primary-100 my-2 flex justify-between rounded-xl">
                        <p class="promo-validity text-sm text-primary-900 font-bold flex items-center">
                            <i class="fas fa-clock mr-2"></i> Berlaku Sampai
                        </p>
                        <p class="promo-validity text-sm text-primary-900 font-medium">
                            {{ formattedValidUntil }}
                        </p>
                    </div>
                    <p class="text-neutral-700 text-sm">{{ promo.details }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'PromoDetailScreen',
    setup() {
        const route = useRoute();
        const promo = ref(null);
        const loading = ref(true);

        const goBack = () => {
            window.history.back();
        };

        const fetchPromoDetail = async () => {
            loading.value = true;
            try {
                const categoryName = route.params.categoryName;
                const promoId = route.params.promoId;

                if (!categoryName || !promoId) {
                    throw new Error("Category Name or Promo ID is missing in route params.");
                }

                const docRef = doc(db, 'categories', categoryName, 'promos', promoId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    promo.value = { id: docSnap.id, ...docSnap.data() };
                } else {
                    console.log("No such document!");
                    promo.value = null;
                }

            } catch (err) {
                console.error("Failed to fetch promo detail:", err);
                promo.value = null;
            } finally {
                loading.value = false;
            }
        };

        const formattedCategoryName = computed(() => {
            if (promo.value && promo.value.category) {
                const name = promo.value.category.replace(/-/g, ' ');
                return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            }
            return '';
        });

        // Computed property baru untuk memformat tanggal
        const formattedValidUntil = computed(() => {
            if (promo.value && promo.value.validUntil) {
                const date = new Date(promo.value.validUntil);
                // Opsi untuk menampilkan nama bulan dalam Bahasa Indonesia
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                // Menggunakan toLocaleDateString() untuk format yang sesuai
                return date.toLocaleDateString('id-ID', options);
            }
            return 'Tanggal tidak tersedia';
        });

        onMounted(fetchPromoDetail);

        return {
            promo,
            loading,
            goBack,
            formattedCategoryName,
            formattedValidUntil // Tambahkan computed property baru di sini
        };
    }
};
</script>

<style scoped>
/* (Gaya CSS tetap sama) */
.main-container {
    /* padding-top: 4.5rem; */
    padding-bottom: 2rem;
    /* max-width: 500px; */
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
    max-width: 500px;
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
    flex-grow: 1;
    overflow-y: auto;
    /* padding: 0 1rem; */
}

.promo-detail-card {
    /* border-radius: 12px; */
    overflow: hidden;
    background: #fff;
    /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
    padding-top: rem;
}

.promo-image {
    width: 100%;
    height: auto;
    object-fit: cover;
}

/* .promo-info {
    padding: 1rem;
} */

.promo-category {
    color: #37537D;
    font-weight: 600;
}

.promo-link-button {
    display: block;
    width: 100%;
    padding: 1rem;
    margin-top: 1.5rem;
    background-color: #37537D;
    color: #fff;
    font-weight: bold;
    text-align: center;
    border-radius: 9999px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.promo-link-button:hover {
    background-color: #2b405f;
}
</style>