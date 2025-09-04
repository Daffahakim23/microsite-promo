<template>
    <div class="mb-4">
        <div ref="scrollContainer" class="flex pb-3 border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide"
            @scroll="handleScroll">
            <div v-for="item in navItems" :key="item.name" class="flex flex-col items-center w-20">
                <!-- <router-link :to="{ name: 'Category', params: { categoryName: item.name.replace(/\s+/g, '-') } }" -->
                <router-link :to="{ name: 'Category', params: { categoryName: item.categoryName.toLowerCase() } }"
                    class="flex flex-col items-center">
                    <div class="rounded-md p-3">
                        <img :src="item.icon" :alt="item.label + ' icon'" class="h-[28px] w-[28px]" />
                    </div>
                    <div class="items-center text-center w-20">
                        <span class="text-xs font-semibold text-gray-700 text-wrap">{{ item.name }}</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="">
            <div class="w-full h-1 bg-gray-100 relative overflow-hidden rounded-full mx-auto">
                <div class="h-full bg-gray-200 rounded-full"
                    :style="{ width: scrollbarWidth, transform: `translateX(${scrollbarPosition})` }"></div>
            </div>
        </div>
    </div>
</template>

<script>
// (script yang sama seperti sebelumnya)
import { ref } from 'vue';
import FoodIcon from '../../assets/icons/icon_food.svg';
import ShirtIcon from '../../assets/icons/icon_shopping.svg';
import TravelIcon from '../../assets/icons/icon_travel.svg';
import HouseIcon from '../../assets/icons/icon_sofa.svg';
import HotelIcon from '../../assets/icons/icon_apartement.svg';
import EntertaimentIcon from '../../assets/icons/icon_movie.svg';

export default {
    data() {
        return {
            navItems: [
                { name: 'Food & Beverages', icon: FoodIcon, categoryName: 'food-&-beverages' },
                { name: 'Shopping', icon: ShirtIcon, categoryName: 'shopping' },
                { name: 'Travel', icon: TravelIcon, categoryName: 'travel' },
                { name: 'Entertaiment', icon: EntertaimentIcon, categoryName: 'entertaiment' },
                { name: 'House', icon: HouseIcon, categoryName: 'house' },
                { name: 'Hotel', icon: HotelIcon, categoryName: 'hotel' },
            ],
            scrollbarWidth: '0%',
            scrollbarPosition: '0%',
        };
    },
    mounted() {
        this.updateScrollbar();
        window.addEventListener('resize', this.updateScrollbar);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScrollbar);
    },
    methods: {
        handleScroll(event) {
            const { scrollWidth, clientWidth, scrollLeft } = event.target;
            const trackWidth = clientWidth - (clientWidth * (clientWidth / scrollWidth));
            const thumbPosition = (scrollLeft / (scrollWidth - clientWidth)) * trackWidth;
            this.scrollbarPosition = `${thumbPosition}px`;
        },
        updateScrollbar() {
            this.$nextTick(() => {
                const container = this.$refs.scrollContainer;
                if (container) {
                    const { scrollWidth, clientWidth } = container;
                    const thumbWidth = (clientWidth / scrollWidth) * 100;
                    this.scrollbarWidth = `${thumbWidth}%`;
                    this.handleScroll({ target: container });
                }
            });
        },
    },
};
</script>

<style>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>