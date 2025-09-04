<template>
  <div v-if="type == 1" class="w-full flex flex-col bg-white rounded-3xl p-6 border-1 border-neutral-200">
    <div class="flex justify-between items-center mb-2">
      <div>
        <img :src="iconPath" class="h-16 sm:h-18 md:h-24" />
      </div>
    </div>

    <div class="flex flex-col mb-10">
      <div v-for="(feature, index) in features" :key="index"
        class="flex justify-between items-center p-2 rounded-lg gap-x-8">
        <div class="flex-1">
          <p class="text-lg sm:text-lg md:text-xl lg:text-2xl font-semibold text-neutral-900">
            {{ feature.label }}
          </p>
          <p v-if="feature.description" class="text-base sm:text-base md:text-base lg:text-base text-neutral-600 mt-3">
            {{ feature.description }}
          </p>
          <ul class="mt-4 space-y-2 text-neutral-700">
            <li v-for="(item, index) in items" :key="index" class="flex items-start gap-2">
              <span class="text-primary font-bold">✓</span> {{ item }}
            </li>
          </ul>
          <div class="mt-4">
            <p v-if="feature.bottom" class="text-base sm:text-base md:text-base lg:text-base text-neutral-600 mt-3">
              {{ feature.bottom }}
            </p>
          </div>
          <div v-if="feature.dokumen" class="mt-4">
            <img src="@/assets/document-divider-icon.svg" class="h-1 sm:h-1 md:h-1" />
            <p class="text-sm sm:text-sm md:text-base lg:text-base text-neutral-900 mt-3 font-semibold">
              Hal-hal yang diperlukan
            </p>
            <div class="flex lg:flex-row gap-2 flex-wrap">
              <div v-for="(doc, index) in feature.dokumen" :key="index"
                class="flex flex-row gap-2 border-2 border-neutral-100 items-center mt-2 rounded-xl px-2 py-2 w-fit">
                <img :src="getDokumenIconPath(doc.icon)" class="h-4 sm:h-4 md:h-4" />
                <p class=" item-center font-semibold text-xs sm:text-xs md:text-xs lg:text-xs text-neutral-600">
                  {{ doc.text }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="buttonString" class="flex mt-auto w-full">
      <div @click="handleBtnClick"
        class="w-full bg-white hover:bg-primary  hover:text-white text-primary flex items-center justify-between border-2 border-grey px-4 py-4 rounded-full cursor-pointer">
        <p class="ml-3 font-medium text-sm sm:text-sm md:text-base lg:text-base"> {{
          buttonString }}
        </p>
        <img src="@/assets/right-arrow-circle-orange.svg" alt="Arrow Icon" class="h-6 sm:h-6 md:h-6 lg:h-6 ml-auto" />
      </div>
    </div>
  </div>

  <div v-if="type == 2" class="w-full flex flex-col bg-white rounded-2xl p-6 border-1 border-[#F3F3F2] items-center">
    <div class="w-full flex items-center mb-4">
      <p class="font-semibold text-2xl sm:text-xl md:text-2xl lg:text-3xl">{{ title }}</p>
      <img :src="iconPath" class="h-20 ml-auto" />
    </div>


    <div class="w-full flex flex-col my-10">
      <div v-for="(feature, index) in features" :key="index"
        class="w-full flex justify-between items-center py-2 rounded-lg gap-x-8">
        <div class="flex-1">
          <div class="flex mt-auto w-full">
            <div @click="handleFeatureClick(feature)"
              class="w-full py-[32px] bg-white hover:bg-primary flex items-center justify-between border-2 border-grey px-4 rounded-[12px] cursor-pointer">
              <p class="ml-3 text-primary font-medium sm:text-base md:text-lg lg:text-xl"> {{ feature.label }} </p>
              <img src="@/assets/right-arrow-circle-orange.svg" alt="Arrow Icon"
                class="h-6 sm:h-6 md:h-6 lg:h-6 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    type: String,
    title: {
      type: String,
      required: false
    },
    items: {
      type: Array,
      required: false
    },
    features: {
      type: Array,
      required: false
    },
    icon: String,
    iconDokumen: String,
    buttonString: {
      type: String,
      required: false
    },
    onBtnClick: {
      type: Function,
      required: false,
    },
  },
  emits: ["cardClick"],
  computed: {
    iconPath() {
      return new URL(`/src/assets/${this.icon}`, import.meta.url).href;
    },
    iconPathDokumen() {
      return new URL(`/src/assets/${this.iconDokumen}`, import.meta.url).href;
    },
  },
  methods: {
    handleFeatureClick(feature) {
      if (typeof feature.onBtnClick === "function") {
        feature.onBtnClick();
      }
    },
    getDokumenIconPath(icon) {
      return new URL(`/src/assets/${icon}`, import.meta.url).href;
    },

    handleBtnClick() {
      if (typeof this.onBtnClick === "function") {
        this.onBtnClick();
      }
      this.$emit("cardClick");
    },
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .text-xl {
    font-size: 1.25rem;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .text-4xl {
    font-size: 2.25rem;
  }

  .h-32 {
    height: 8rem;
    /* 32px height */
  }

  .h-36 {
    height: 9rem;
  }

  .h-40 {
    height: 10rem;
  }

  .h-8 {
    height: 2rem;
  }

  .h-10 {
    height: 2.5rem;
  }

  .h-12 {
    height: 3rem;
  }
}

@media (max-width: 640px) {
  .text-xl {
    font-size: 1rem;
    /* Slightly smaller text */
  }

  .text-2xl {
    font-size: 1.25rem;
  }

  .text-4xl {
    font-size: 1.75rem;
  }

  .h-32 {
    height: 6rem;
    /* Adjusted for smaller screens */
  }

  .h-36 {
    height: 7rem;
  }

  .h-40 {
    height: 8rem;
  }

  .h-8 {
    height: 2rem;
  }

  .h-10 {
    height: 2.5rem;
  }

  .h-12 {
    height: 3rem;
  }
}
</style>
