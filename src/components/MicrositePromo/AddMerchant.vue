<template>
    <div>
        <h2 class="text-2xl font-bold text-gray-900 text-center">Input Data Merchant</h2>
        <form @submit.prevent="addMerchant">
            <div class="space-y-4">
                <div>
                    <label for="newMerchantName" class="block text-sm font-medium text-gray-700">Nama Merchant</label>
                    <input v-model="newMerchantData.merchantName" id="newMerchantName" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newOwnerName" class="block text-sm font-medium text-gray-700">Nama Pemilik</label>
                    <input v-model="newMerchantData.ownerName" id="newOwnerName" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newIdNumber" class="block text-sm font-medium text-gray-700">Nomor ID</label>
                    <input v-model="newMerchantData.idNumber" id="newIdNumber" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newBankAccount" class="block text-sm font-medium text-gray-700">Nomor Rekening
                        Bank</label>
                    <input v-model="newMerchantData.bankAccount" id="newBankAccount" type="text" required
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                </div>
                <div>
                    <label for="newCategoryMcc" class="block text-sm font-medium text-gray-700">Kategori MCC</label>
                    <select v-model="newMerchantData.category_mcc" id="newCategoryMcc"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required>
                        <option value="food-&-beverages">Food & Beverages</option>
                        <option value="shopping">Shopping</option>
                        <option value="travel">Travel</option>
                        <option value="entertaiment">Entertainment</option>
                        <option value="house">House</option>
                        <option value="hotel">Hotel</option>
                    </select>
                </div>
            </div>
            <div class="mt-6">
                <button type="submit"
                    class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Tambah Merchant Baru
                </button>
            </div>
        </form>
        <p v-if="merchantStatusMessage" :class="merchantStatusClass">{{ merchantStatusMessage }}</p>
    </div>
</template>

<script>
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';

export default {
    name: 'AddMerchantForm',
    emits: ['merchantAdded'],
    data() {
        return {
            newMerchantData: {
                merchantName: '',
                ownerName: '',
                idNumber: '',
                bankAccount: '',
                category_mcc: 'food-&-beverages',
            },
            merchantStatusMessage: '',
            merchantStatusClass: '',
        };
    },
    methods: {
        async addMerchant() {
            try {
                const db = getFirestore(firebaseApp);
                const merchantsCol = collection(db, 'merchants');
                const docRef = await addDoc(merchantsCol, this.newMerchantData);

                console.log("Merchant berhasil ditambahkan dengan ID: ", docRef.id);
                this.merchantStatusMessage = 'Merchant berhasil ditambahkan!';
                this.merchantStatusClass = 'text-green-600';

                // Clear the form fields
                this.newMerchantData = {
                    merchantName: '',
                    ownerName: '',
                    idNumber: '',
                    bankAccount: '',
                    category_mcc: 'food-&-beverages',
                };

                this.$emit('merchantAdded');
            } catch (e) {
                console.error("Error saat menambahkan merchant: ", e);
                this.merchantStatusMessage = 'Error: Gagal menambahkan merchant.';
                this.merchantStatusClass = 'text-red-600';
            }
        },
    },
};
</script>
