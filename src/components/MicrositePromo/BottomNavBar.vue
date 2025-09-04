<template>
    <div class="fixed py-2 bottom-0 left-0 right-0 bg-white shadow-lg z-50">
        <div class="flex justify-around items-center h-full max-w-lg mx-auto py-2">
            <router-link to="/homepageMerchant"
                class="flex flex-col items-center text-sm font-regular text-neutral-300 hover:font-medium hover:text-neutral-900"
                active-class="active-link">
                <img src="../../assets/icons/icon_home_navbar.svg" alt="Home" class="h-6 w-6 mb-1">
                <span>Home</span>
            </router-link>

            <router-link to="/promoPage"
                class="flex flex-col items-center text-sm font-regular text-neutral-300 hover:font-medium hover:text-neutral-900"
                active-class="active-link">
                <img src="../../assets/icons/icon_add.svg" alt="Promo" class="h-6 w-6 mb-1">
                <span>Promo</span>
            </router-link>

            <router-link to="/historyPage"
                class="flex flex-col items-center text-sm font-regular text-neutral-300 hover:font-medium hover:text-neutral-900"
                active-class="active-link">
                <img src="../../assets/icons/icon_history.svg" alt="History" class="h-6 w-6 mb-1">
                <span>Riwayat</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BottomNavbar',
};
</script>

<style scoped>
.router-link-exact-active .active-link {
    @apply shadow-md;
}
</style>