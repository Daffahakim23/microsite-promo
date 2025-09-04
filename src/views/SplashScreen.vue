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
import { useFileStore } from '@/stores/fileStore'; // Import your Pinia store

export default {
    name: 'FeatureInfoScreen',
    setup() {
        const router = useRouter();
        const fileStore = useFileStore();

        const secretKey = new TextEncoder().encode('bersama-id-secret');

        const navigateToHome = async () => {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            if (token) {
                try {
                    const { payload } = await jwtVerify(token, secretKey, {
                        issuer: 'one-id',
                    });

                    const merchantId = payload.sub;
                    fileStore.setUuid(merchantId);

                    const merchantData = {
                        ...payload,
                        lastLogin: new Date().toISOString()
                    };

                    const db = getFirestore(firebaseApp);
                    const merchantRef = doc(db, 'merchants', merchantId);
                    await setDoc(merchantRef, merchantData, { merge: true });

                    console.log('Payload JWT berhasil disimpan untuk merchantId:', merchantId);

                    router.push('/homepageMerchant');

                } catch (error) {
                    console.error('Validasi token gagal:', error);
                    router.push('/homepage');
                }
            } else {
                router.push('/homepage');
            }
        };

        onMounted(() => {
            navigateToHome();
        });

        return {
            navigateToHome,
        };
    },
};
</script>

<style scoped></style>