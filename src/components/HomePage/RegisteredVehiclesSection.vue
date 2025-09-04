<template>
    <div class="px-4 mt-6">
        <h2 class="text-neutral-700  font-bold text-sm mb-4">Kendaraan Terdaftar</h2>
        <div class="registered-vehicle-card relative" v-for="(vehicle, index) in vehicles" :key="index">
            <div class="bg-gradient-custom flex justify-between items-center">
                <span class="block w-full text-center my-4 text-gray-900  font-bold text-3xl">
                    {{ vehicle.licensePlate }}
                </span>
                <span v-if="vehicle.isPrimary"
                    class="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium  px-3 py-1 rounded-full">
                    Utama
                </span>
            </div>
            <div class="flex items-center justify-between space-x-3 px-6 py-3">
                <div class="flex flex-row gap-4 items-center">
                    <img :src="vehicle.imageUrl" class="h-8 w-auto items-center rounded-md">
                    <div>
                        <p class="text-neutral-900  font-semibold">{{ vehicle.carModel }}</p>
                        <p class="text-gray-600  font-semibold text-sm">{{ vehicle.carColor }}</p>
                    </div>
                </div>
                <button class="ml-auto text-gray-500 hover:text-gray-700">
                    <i class="fas fa-ellipsis-v text-lg"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import CarIllustration from "@/assets/car-illus.svg";
export default {
    name: 'RegisteredVehiclesSection',
    data() {
        return {
            carIllustration: CarIllustration,
        }
    },
    props: {
        vehicles: {
            type: Array,
            default: () => [
                {
                    licensePlate: 'B 678 ZZK',
                    isPrimary: true,
                    imageUrl: CarIllustration,
                    carModel: 'Toyota Raize',
                    carColor: 'Hitam'
                },
                {
                    licensePlate: 'B 6781 ZZK',
                    isPrimary: true,
                    imageUrl: CarIllustration,
                    carModel: 'Toyota Raize',
                    carColor: 'Hitam'
                }
            ]
        }
    }
};
</script>

<style scoped>
.registered-vehicle-card {
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    /* padding: 1.5rem; */
    margin-bottom: 1rem;
    /* Tambahkan margin bawah untuk spasi antar kartu kendaraan jika ada lebih dari satu */
}

.bg-gradient-custom {
    background-image: linear-gradient(to right, #F5F5F5, #FFFFFF, #F5F5F5);
    padding: 1rem;
}
</style>
