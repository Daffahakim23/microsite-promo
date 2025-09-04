<template>
  <div class="p-4 pb-12 max-w-lg mx-auto rounded-xl shadow-md space-y-4">
    <div class="mt-4 flex items-center w-full">
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input type="text" placeholder="Cari promo..."
          class="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-transparent text-sm" />
      </div>
      <div class="w-4 px-2">
        <i @click="goBack" class="fas fa-ellipsis-v w-3 text-xl"></i>
      </div>
    </div>

    <HeaderNav />

    <ActiveParkingCard />

    <HorizontalListWithData />

    <LatestPromos />

    <RegisteredVehiclesSection :vehicles="registeredVehiclesData" />
    <div class="h-8"></div>
  </div>
</template>

<script>
// Import komponen-komponen yang dibutuhkan
import HeaderSection from '../components/HomePage/HeaderSection.vue';
import ProfileCard from '../components/HomePage/ProfileCard.vue';
import MenuIcons from '../components/HomePage/MenuIcons.vue';
import ActiveParkingCard from '../components/HomePage/ActiveParkingCard.vue';
import HorizontalListWithData from '../components/MicrositePromo/ListCard2.vue';
import LatestPromos from '../components/MicrositePromo/latestPromo.vue';
import HeaderNav from '../components/MicrositePromo/headerCategory.vue';
export default {
  name: 'SmartParkingSolution',
  components: {
    HeaderSection,
    ProfileCard,
    MenuIcons,
    ActiveParkingCard,
    HeaderNav,
    HorizontalListWithData,
    LatestPromos
  },
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      this.$router.push('/merchant');
      console.log('Kembali ke halaman sebelumnya');
    },
  },
};
</script>

<style scoped></style>
