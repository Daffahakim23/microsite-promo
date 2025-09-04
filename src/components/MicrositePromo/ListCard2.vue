<template>
    <div class="flex flex-col items-center">
        <h2 class="text-md font-semibold mb-4 self-start">Popular Brand</h2>
        <div class="flex space-x-4 overflow-x-auto w-full ">
            <div v-for="item in items" :key="item.id" class="flex-none w-28 flex flex-col items-center">
                <img :src="item.image" :alt="item.title" class="rounded-xl w-24 h-24 object-contain" />
                <!-- <div class="text-sm text-gray-800 font-medium pl-2">{{ item.title }}</div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HorizontalListWithData',
    data() {
        return {
            items: [
                { id: 1, title: 'Nike', image: ('src/assets/images/nike-logo.png') },
                { id: 2, title: 'Adidas', image: ('src/assets/images/hm-logo.png') },
                { id: 3, title: 'Garuda', image: ('src/assets/images/garuda-logo.png') },
                { id: 4, title: 'Hiburan', image: ('src/assets/images/azko-logo.png') },
                { id: 5, title: 'Rumah Tangga', image: ('src/assets/images/shabu-logo.png') },
                { id: 6, title: 'Rumah', image: ('src/assets/images/netflix-logo.png') },
                { id: 7, title: 'Hotel', image: ('src/assets/images/cinepolis-logo.png') },
            ],
        };
    },
};
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
    display: none;
}

.overflow-x-auto {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>