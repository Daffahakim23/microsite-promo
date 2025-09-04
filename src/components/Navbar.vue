<template>
  <div class="bg-neutral-white p-6">
    <div class="flex items-center justify-between">
      <div>
        <button @click="goBack" class="flex items-center text-neutral-900 pl-2">
          <img src="@/assets/Icon Back.png" alt="Logo" class="h-6 mr-2" />
          <p class="text-base font-semibold">Kembali</p>
        </button>
      </div>

      <div class="flex-1 text-center">
        <button @click="goToHome">
          <img src="@/assets/LogoBPR.png" alt="Logo" class="h-12 mr-2" />
        </button>
      </div>

      <div>
        <button class="flex items-center text-primary">
          <span>Batal</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>
