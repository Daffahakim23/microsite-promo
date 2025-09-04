<template>
  <div class="flex flex-wrap md:flex-nowrap w-full gap-8">
    <div class="w-full md:w-1/3 pr-16 md flex-shrink-0">
      <div class="text-left">
        <h1 class="text-3xl sm:text-4xl md:text-5xl mb-8 font-medium">
          {{ headerText }}
        </h1>
        <p class="text-sm sm:text-base md:text-xl text-neutral-600 mb-5">
          {{ bodyText }}
        </p>
      </div>
    </div>

    <div class="w-full md:w-2/3 relative">
      <div v-if="slides.length === 1" class="w-full h-full carousel-container">
        <img :src="slides[0]" class="w-full h-full rounded-lg" />
      </div>

      <div v-if="slides.length > 1" class="relative w-full h-full overflow-hidden carousel-container">
        <transition :name="transitionName" mode="out-in">
          <div class="w-full h-full" :key="currentSlide">
            <div v-for="(slide, index) in slides" :key="index" v-show="currentSlide === index"
              class="absolute inset-0 flex items-center justify-center">
              <img :src="slide" alt="Slide" class="w-full h-full rounded-lg" />
            </div>
          </div>
        </transition>

        <button
          class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-blue-800 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 shadow-md"
          @click="prevSlide">
          &#10094;
        </button>
        <button
          class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-blue-800 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-100 hover:shadow-lg hover:scale-105 shadow-md"
          @click="nextSlide">
          &#10095;
        </button>

        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <span v-for="(slide, index) in slides" :key="index" :class="[
            'w-3 h-3 rounded-full cursor-pointer transition-all duration-300',
            currentSlide === index ? 'bg-blue-800 w-8' : 'bg-gray-500',
          ]" @click="goToSlide(index)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contohSlide1 from "@/assets/contoh-slide-1.svg";
import contohSlide2 from "@/assets/contoh-slide-2.svg";

export default {
  name: "HeaderCarousel",
  props: {
    headerText: String,
    bodyText: String,
    features: Array,
    icon: String,
    onCardClick: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      slides: [contohSlide1, contohSlide2, contohSlide1, contohSlide2],
      currentSlide: 0,
      transitionName: "slide-next",
      autoSlideInterval: null,
    };
  },
  methods: {
    nextSlide() {
      this.transitionName = "slide-next";
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.transitionName = "slide-prev";
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.transitionName =
        index > this.currentSlide ? "slide-next" : "slide-prev";
      this.currentSlide = index;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000);
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
      }
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
};
</script>

<style scoped>
.carousel-container {
  aspect-ratio: 32/12;
  max-height: 80vh;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: transform 0.25s ease;
}

.slide-next-enter-from {
  transform: translateX(100%);
}

.slide-next-leave-to {
  transform: translateX(-100%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}

.slide-prev-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {

  .carousel-container {
    aspect-ratio: 32 /9;
    max-height: 60vh;
  }

  .h-12 {
    height: 3rem;
  }

  .h-14 {
    height: 3.5rem;
  }

  .h-16 {
    height: 4rem;
  }

  .h-6 {
    height: 1.5rem;
  }

  .h-8 {
    height: 2rem;
  }

  .h-10 {
    height: 2.5rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .h-3 {
    height: 0.375rem;
  }

  .w-3 {
    width: 0.375rem;
  }

  .w-8 {
    width: 2rem;
  }
}

@media (max-width: 1024px) {

  .carousel-container {
    aspect-ratio: 32/12;

    max-height: 50vh;
  }

  .h-12 {
    height: 2.5rem;
  }

  .h-14 {
    height: 3rem;
  }

  .h-16 {
    height: 3.5rem;
  }

  .h-6 {
    height: 1.2rem;
  }

  .h-8 {
    height: 1.8rem;
  }

  .h-10 {
    height: 2.2rem;
  }

  .text-sm {
    font-size: 0.75rem;
  }

  .h-3 {
    height: 0.75rem;
  }

  .w-3 {
    width: 0.75rem;
  }

  .w-8 {
    width: 1.8rem;
  }
}
</style>

<!--

<script>
import contohSlide1 from "@/assets/contoh-slide-1.svg";
import contohSlide2 from "@/assets/contoh-slide-2.svg";

export default {
  name: "HeaderCarousel",
  data() {
    return {
      slides: [
        contohSlide1,
        contohSlide2,
        contohSlide1,
        contohSlide2,
        contohSlide1,
        contohSlide2,
      ],
      currentSlide: 0,
      transitionName: "slide-next",
      autoSlideInterval: null,
    };
  },
  methods: {
    nextSlide() {
      this.transitionName = "slide-next";
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.transitionName = "slide-prev";
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
    goToSlide(index) {
      this.transitionName = index > this.currentSlide ? "slide-next" : "slide-prev";
      this.currentSlide = index;
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 8000);
    },
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
      }
    },
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
};
</script> -->
