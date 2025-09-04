<template>
    <div class="grid grid-cols-4 gap-1 px-4 my-6">
        <div v-for="(item, index) in menuItems" :key="index" class="flex flex-col items-center">
            <!-- Menambahkan @click event listener pada div pembungkus kartu ikon -->
            <div :style="{ background: item.cardBgGradient }"
                class="icon-card-visual rounded-xl shadow-md mb-2 flex items-center justify-center border-1 border-[#FEE9E6]"
                @click="handleMenuItemClick(item.label)">
                <img :src="item.iconSrc" :alt="item.label + ' icon'" class="h-[42px] w-[42px]">
            </div>
            <span class="text-neutral-900 text-xs text-center font-bold px-2">{{ item.label }}</span>
        </div>
    </div>
</template>

<script>
import IconMapMarker from '../../assets/menu-icons/map-marker.svg';
import IconHistory from '../../assets/menu-icons/history.svg';
import IconCreditCard from '../../assets/menu-icons/credit-card.svg';
import IconCog from '../../assets/menu-icons/Cog.svg';

export default {
    name: 'MenuIcons',
    data() {
        return {
            menuItems: [
                {
                    label: 'Cek Slot Parkir',
                    iconSrc: IconMapMarker,
                    cardBgGradient: 'radial-gradient(circle, #FFDFDB 0%, #FFF6F5 100%)' // Gradient untuk kartu luar
                },
                {
                    label: 'Riwayat Transaksi',
                    iconSrc: IconHistory,
                    cardBgGradient: 'radial-gradient(circle, #FFDFDB 0%, #FFF6F5 100%)'
                },
                {
                    label: 'Metode Pembayaran',
                    iconSrc: IconCreditCard,
                    cardBgGradient: 'radial-gradient(circle, #FFDFDB 0%, #FFF6F5 100%)'
                },
                {
                    label: 'Pengaturan',
                    iconSrc: IconCog,
                    cardBgGradient: 'radial-gradient(circle, #FFDFDB 0%, #FFF6F5 100%)'
                }
            ]
        };
    },
    methods: {
        handleMenuItemClick(label) {
            if (label === 'Cek Slot Parkir') {
                this.$router.push('/parkingMapsScreen');
            }
            if (label === 'Riwayat Transaksi') {
                this.$router.push('/transactionHistoryScreen');
            }
            if (label === 'Metode Pembayaran') {
                this.$router.push('/paymentMethodScreen');
            }
            if (label === 'Pengaturan') {
                this.$router.push('/settingScreen');
            }
        }
    }
};
</script>

<style scoped>
.icon-card-visual {
    width: 72px;
    height: 72px;
    transition: transform 0.2s ease-in-out;
}

.flex-col:hover .icon-card-visual {
    transform: translateY(-5px);
}
</style>
