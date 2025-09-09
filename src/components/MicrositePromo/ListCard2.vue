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
                { id: 1, title: 'Nike', image: ('https://clipground.com/images/nike-logo-png-black-5.png') },
                { id: 2, title: 'Adidas', image: ('https://logos-world.net/wp-content/uploads/2020/04/HM-Logo.png') },
                { id: 3, title: 'Garuda', image: ('https://meruorahlabuanbajo.com/wp-content/uploads/2022/04/Meruorah-Komodo-Labuan-Bajo-Logo-Garuda-Indonesia.png') },
                { id: 4, title: 'Hiburan', image: ('https://brandlogo.org/wp-content/uploads/2025/01/AZKO-Logo-2025.png') },
                { id: 5, title: 'Rumah Tangga', image: ('https://logos-world.net/wp-content/uploads/2020/09/Starbucks-Logo.png') },
                { id: 6, title: 'Rumah', image: ('https://companieslogo.com/img/orig/NFLX_BIG-1095e4f6.png?t=1633074945') },
                { id: 7, title: 'Hotel', image: ('https://tse1.mm.bing.net/th/id/OIP.DKa4Jg1fvYZ5V4gruIKjkwHaCb?rs=1&pid=ImgDetMain&o=7&rm=3') },
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