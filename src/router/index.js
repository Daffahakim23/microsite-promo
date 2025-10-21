import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SplashScreen from "../views/SplashScreen.vue";
import CategoryScreen from '../views/CategoryScreen.vue';
import DetailPromoScreen from '../views/PromoDetailScreen.vue';
import HomePageMerchantScreen from '../views/HomePageMerchantScreen.vue';
import MainLayout from '../views/MainLayoutMerchant.vue';
import PromoPage from '../views/PromoPage.vue';
import HistoryPage from '../views/HistoryPromo.vue';


const routes = [
  {
    path: "/homepage",
    component: HomePage,
  },
  {
    path: "/",
    component: SplashScreen,
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