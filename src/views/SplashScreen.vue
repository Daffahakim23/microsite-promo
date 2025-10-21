<template class="h-full">
    <div class="bg-neutral-50 min-h-screen w-full flex flex-col">
        <div class="min-h-screen w-full flex flex-col items-center justify-center">
            <div class="flex flex-col items-center justify-center">
                <h1 class="text-3xl md:text-5xl font-semibold text-black">
                    Microsite Promo
                </h1>
                <img src="../assets/icons/loading.gif" alt="Loading" class="mt-4 h-12 w-12" />
            </div>
        </div>
        <div class="absolute bottom-[5%] w-full flex items-center justify-center">
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { jwtVerify } from 'jose';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
import { useFileStore } from '@/stores/filestore'; // Import your Pinia store

export default {
    name: 'FeatureInfoScreen',
    setup() {
        const router = useRouter();
        const fileStore = useFileStore();

        // restoreSession hanya memastikan Pinia terisi. Ini OK.
        const restoreSession = () => {
            if (!fileStore.uuid) {
                const storedUuid = localStorage.getItem('merchant_uuid');
                if (storedUuid) {
                    fileStore.setUuid(storedUuid);
                    console.log('Sesi Pinia diisi dari Local Storage.');
                }
            }
        };

        const secretKey = new TextEncoder().encode('bersama-id-secret');

        const navigateToHome = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const storedUuid = localStorage.getItem('merchant_uuid');

            if (token) {
                try {
                    // Verifikasi Token & Simpan Sesi (BLOCK SUKSES)
                    const { payload } = await jwtVerify(token, secretKey, {
                        issuer: 'one-id',
                    });

                    const merchantId = payload.sub;
                    fileStore.setUuid(merchantId);
                    localStorage.setItem('merchant_uuid', merchantId); // Menyimpan sesi baru

                    // ... (Logika Firebase setDoc) ...

                    console.log('Sesi baru berhasil disimpan:', merchantId);
                    router.push('/homepageMerchant');

                } catch (error) {
                    // BLOCK GAGAL VERIFIKASI
                    console.error('Verifikasi Token GAGAL:', error);

                    if (storedUuid) {
                        // Token baru gagal, pulihkan sesi lama jika ada
                        fileStore.setUuid(storedUuid);
                        console.log('Token gagal, memulihkan sesi Merchant lama.');
                        router.push('/homepageMerchant'); // Rute Merchant yang benar
                    } else {
                        // Gagal total, tidak ada sesi
                        console.error('Tidak ada sesi yang dipulihkan.');
                        // Arahkan ke halaman homepage atau halaman yang tidak memerlukan otentikasi
                        router.push('/homepage');
                    }
                }
            } else {
                // BLOCK TIDAK ADA TOKEN DI URL (Kasus Refresh/Kunjungan Langsung)
                if (storedUuid) {
                    // Sesi Merchant ada di Local Storage, pulihkan dan lanjutkan
                    fileStore.setUuid(storedUuid);
                    console.log('Tidak ada token, memulihkan sesi Merchant.');
                    router.push('/homepageMerchant'); // Rute Merchant yang benar
                } else {
                    console.log('Tidak ada token dan tidak ada sesi Merchant tersimpan.');
                    router.push('/homepage'); // Arahkan ke halaman homepage
                }
            }
        };

        onMounted(() => {
            restoreSession();
            navigateToHome();
        });

        return {
            navigateToHome,
        };
    },
};
</script>

<style scoped></style>