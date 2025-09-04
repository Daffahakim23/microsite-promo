<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" role="dialog">
        <div tabindex="0"
            class="w-sm max-w-sm flex flex-col bg-white rounded-2xl p-10 border border-neutral-200 relative mx-4 sm:mx-auto">
            <div class="flex flex-col">
                <div v-for="(feature, index) in features" :key="index" class="rounded-lg text-center">
                    <div class="flex justify-center items-center mb-8">
                        <img :src="feature.icon" class="h-24 sm:h-36 md:h-45" />
                    </div>
                    <p class="text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                        {{ feature.label }}
                    </p>
                    <p v-if="feature.description" class="text-base text-neutral-700 mt-3">
                        {{ feature.description }}
                    </p>
                    <div class="flex flex-col items-center gap-2 mt-8 px-4 mx-auto">
                        <ButtonComponent v-if="feature.buttonString1" @click="handleButtonClick1(feature)" type="button"
                            class="w-full">
                            {{ feature.buttonString1 }}
                        </ButtonComponent>
                        <ButtonComponent v-if="feature.buttonString2" @click="handleButtonClick2(feature)" type="button"
                            variant="ghost" class="w-full">
                            {{ feature.buttonString2 }}
                        </ButtonComponent>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonComponent from "@/components/button.vue";

export default {
    components: {
        ButtonComponent,
    },
    props: {
        isOpen: Boolean,
        features: {
            type: Array,
            default: () => [],
        },
        icon: String,
    },
    emits: ["close", "buttonClick1", "buttonClick2"],
    computed: {
        iconPath() {
            return this.icon ? new URL(`/src/assets/${this.icon}`, import.meta.url).href : "";
        }
    },

    methods: {
        handleButtonClick1(feature) {
            this.$emit("buttonClick1", feature);
        },
        handleButtonClick2(feature) {
            this.$emit("buttonClick2", feature);
        },
        handleEscape(event) {
            if (event.key === "Escape") {
                this.$emit("close");
            }
        },
    },
    mounted() {
        window.addEventListener("keydown", this.handleEscape);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleEscape);
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
