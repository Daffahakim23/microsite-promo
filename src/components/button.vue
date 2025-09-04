<template>
  <button :type="type" :disabled="disabled" @click="handleClick" :class="[
    'px-4 py-4 w-fit min-w-32 rounded-xl font-semibold mt-2 transition-all',
    disabled
      ? 'bg-neutral-200 cursor-not-allowed text-neutral-300'
      : variant === 'outline'
        ? 'bg-white border-2 border-primary text-primary hover:bg-primary-100 px-[0.875rem] py-[0.875rem]'
        : variant === 'ghost'
          ? 'bg-transparent text-primary hover:text-primay hover:bg-primary-50'
          : 'bg-gradient-to-b from-primary-700 to-primary hover:bg-primary-900 text-white',
  ]">
    <slot />
  </button>
</template>


<script>
export default {
  name: "ButtonComponent",
  props: {
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "default",
    },
  },
  methods: {
    handleClick(event) {
      console.log("Click!");
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
};
</script>
