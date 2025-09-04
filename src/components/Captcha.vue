<template>
  <div v-if="show" class="modal-overlay bg-black bg-opacity-50">
    <div class="modal-content bg-white">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-neutral-900">Masukkan kode berikut:</p>
        <button @click="closeModal"
          class="text-neutral-800 hover:bg-gray-200 hover:text-gray-900 rounded-lg  dark:hover:bg-gray-600 dark:hover:text-white">&times;</button>
      </div>
      <div class="captcha-box bg-neutral-100">
        <span class="font-bold text-lg">{{ captcha }}</span>
        <button @click="refreshCaptcha" class="ml-2 text-blue-500">🔄</button>
      </div>
      <div class="input-group">
        <input v-model="userInput" type="text" class="captcha-input" placeholder="Masukkan Captcha" />
        <button @click="validateCaptcha" class="captcha-btn bg-semantic/success-base">Verifikasi</button>
      </div>
      <p v-if="message" :class="{ 'text-semantic/error-base': !isValid, 'text-semantic/success-base': isValid }">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      captcha: this.generateCaptcha(),
      userInput: "",
      message: "",
      isValid: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    generateCaptcha() {
      return Math.random().toString(36).substring(2, 8).toUpperCase();
    },
    refreshCaptcha() {
      this.captcha = this.generateCaptcha();
      this.userInput = "";
      this.message = "";
      this.isValid = false;
    },
    validateCaptcha() {
      if (!this.userInput.trim()) {
        this.message = "Masukkan kode captcha terlebih dahulu!";
        this.isValid = false;
        return;
      }

      if (this.userInput.toUpperCase() === this.captcha) {
        this.isValid = true;
        this.message = "Captcha benar!";
        this.$emit("captcha-verified");
      } else {
        this.isValid = false;
        this.message = "Captcha salah, coba lagi.";
      }
    },
  },
};
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 320px;
}

.captcha-box {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  width: fit-content;
  margin: 16px auto;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.captcha-input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.captcha-btn {
  color: white;
  padding: 8px 8px;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;
}

@media (min-width: 600px) {
  .input-group {
    flex-direction: row;
    gap: 5px;
  }

  .captcha-input {
    flex: 2;
  }

  .captcha-btn {
    flex: 1;
  }
}
</style>
