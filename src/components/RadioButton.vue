<!-- <template>
  <div class="mb-6">
    <p class="block text-sm font-medium text-neutral-900 mb-4">{{ label }}</p>
    <div class="flex-col flex gap-4">
      <label v-for="(option, index) in options" :key="index" class="flex items-center gap-2 cursor-pointer">
        <input type="radio" :value="option.value" :name="name"
          class="form-radio h-4 w-4 text-primary focus:ring-primary" :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)" />
        <span class="text-sm text-neutral-900">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButtonChoose",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
</style> -->

<template>
  <div class="mb-6">
    <p class="block text-sm font-medium text-neutral-900 mb-4">{{ label }}</p>
    <div class="flex-col flex gap-4">
      <label v-for="(option, index) in options" :key="index" class="flex items-center gap-2"
        :class="{ 'cursor-not-allowed': readonly, 'cursor-pointer': !readonly }">
        <input type="radio" :value="option.value" :name="name"
          class="form-radio h-4 w-4 text-primary focus:ring-primary" :checked="modelValue === option.value"
          :disabled="readonly" @change="$emit('update:modelValue', option.value)" />
        <span class="text-sm text-neutral-900">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioButtonChoose",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number, Boolean],
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style scoped>
/* You might not need specific scoped styles for cursor-not-allowed if you're using Tailwind CSS,
   as it provides the utility class directly. However, if you want a custom style or
   aren't using Tailwind, you could add: */

/* .cursor-not-allowed {
  cursor: not-allowed !important;
} */
</style>
