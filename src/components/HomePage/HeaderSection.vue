<template>
    <!-- Mengikat background-image menggunakan inline style binding -->
    <div class="relative h-48 header-bg  overflow-hidden" :style="{ backgroundImage: 'url(' + headerBgImage + ')' }">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        <!-- Top Bar -->
        <div class="absolute top-2 left-0 right-0 p-8 flex items-center justify-between text-white z-10">
            <button @click="navigateBack" class="p-2 -m-2">
                <i class="fas fa-arrow-left text-xl"></i>
            </button>
            <span class="text-md  font-semibold">{{ title }}</span>
            <i class="fas fa-ellipsis-v text-xl"></i>
        </div>

        <!-- Text Content -->
        <div class="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 p-4 text-white z-10">
            <h1 class="text-3xl font-bold">{{ mainText }}</h1>
            <p class="text-lg font-regular">{{ subText }}</p>
        </div>
    </div>
</template>

<script>
// Penting: Impor gambar SVG secara langsung di sini
// Import useRouter from Vue Router
import { useRouter } from 'vue-router';
import HeaderSvg from '../../assets/Header.svg';

export default {
    name: 'HeaderSection',
    props: {
        title: {
            type: String,
            default: 'Smart Parking Solution'
        },
        mainText: {
            type: String,
            default: 'Cari Parkir'
        },
        subText: {
            type: String,
            default: '#antiribet'
        }
    },
    // Use the setup function to get the router instance
    setup() {
        const router = useRouter();

        const navigateBack = () => {
            router.push('/');
        };

        return {
            navigateBack,
        };
    },
    computed: {
        headerBgImage() {
            return HeaderSvg;
        }
    }
};
</script>

<style scoped>
.header-bg {
    /* Hapus properti background-image dari sini, karena akan diatur secara inline */
    height: 271px;
    background-size: cover;
    background-position: center;
}
</style>
