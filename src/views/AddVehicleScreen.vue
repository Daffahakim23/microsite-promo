<template>
    <div class="px-4 mt-6">
        <h2 class="text-neutral-700 font-bold text-sm mb-4">Tambah Kendaraan Baru</h2>

        <form @submit.prevent="addVehicle" class="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div>
                <label for="licensePlate" class="block text-sm font-medium text-gray-700">Plat Nomor</label>
                <input type="text" id="licensePlate" v-model="form.licensePlate"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required>
            </div>
            <div>
                <label for="carModel" class="block text-sm font-medium text-gray-700">Model Kendaraan</label>
                <input type="text" id="carModel" v-model="form.carModel"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required>
            </div>
            <div>
                <label for="carColor" class="block text-sm font-medium text-gray-700">Warna Kendaraan</label>
                <input type="text" id="carColor" v-model="form.carColor"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required>
            </div>
            <div class="flex items-center">
                <input id="isPrimary" type="checkbox" v-model="form.isPrimary"
                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500">
                <label for="isPrimary" class="ml-2 block text-sm text-gray-900">Jadikan kendaraan utama</label>
            </div>

            <button type="submit"
                class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :disabled="loading">
                <span v-if="loading">Menyimpan...</span>
                <span v-else>Simpan Kendaraan</span>
            </button>

            <p v-if="message" class="mt-2 text-center text-sm font-medium"
                :class="{ 'text-green-600': isSuccess, 'text-red-600': !isSuccess }">
                {{ message }}
            </p>
        </form>
    </div>
</template>

<script>
import { firebaseApp } from '../firebase.js'; // Asumsikan file konfigurasi ada di src/firebase.js
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default {
    name: 'AddVehicleForm',
    data() {
        return {
            form: {
                licensePlate: '',
                carModel: '',
                carColor: '',
                isPrimary: false,
                imageUrl: 'https://via.placeholder.com/150', // placeholder image
            },
            loading: false,
            message: '',
            isSuccess: false,
        };
    },
    methods: {
        async addVehicle() {
            this.loading = true;
            this.message = '';

            try {
                const db = getFirestore(firebaseApp);
                const docRef = await addDoc(collection(db, 'vehicles'), this.form);

                this.message = 'Data kendaraan berhasil disimpan!';
                this.isSuccess = true;

                // Reset form setelah berhasil
                this.form = {
                    licensePlate: '',
                    carModel: '',
                    carColor: '',
                    isPrimary: false,
                    imageUrl: 'https://via.placeholder.com/150',
                };

                console.log('Document written with ID: ', docRef.id);
            } catch (error) {
                console.error('Error adding document: ', error);
                this.message = 'Gagal menyimpan data kendaraan. Silakan coba lagi.';
                this.isSuccess = false;
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
/* Styling tambahan untuk konsistensi */
.bg-white {
    background-color: white;
}

.rounded-xl {
    border-radius: 0.75rem;
}

.shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.space-y-4>*+* {
    margin-top: 1rem;
}
</style>
<!-- 
### Cara Menggunakan Komponen Ini

1. **Pastikan Firebase Siap:** Pastikan Anda telah menginstal `firebase` dan `vuefire`, serta membuat file
`src/firebase.js` dengan konfigurasi proyek Anda.

2. **Tambahkan di Komponen Utama:** Anda dapat mengimpor dan menggunakan komponen `AddVehicleForm.vue` di komponen utama
(misalnya, `App.vue`) di mana Anda ingin menampilkan form input.

```vue
<template>
    <div>
        <AddVehicleForm />

        <RegisteredVehiclesSection :vehicles="vehicles" />
    </div>
</template>

<script>
    import AddVehicleForm from './components/AddVehicleForm.vue';
    import RegisteredVehiclesSection from './components/RegisteredVehiclesSection.vue';
    
    // Asumsikan data kendaraan dari Firebase akan dimuat di sini
    export default {
      components: {
        AddVehicleForm,
        RegisteredVehiclesSection,
      },
      data() {
        return {
          vehicles: [] // Data akan diisi dari Firebase di sini
        }
      }
    };
    </script>
```

3. **Buat Koleksi di Firestore:** Sebelum Anda menggunakan form ini, buka konsol Firebase Anda, navigasi ke **Cloud
Firestore**, dan buat koleksi baru bernama `vehicles`. Firestore akan secara otomatis membuat dokumen baru di koleksi
ini setiap kali Anda mengirimkan formulir. -->