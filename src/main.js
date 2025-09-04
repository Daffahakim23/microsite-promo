// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import "./assets/tailwind.css";
// import VueApexCharts from "vue3-apexcharts";
// import { createPinia } from 'pinia';
// import 'flowbite';
// /* src/assets/main.css */
// import "flag-icons/css/flag-icons.css";


// const app = createApp(App);
// const pinia = createPinia();

// app.use(pinia);

// app.use(router);

// app.use(VueApexCharts);

// app.mount("#app");
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


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(VueFire, {
    firebaseApp,
    // Opsi lain seperti modules atau plugins
});

const navigationEntry = performance.getEntriesByType("navigation")[0];

// Periksa apakah jenis navigasi adalah "reload"
if (navigationEntry && navigationEntry.type === "reload") {
    console.log('Aplikasi terdeteksi dimuat ulang (refresh). Mengarahkan ke halaman utama (/).');
    // Ini adalah reload, arahkan ke halaman utama (/) setelah router siap
    router.isReady().then(() => {
        router.push({ path: "/" }).catch(err => {
            // Tangani error jika push gagal, misalnya navigasi ke rute yang sama
            if (err.name !== 'NavigationDuplicated') {
                console.error('Gagal mengarahkan router setelah reload:', err);
            }
        });
    }).catch(err => {
        console.error('Gagal menunggu router siap setelah reload:', err)
    });
} else {
    console.log('Aplikasi dimuat pertama kali atau navigasi normal. Memuat rute yang diminta.');
    // Ini adalah kunjungan pertama atau navigasi normal, biarkan router memuat rute yang diminta.
}

// Tidak perlu lagi event listener 'beforeunload' untuk sessionStorage
// karena kita tidak lagi menggunakan sessionStorage untuk logika reload ini.

// --- Logika Deteksi Reload yang Akurat Berakhir ---

app.use(router); // Router harus dipasang.

app.use(VueApexCharts);

app.mount("#app");

