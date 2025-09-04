<template>
    <div class="input-container space-y-1">
        <label v-if="label" :for="id" class="font-medium text-sm text-neutral-600"
            :class="{ 'label-visible': modelValue }">{{ label }}</label>

        <input v-if="type !== 'select'" :id="id" :type="type" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" class="input-field" />

        <div v-else class="custom-select-wrapper">
            <button type="button" :id="id" class="input-field custom-select-trigger" @click="toggleDropdown">
                <span>{{ selectedOptionText || placeholder }}</span>
                <span class="dropdown-arrow">▼</span>
            </button>
            <ul v-if="isOpen" class="custom-options-list">
                <li v-for="option in options" :key="option.value" @click="selectOption(option)" class="custom-option">
                    {{ option.text }}
                </li>
            </ul>
        </div>

        <div class="input-hint mt-2">
            <slot name="hint"></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: '',
    },
    hint: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    modelValue: {
        type: [String, Number],
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const selectedOptionText = computed(() => {
    const selected = props.options.find(option => option.value === props.modelValue);
    return selected ? selected.text : '';
});

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
    emit('update:modelValue', option.value);
    isOpen.value = false;
};
</script>

<style scoped>
.input-container {
    margin-bottom: 1.5rem;
    font-family: sans-serif;
}

.input-label {
    display: block;
    margin-bottom: rem;
    font-size: 1rem;
    font-weight: 700;
    color: #333;
}

.input-field {
    width: 100%;
    padding-left: 0rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    border: none;
    border-bottom: 1px solid #ccc;
    /* border-radius: 0.5rem; */
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.input-field:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid #000;
}

.input-field::placeholder {
    color: #999;
}

.input-hint {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    color: #666;
}

.custom-select-wrapper {
    position: relative;
    width: 100%;
}

.custom-select-trigger {
    /* background-color: #fff; */
    cursor: pointer;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.custom-select-trigger .dropdown-arrow {
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    font-size: 0.8rem;
    pointer-events: none;
}

.custom-options-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 10;
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0 0;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
}

.custom-option {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.custom-option:hover {
    background-color: #f0f0f0;
}
</style>