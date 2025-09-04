<template>
    <div class="mb-4">
        <div v-if="loading" class="text-center text-gray-500">Memuat promo...</div>
        <div v-else-if="promos.length === 0" class="text-center text-gray-500">
            Data kategori tidak ditemukan.
        </div>
        <div v-else class="space-y-8">
            <h2 class="text-2xl font-bold mb-4 capitalize">{{ categoryName.replace(/-/g, ' ') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="promo in promos" :key="promo.id" class="bg-white p-4 rounded-lg shadow-md">
                    <h3 class="font-semibold text-lg">{{ promo.title }}</h3>
                    <p class="text-gray-600 text-sm">{{ promo.subtitle }}</p>
                    <p class="text-gray-500 text-xs mt-2">{{ promo.details }}</p>
                    <div class="flex items-center text-xs mt-4">
                        <span class="text-gray-500">Berlaku s.d. {{ promo.validUntil }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { firebaseApp } from '../../firebase.js';
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";
import { ref, watch } from 'vue';

export default {
    name: 'PromoListFromFirestore',
    props: {
        categoryName: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const db = getFirestore(firebaseApp);
        const promos = ref([]);
        const loading = ref(true);
        const error = ref(null);

        const fetchPromosByCategory = async (category) => {
            loading.value = true;
            promos.value = []; // Clear previous data
            try {
                const categoryDocRef = doc(db, 'categories', category);
                const promosCollectionRef = collection(categoryDocRef, 'promos');
                const querySnapshot = await getDocs(promosCollectionRef);

                promos.value = querySnapshot.docs.map(promoDoc => {
                    return {
                        id: promoDoc.id,
                        ...promoDoc.data()
                    };
                });

            } catch (err) {
                console.error("Gagal mengambil data dari Firestore:", err);
                error.value = 'Gagal memuat data. Silakan coba lagi.';
            } finally {
                loading.value = false;
            }
        };

        // Watch for changes in the categoryName prop and re-fetch data
        watch(() => props.categoryName, (newCategory) => {
            if (newCategory) {
                fetchPromosByCategory(newCategory);
            }
        }, { immediate: true }); // Fetch data immediately on component mount

        return {
            promos,
            loading,
            error
        };
    }
};
</script>

<style scoped>
/* Anda bisa tambahkan style kustom di sini jika diperlukan */
</style>