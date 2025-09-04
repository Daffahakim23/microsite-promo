<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center w-full">
        <div class="w-full p-8 flex items-center justify-between mb-4">
            <div class="absolute top-2 left-0 right-0 p-8 flex items-center justify-between text-black z-10">
                <button @click="goBack" class="p-2 -m-2">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <span class="text-md  font-semibold">Pengaturan</span>
                <i class="fas fa-ellipsis-v text-xl"></i>
            </div>
        </div>

        <div class="p-4 space-y-4 w-full">
            <div class="bg-white rounded-xl shadow-sm p-4">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex flex-col">
                        <span class="font-semibold text-gray-800">Notifikasi</span>
                        <span class="text-sm text-gray-500">Atur notifikasi keluar/masuk parkiran, transaksi</span>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer">
                        <div
                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500">
                        </div>
                    </label>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <h2 class="font-semibold text-gray-800">Butuh Bantuan?</h2>
                <div class="flex justify-between items-center py-2">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-headset text-lg text-red-500"></i>
                        <span class="text-gray-700">Hubungi Support</span>
                    </div>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                </div>
                <div class="flex justify-between items-center py-2">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-file-alt text-lg text-red-500"></i>
                        <span class="text-gray-700">Riwayat Laporan</span>
                    </div>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-4 space-y-3">
                <div class="flex justify-between items-center py-2">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-question-circle text-lg text-red-500"></i>
                        <span class="text-gray-700">FAQ</span>
                    </div>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                </div>
                <div class="flex justify-between items-center py-2">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-file-contract text-lg text-red-500"></i>
                        <span class="text-gray-700">Syarat & Ketentuan</span>
                    </div>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                </div>
                <div class="flex justify-between items-center py-2">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-shield-alt text-lg text-red-500"></i>
                        <span class="text-gray-700">Kebijakan Privasi</span>
                    </div>
                    <i class="fas fa-chevron-right text-gray-500"></i>
                </div>
            </div>

            <button class="w-full py-3 bg-white rounded-xl shadow-sm text-red-500 font-semibold border border-red-200">
                Hapus Akun
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