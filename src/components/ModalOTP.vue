<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div
                class="w-1/2 sm:w-1/2 max-w-lg flex flex-col bg-white rounded-3xl pt-16 pb-12 px-8 border border-neutral-200 relative">
                <button @click="$emit('close')" class="absolute top-8 right-8 text-gray-500 hover:text-gray-700">
                    <img src="../assets/close-icon.svg" alt="Close" class="h-8 w-8" />
                </button>

                <div class="flex justify-center items-center mb-8">
                    <img :src="iconPath" alt="Icon" class="h-24 sm:h-36 md:h-45" />
                </div>

                <div class="flex flex-col mb-6">
                    <div v-for="(feature, index) in features" :key="index" class="p-2 rounded-lg gap-x-8">
                        <div class="flex-1 text-center">
                            <p class="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900">
                                {{ feature.label }}
                            </p>
                            <p v-if="feature.description" class="text-base text-neutral-700 mt-3">
                                {{ feature.description }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    class="flex flex-col divide-y divide-neutral-200 border border-neutral-300 rounded-xl overflow-hidden">
                    <button @click="handleSMS"
                        class="flex items-center text-left justify-between p-4 hover:bg-neutral-100 cursor-pointer">
                        <div class="flex items-center gap-3">
                            <img :src="smsIcon" alt="SMS Icon" class="h-6 w-6" />
                            <div>
                                <p class="text-neutral-900 font-semibold text-base">OTP via SMS</p>
                                <p class="text-neutral-700 text-sm">{{ no_hp }}</p>
                            </div>
                        </div>
                        <img src="@/assets/right-arrow-circle-orange.svg" alt="Arrow" class="h-5 w-5" />
                    </button>
                    <button @click="handleWA"
                        class="flex items-center text-left justify-between p-4 hover:bg-neutral-100 cursor-pointer">
                        <div class="flex items-center gap-3">
                            <img :src="whatsappIcon" alt="WhatsApp Icon" class="h-6 w-6" />
                            <div>
                                <p class="text-neutral-900 font-semibold text-base">OTP via WhatsApp</p>
                                <p class="text-neutral-700 text-sm">{{ no_hp }}</p>
                            </div>
                        </div>
                        <img src="@/assets/right-arrow-circle-orange.svg" alt="Arrow" class="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isOpen: Boolean,
        features: Array,
        icon: String,
        no_hp: {
            type: String,
        },
    },
    emits: ["close", "otp-method-selected"],
    computed: {
        iconPath() {
            return new URL(`/src/assets/otp-icon.svg`, import.meta.url).href;
        },
        smsIcon() {
            return new URL('@/assets/sms-icon.svg', import.meta.url).href;
        },
        whatsappIcon() {
            return new URL('@/assets/whatsapp-icon.svg', import.meta.url).href;
        },
    },
    methods: {
        handleSMS() {
            this.$emit("otp-method-selected", 'sms');
        },
        handleWA() {
            this.$emit("otp-method-selected", 'whatsapp');
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