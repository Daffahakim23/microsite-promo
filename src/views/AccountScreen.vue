<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center w-full">
        <div class="w-full p-8 flex items-center justify-between mb-4">
            <div class="absolute top-2 left-0 right-0 p-8 flex items-center justify-between text-black z-10">
                <button @click="goBack" class="p-2 -m-2">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <span class="text-md  font-semibold">Akun Terhubung</span>
                <i class="fas fa-ellipsis-v text-xl"></i>
            </div>
        </div>

        <div class="w-full pt-12 flex flex-col items-center">
            <div
                class="rounded-full bg-primary-100 w-24 h-24 flex items-center justify-center text-black text-3xl font-semibold">
                FG
            </div>
            <h2 class="mt-4 text-2xl font-semibold text-black">Fathan Gunadi</h2>
        </div>

        <div class="py-4 mt-8 space-y-4 w-full">
            <div class="border-y p-4 space-y-4">
                <div class="hover:bg-neutral-200 p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-envelope text-lg text-black"></i>
                        <span class="text-black">******mail@email.com</span>
                    </div>
                    <button class="text-sm font-semibold text-red-500">ubah</button>
                </div>
                <div class="hover:bg-neutral-200 p-4 flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-phone text-lg text-black"></i>
                        <span class="text-black">*********544</span>
                    </div>
                    <button class="text-sm font-semibold text-red-500">ubah</button>
                </div>
            </div>
            <button
                class="w-full py-3 hover:bg-neutral-200 text-red-500 font-semibold flex items-center justify-center space-x-2">
                <i class="fas fa-user-slash text-lg"></i>
                <span>Hapus akun</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.push('/homepage');
        }
    }
}
</script>