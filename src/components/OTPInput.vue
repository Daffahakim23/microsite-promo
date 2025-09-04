<template>
  <div class="otp-container flex justify-center">
    <input v-for="(_, index) in otpArray" :key="index" type="text" maxlength="1"
      class="otp-box w-14 h-16 text-center border-2 border-gray-300 rounded-md text-2xl" :class="{
        'border-primary-400': otpArray[index],
        'border-gray-300': !otpArray[index],
      }" :value="otpArray[index]" @input="onInput($event, index)" @keydown="onKeyDown(index, $event)"
      ref="otpInputs" />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  computed: {
    otpArray: {
      get() {
        return this.modelValue ? this.modelValue.split("") : ["", "", "", ""];
      },
      set(value) {
        this.$emit("update:modelValue", value.join(""));
      },
    },
  },
  methods: {
    onInput(event, index) {
      const value = event.target.value;

      if (!/^\d$/.test(value)) {
        this.$nextTick(() => {
          this.otpArray.splice(index, 1, ""); 
        });
        return;
      }

      this.$nextTick(() => {
        this.otpArray.splice(index, 1, value); 
      });

      if (index < this.otpArray.length - 1) {
        this.$nextTick(() => this.$refs.otpInputs[index + 1].focus());
      }
    },
    onKeyDown(index, event) {
      if (event.key === "Backspace") {
        this.$nextTick(() => {
          if (!this.otpArray[index] && index > 0) {
            this.$refs.otpInputs[index - 1].focus();
          }
          this.otpArray.splice(index, 1, "");
        });
      }
    },
  },
};
</script>

<style scoped>
.otp-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
