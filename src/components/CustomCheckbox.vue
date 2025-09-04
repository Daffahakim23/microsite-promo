<template>
    <div class="flex items-baseline">
        <input type="checkbox" :id="inputId" :checked="modelValue" class="hidden-checkbox"
            :class="{ 'cursor-not-allowed': readonly }" :disabled="readonly"
            @change="$emit('update:modelValue', $event.target.checked)" />
        <label :for="inputId" class="custom-checkbox-label cursor-pointer">
            <span class="custom-checkbox-icon" :class="{ 'cursor-not-allowed': readonly, 'cursor-pointer': !readonly }">
                <img v-if="modelValue" :src="checkedIcon" :alt="checkedAlt" :width=20 :height=20 />
                <img v-else :src="uncheckedIcon" :alt="uncheckedAlt" :width=20 :height=20 />
            </span>
            <span class="text-xs text-justify sm:text-sm md:text-sm">{{ labelText }}</span>
        </label>
    </div>
</template>

<script>
import uncheckedIcon from '@/assets/unchecked-icon.svg'; // Import ikon unchecked
import checkedIcon from '@/assets/checked-icon.svg';   // Import ikon checked

export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        uncheckedAlt: {
            type: String,
            default: 'Unchecked Icon',
        },
        checkedAlt: {
            type: String,
            default: 'Checked Icon',
        },
        iconSize: {
            type: [String, Number],
            default: 20,
        },
        inputId: {
            type: String,
            default: () => `custom-checkbox-${Math.random().toString(36).substring(2, 15)}`,
        },
        labelText: {
            type: String,
            default: '',
        },
        readonly: { // <--- Ensure this prop is defined
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            uncheckedIcon, // Gunakan ikon yang di-import
            checkedIcon,   // Gunakan ikon yang di-import
        };
    },
};
</script>

<style scoped>
.hidden-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.custom-checkbox-label {
    display: flex;
    /* align-items: center; */
    /* Hapus atau komentari baris ini */
    align-items: flex-start;
    /* Tambahkan baris ini */
}

.custom-checkbox-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    flex-shrink: 0;
    /* Mencegah ikon mengecil */
    margin-top: 2px;
    /* Sedikit penyesuaian margin atas agar ikon sejajar dengan baris pertama teks */
}

.custom-checkbox-icon img {
    display: block;
    width: 20px !important;
    height: 20px !important;
}

.hidden-checkbox:focus+.custom-checkbox-label .custom-checkbox-icon img {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}
</style>