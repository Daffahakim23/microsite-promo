<template>
  <div class="">
    <h2 class="text-md font-semibold mb-4 self-start">Popular Promo</h2>
    <div class="flex overflow-x-auto whitespace-nowrap scrollbar-hide space-x-4">
      <div v-for="(promo, index) in promos" :key="index"
        class="flex-shrink-0 w-80 h-40 relative  bg-cover bg-center"
        :style="{ backgroundImage: `url(${promo.image})` }">
        <div class="relative z-10 p-4 text-white">
          <div class="flex items-center justify-between mb-12">
            <div class="flex items-center space-x-1">
              <!-- <img :src="parkingSignIcon" alt="Promo Icon" class="h-6 w-6" /> -->
              <h2 class="text-white font-semibold text-sm">{{ promo.brand }}</h2>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-xs font-regular px-2 py-1 rounded-full"
                style="background-color: rgba(255, 255, 255, 0.3)">{{ promo.validUntil }}</span>
            </div>
          </div>
          <div class="flex items-end justify-between h-12">
            <h3 class="text-xl font-semibold">{{ promo.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ParkingSignIcon from '../../assets/icons/parking-sign.svg';
import bgCardParking from '../../assets/icons/bg-card-parking.svg';
import bgBioskop from '../../assets/images/bg-bioskop.png';
import bgKFC from '../../assets/images/bg-kfc.png';
import bgJepang from '../../assets/images/bg-jepang.png';
import bgHM from '../../assets/images/bg-H&M.png';

export default {
  name: 'PromoBanner',
  data() {
    return {
      parkingSignIcon: ParkingSignIcon,
      bgCardParking,
      promos: [
        {
          title: 'Visit Japan up to 50%',
          validUntil: 'Berlaku Sampai 30 Januari',
          image: bgJepang,
          brand: 'Travel Jepang'
        },
        {
          title: 'Promo Spesial Makanan',
          validUntil: 'Berlaku Sampai 15 Februari',
          image: bgKFC,
          brand: 'KFC'
        },
        {
          title: 'Beli 3 Gratis 1',
          validUntil: 'Berlaku Sampai 10 Maret',
          image: bgBioskop,
          brand: 'XXI'
        },
        {
          title: 'Cashback Belanja',
          validUntil: 'Berlaku Sampai 25 Maret',
          image: bgHM,
          brand: 'H&M'
        },
      ],
    };
  },
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>