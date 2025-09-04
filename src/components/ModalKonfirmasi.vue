<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                class="w-sm max-w-sm flex flex-col bg-white rounded-2xl p-10 border border-neutral-200 relative mx-4 sm:mx-auto">
                <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6" />
                </button>

                <div class="flex justify-center items-center mb-6">
                    <img src="@/assets/konfirmasi-illus.svg" alt="Icon" class="h-24" />
                </div>

                <div class="flex flex-col mb-4">
                    <div class="p-2 rounded-lg gap-x-8">
                        <div class="flex-1 text-center">
                            <p class="text-lg font-semibold text-neutral-900">
                                Apakah Anda yakin sudah memeriksa seluruh data Formulir?
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col gap-4">
                    <ButtonComponent @click="$emit('yes', 'confirm')" class="flex-1 w-full">Ya, Saya Sudah Yakin
                    </ButtonComponent>
                    <ButtonComponent variant="ghost" @click="$emit('close')" class="flex-1 w-full">Tidak, Saya Belum
                        Yakin
                    </ButtonComponent>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import ButtonComponent from "@/components/button.vue";
export default {
    components: {
        ButtonComponent,
    },
    props: {
        isOpen: Boolean,
        features: Array,
        icon: String,
        no_hp: {
            type: String,
        },
    },
    emits: ["close", "yes"],
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>