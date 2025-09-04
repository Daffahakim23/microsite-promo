<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center">
        <div class="w-full p-8 flex items-center justify-between mb-4">
            <div class="absolute top-2 left-0 right-0 p-8 flex items-center justify-between text-black z-10">
                <button @click="goBack" class="p-2 -m-2">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <span class="text-md  font-semibold">Ubah Metode</span>
                <i class="fas fa-ellipsis-v text-xl"></i>
            </div>
        </div>

        <RegisteredVehiclesSection :vehicles="primaryVehicle" class="w-full" />

        <div class="w-full p-4 space-y-4">
            <div v-for="category in groupedPaymentMethods" :key="category.category">
                <h3 class="text-sm font-medium text-gray-500 mb-2">{{ category.category }}</h3>
                <div class="bg-white rounded-xl shadow-sm">
                    <div v-for="method in category.methods" :key="method.id"
                        class="flex items-center justify-between p-4 border-b last:border-none border-gray-200 cursor-pointer transition-colors"
                        :class="{ 'bg-blue-50 border-blue-500': selectedMethodId === method.id }"
                        @click="selectMethod(method.id)">
                        <div class="flex flex-col">
                            <p class="text-black font-semibold">{{ method.accountNumber }}</p>
                            <p class="text-sm text-gray-500">{{ method.name }}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span v-if="method.lastDigits" :class="method.bgColor"
                                class="text-white text-xs font-semibold px-2 py-1 rounded-md">
                                {{ method.lastDigits }}
                            </span>
                            <div v-if="method.isChecked"
                                class="w-6 h-6 rounded-full flex items-center justify-center bg-blue-500">
                                <i class="fas fa-check text-white text-xs"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RegisteredVehiclesSection from '../components/HomePage/RegisteredVehiclesSection.vue';
import { registeredVehiclesData } from "@/data/vehiclesData.js";
import { groupedPaymentMethods } from "@/data/paymentMethodsData.js";

export default {
    components: {
        RegisteredVehiclesSection,
    },
    data() {
        return {
            registeredVehiclesData: registeredVehiclesData,
            groupedPaymentMethods: groupedPaymentMethods,
            // Properti baru untuk melacak metode yang dipilih
            selectedMethodId: 1, // Atur default yang dipilih, misalnya ID pertama
        };
    },
    computed: {
        primaryVehicle() {
            return this.registeredVehiclesData.filter(vehicle => vehicle.isPrimary);
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1);
            console.log('Kembali ke halaman sebelumnya');
        },
        // Metode untuk mengubah metode yang dipilih
        selectMethod(id, methodId) {
            this.selectedMethodId = id;
            console.log(`Metode pembayaran dengan ID ${id} dipilih.`);
            this.groupedPaymentMethods.forEach(category => {
                category.methods.forEach(method => {
                    method.isChecked = method.id === methodId;
                });
            });
        }

    }
};
</script>