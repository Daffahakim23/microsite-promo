<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="w-full max-w-lg flex flex-col bg-white rounded-3xl p-6 border border-neutral-200 relative">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-semibold">Pilih Metode Transfer</h2>
                    <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                        <img src="@/assets/close-icon.svg" alt="Close" class="h-8 w-8" />
                    </button>
                </div>
                <div class="space-y-4">
                    <div v-for="method in methods" :key="method.id" class="border rounded-lg p-4 cursor-pointer"
                        :class="{ 'border-primary-500': selectedMethod === method.id }"
                        @click="selectMethod(method.id)">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-semibold">{{ method.name }} (Biaya {{ method.fee }})</h3>
                                <p class="text-sm text-gray-600">{{ method.limit }}</p>
                                <p class="text-sm text-gray-600">{{ method.availability }}</p>
                            </div>
                            <img v-if="selectedMethod === method.id" src="@/assets/success.svg" alt="Selected"
                                class="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        methods: {
            type: Array,
            required: true,
        },
        selectedMethod: {
            type: String,
            default: null,
        },
    },
    emits: ["close", "confirm", "update:selectedMethod"],
    methods: {
        selectMethod(methodId) {
            this.$emit("update:selectedMethod", methodId);
            this.$emit("confirm", methodId);
        },
    },
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