<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                class="w-sm max-w-sm flex flex-col bg-white rounded-2xl p-10 border border-neutral-200 relative mx-4 sm:mx-auto">
                <div class="relative text-center items-baseline">
                    <h3 class="text-xl font-semibold text-primary dark:text-white items-center">
                        Apakah Anda sudah memiliki NPWP (Nomor Wajib Pajak)?
                    </h3>
                    <button @click="$emit('close')" class="absolute -right-4 -top-4 rounded-lg hover:bg-gray-200">
                        <img src="@/assets/close-icon.svg" alt="Close" class="h-6 w-6">
                    </button>
                </div>
                <p class="text-neutral-800 dark:text-gray-300 text-center mt-4">
                    Pilih salah satu status NPWP anda terkini.
                </p>
                <div class="flex flex-col justify-between mt-2 gap-1">
                    <ButtonComponent @click="handleNpwpYes" class="flex-1 w-full">
                        Saya memiliki NPWP
                    </ButtonComponent>
                    <ButtonComponent @click="handleNpwpNo" variant="ghost" class="flex-1 w-full">
                        Saya tidak memiliki NPWP
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
        isOpen: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleNpwpYes() {
            this.$emit("onYes");
        },
        handleNpwpNo() {
            this.$emit("onNo");
        },
    },
};
</script>

<style scoped>
.bg-primary {
    background-color: #004AAD;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>