import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import ParkingMapsScreen from "../views/ParkingMapsScreen.vue";
import SplashScreen from "../views/SplashScreen.vue";
import TransactionHistoryScreen from "../views/TransactionHistoryScreen.vue";
import PaymentMethodScreen from "../views/PaymentMethodScreen.vue";
import SettingScreen from "../views/SettingScreen.vue";
import AccountScreen from "../views/AccountScreen.vue";
import AddVehicleScreen from "../views/AddVehicleScreen.vue";
import CategoryScreen from '../views/CategoryScreen.vue';
import DetailPromoScreen from '../views/PromoDetailScreen.vue';
import HomePageMerchantScreen from '../views/HomePageMerchantScreen.vue';
import MainLayout from '../views/MainLayoutMerchant.vue';
import PromoPage from '../views/PromoPage.vue';
import HistoryPage from '../views/HistoryPromo.vue';
// Pembukaan Rekening NTB
// import PembukaanRekeningNTB from "../views/PembukaanRekeningNTB/pembukaan-rekening.vue";
// import verifikasiEmailPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/verifikasi-email.vue";
// import UploadFilePembukaanRekeningNTB from "../views/PembukaanRekeningNTB/upload-dokumen.vue";
// import NpwpNTB from "../views/PembukaanRekeningNTB/npwp-s&k.vue";
// import PreviewScreenPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/preview-dokumen.vue";
// import DataPribadiPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-pribadi.vue";
// import DataKTPPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-ktp.vue";
// import DataPekerjaanPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/data-pekerjaan.vue";
// import KonfirmasiDataPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/konfirmasi-data.vue";
// import PanduanKameraPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/panduan-kamera.vue";
// import TandaTanganDigitalPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/tanda-tangan-digital.vue";
// import HalamanSuksesPembukaanRekeningNTB from "../views/PembukaanRekeningNTB/halaman-sukses.vue";


const routes = [
  {
    path: "/homepage",
    component: HomePage,
  },
  {
    path: "/parkingMapsScreen",
    component: ParkingMapsScreen,
  },
  {
    path: "/",
    component: SplashScreen,
  },
  {
    path: "/transactionHistoryScreen",
    component: TransactionHistoryScreen,
  },
  {
    path: "/paymentMethodScreen",
    component: PaymentMethodScreen,
  },
  {
    path: "/settingScreen",
    component: SettingScreen,
  },
  {
    path: "/accountScreen",
    component: AccountScreen,
  },
  {
    path: "/addVehicleScreen",
    component: AddVehicleScreen,
  },
  {
    path: '/category/:categoryName',
    name: 'Category',
    component: CategoryScreen,
    props: true, // Mengirim params sebagai props ke komponen
  },
  {
    path: '/promo/:categoryName/:promoId',
    name: 'DetailPromoScreen',
    component: DetailPromoScreen,
    props: true, // This allows the route params to be passed as props
  },

  {
    path: '/merchant',
    component: MainLayout,
    redirect: '/homepageMerchant',
    children: [
      {
        path: '/homepageMerchant',
        name: 'HomePageMerchantScreen',
        component: HomePageMerchantScreen,
      },
      {
        path: '/promoPage',
        name: 'PromoPage',
        component: PromoPage,
      },
      {
        path: '/historyPage',
        name: 'HistoryPage',
        component: HistoryPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    // Menghilangkan kondisi savedPosition
    return { x: 0, y: 0 };
  },
});



export default router;