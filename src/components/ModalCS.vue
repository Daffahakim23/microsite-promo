<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div class="w-full max-w-lg flex flex-col bg-white rounded-3xl p-6 border border-neutral-200 relative">

                <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <img src="@/assets/close-icon.svg" alt="Close" class="h-8 w-8" />
                </button>
                <div class="flex justify-left items-center mb-4">
                    <img :src="iconPath" class="h-16 sm:h-18 md:h-20" />
                </div>
                <div class="flex flex-col mb-6">
                    <div v-for="(feature, index) in features" :key="index" class="p-2 rounded-lg gap-x-8">
                        <div class="flex-1">
                            <p class="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900">
                                {{ feature.label }}
                            </p>
                            <p v-if="feature.description" class="text-base text-neutral-700 mt-3">
                                {{ feature.description }}
                            </p>
                            <p v-if="feature.bottom" class="text-base text-neutral-700 mt-3">
                                {{ feature.bottom }}
                            </p>
                        </div>
                    </div>
                </div>

                <div @click="openWhatsApp" :style="{ cursor: 'pointer' }"
                    class="mb-4 border border-gray-300 rounded-xl overflow-hidden">
                    <div class="flex items-center justify-between p-4 hover:bg-gray-100">
                        <div class="flex items-center gap-3">
                            <img src="@/assets/whatsapp-icon.svg" class="h-6 w-6" alt="WhatsApp" />
                            <div>
                                <p class="text-gray-900 font-semibold text-base">WhatsApp</p>
                                <p class="text-gray-600 text-sm">{{ whatsappContact.number }}</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <img src="@/assets/right-arrow-circle-orange.svg" class="h-5 w-5" />
                        </div>
                    </div>
                </div>

                <div @click="copyCallNumber" :style="{ cursor: 'pointer' }"
                    class="border border-gray-300 rounded-xl overflow-hidden">
                    <div class="flex items-center justify-between p-4 hover:bg-gray-100">
                        <div class="flex items-center gap-3">
                            <img src="@/assets/call-icon.svg" class="h-6 w-6" alt="Call" />
                            <div>
                                <p class="text-gray-900 font-semibold text-base">Call Center Universal Care</p>
                                <p class="text-gray-600 text-sm">{{ callContact.number }}</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <img src="@/assets/right-arrow-circle-orange.svg" class="h-5 w-5" />
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
        features: Array,
        icon: String,
        buttonString: String,
        onBtnClick: Function,
    },
    emits: ["close", "cardClick"],
    computed: {
        iconPath() {
            return new URL(`/src/assets/${this.icon}`, import.meta.url).href;
        },
    },
    methods: {
        handleBtnClick() {
            if (typeof this.onBtnClick === "function") {
                this.onBtnClick();
            }
            this.$emit("cardClick");
        },
        getWhatsAppLink(number = 622122213993) {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
                return `https://wa.me/${number}`;
            } else {
                return `https://web.whatsapp.com/send?phone=${number}`;
            }
        },
        openWhatsApp() {
            if (this.whatsappContact.whatsapp) {
                window.open(this.getWhatsAppLink(this.whatsappContact.whatsapp), '_blank');
            }
        },
        copyCallNumber() {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(this.callContact.number)
                    .then(() => {
                        alert(`Nomor telepon ${this.callContact.number} berhasil disalin!`);
                        this.$emit('close');
                    })
                    .catch(err => {
                        console.error('Gagal menyalin ke clipboard: ', err);
                        alert('Gagal menyalin nomor telepon.');
                    });
            } else {
                const tempInput = document.createElement("input");
                tempInput.value = this.callContact.number;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                alert(`Nomor telepon ${this.callContact.number} berhasil disalin!`);
                this.$emit('close');
            }
        }
    },
    data() {
        return {
            whatsappContact: {
                label: "WhatsApp",
                number: "(+62) 21 2221 3993",
                icon: "whatsapp-icon.svg",
                whatsapp: "+622122213993",
            },
            callContact: {
                label: "Call Center Universal Care",
                number: "(021) 2221 3993",
                icon: "call-icon.svg",
                call: "02122213993",
            },
        };
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
</style>