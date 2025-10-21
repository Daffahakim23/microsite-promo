import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Pastikan ini mengimpor router yang sudah Anda definisikan
import "./assets/tailwind.css";
import VueApexCharts from "vue3-apexcharts";
import { createPinia } from 'pinia';
import 'flowbite';
/* src/assets/main.css */
import "flag-icons/css/flag-icons.css";
import { firebaseApp } from './firebase';
import { VueFire } from 'vuefire';
// 1. Import komponen utama Font Awesome Vue
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// // 2. Import core library
// import { library } from '@fortawesome/fontawesome-svg-core';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(VueFire, {
    firebaseApp,
    // Opsi lain seperti modules atau plugins
});

// --- LOGIKA DETEKSI RELOAD INI DIHAPUS ---
/*
const navigationEntry = performance.getEntriesByType("navigation")[0];

if (navigationEntry && navigationEntry.type === "reload") {
    console.log('Aplikasi terdeteksi dimuat ulang (refresh). Mengarahkan ke halaman utama (/).');
    // Blok ini yang menyebabkan pengarahan paksa ke rute "/"
    router.isReady().then(() => {
        router.push({ path: "/" }).catch(err => {
            if (err.name !== 'NavigationDuplicated') {
                console.error('Gagal mengarahkan router setelah reload:', err);
            }
        });
    }).catch(err => {
        console.error('Gagal menunggu router siap setelah reload:', err)
    });
} else {
    console.log('Aplikasi dimuat pertama kali atau navigasi normal. Memuat rute yang diminta.');
}
*/
// --- LOGIKA DETEKSI RELOAD DIHAPUS ---

app.use(router); // Router dipasang, dan akan memuat rute berdasarkan URL saat ini.

// app.component('font-awesome-icon', FontAwesomeIcon);

app.use(VueApexCharts);

app.mount("#app");