<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center">
        <div class="w-full  p-8 flex items-center justify-between mb-4">
            <div class="absolute top-2 left-0 right-0 p-8 flex items-center justify-between text-black z-10">
                <button @click="goBack" class="p-2 -m-2">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <span class="text-md  font-semibold">Riwayat Transaksi</span>
                <i class="fas fa-ellipsis-v text-xl"></i>
            </div>
        </div>

        <div class="w-full max-w-md p-4 space-y-6">
            <div v-for="group in groupedTransactions" :key="group.date">
                <h2 class="text-gray-500 text-sm font-medium mb-2">{{ group.date }}</h2>
                <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div v-for="transaction in group.transactions" :key="transaction.id"
                        class="px-4 mt-4 mb-4 justify-between">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div :class="transaction.type === 'Masuk' ? '' : ''"
                                    class="flex items-center justify-center h-10 w-10">
                                    <span v-if="transaction.type === 'Masuk'" class="text-gray-600">
                                        <img :src="masukIcon" alt="Parking Sign Icon" class="h-8 w-8">
                                    </span>
                                    <span v-else class="">
                                        <img :src="keluarIcon" alt="Parking Sign Icon" class="h-8 w-8">
                                    </span>
                                </div>
                                <div>
                                    <p :class="transaction.type === 'Masuk' ? 'text-black' : ''" class="font-medium">
                                        {{ transaction.type }}</p>
                                    <p class="text-sm text-black">{{ transaction.location }}</p>
                                </div>
                            </div>
                            <div class="flex flex-col items-center space-y-2">
                                <div class="flex items-center">
                                    <i class="far fa-clock text-gray-600 mr-1"></i>
                                    <p class="text-gray-500 text-sm">{{ transaction.time }}</p>
                                </div>
                                <div v-if="transaction.amount" class="text-right">
                                    <p :class="transaction.amount.includes('-') ? 'text-red-500' : 'text-green-500'"
                                        class="font-semibold">{{ transaction.amount }}</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="transaction.duration" class="flex items-center mt-4 text-center">
                            <div class="flex-1 border-b border-gray-200"></div>
                            <span
                                class="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
                                {{ transaction.duration }}
                            </span>
                            <div class="flex-1 border-b border-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import masukIcon from '@/assets/icons/masuk-icon-hitam.svg';
import keluarIcon from '@/assets/icons/keluar-icon-merah.svg';
import { transactionsData } from '@/data/transactionData.js';

export default {
    name: 'TransactionHistory',
    data() {
        return {
            masukIcon: masukIcon,
            keluarIcon: keluarIcon,
            transactions: transactionsData
        };
    },
    computed: {
        groupedTransactions() {
            const groups = {};
            this.transactions.forEach(transaction => {
                if (!groups[transaction.date]) {
                    groups[transaction.date] = { date: transaction.date, transactions: [] };
                }
                groups[transaction.date].transactions.push(transaction);
            });
            return Object.values(groups);
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
            console.log('Kembali ke halaman sebelumnya');
        }
    }
};
</script>


<style scoped></style>