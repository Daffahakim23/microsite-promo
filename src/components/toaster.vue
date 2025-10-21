<template>
    <div v-if="show" :class="toasterClasses"
        class="fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center z-[60]">
        <div :class="iconClasses" class="mr-2">
            <i :class="icon"></i>
        </div>
        <span class="flex-grow">{{ message }}</span>
        <button @click="close" class="ml-4">
            <i class="fas fa-times"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'success'
        },
        message: {
            type: String,
            required: true
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        toasterClasses() {
            return {
                'bg-green-200 text-green-800': this.type === 'success',
                'bg-red-200 text-red-800': this.type === 'error',
                'bg-yellow-200 text-yellow-800': this.type === 'warning'
            };
        },
        iconClasses() {
            return {
                'text-green-600': this.type === 'success',
                'text-red-600': this.type === 'error',
                'text-yellow-600': this.type === 'warning'
            };
        },
        icon() {
            return {
                'fas fa-check-circle': this.type === 'success',
                'fas fa-exclamation-circle': this.type === 'error',
                'fas fa-exclamation-triangle': this.type === 'warning'
            };
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>