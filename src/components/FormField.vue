<template>
  <div class="mb-6">
    <label :for="id" class="block text-xs sm:text-sm md:text-sm font-medium text-neutral-900">
      {{ label }}
    </label>
    <div class="relative mt-2">
      <!-- <template v-if="!isDropdown && type !== 'phone'">
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
          @blur="$emit('blur', $event)" :readonly="readonly" :class="{
            'border-gray-200 bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
            'border-red-500 focus:ring-red-400 focus:border-red-400': error,
            'border-neutral-200 focus:ring-1': !readonly && !error
          }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
      </template> -->

      <template v-if="!isDropdown && type !== 'phone'">
        <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue" @focus="$emit('focus', $event)"
          @keypress="handleKeyPress" @input="handleInput" @blur="$emit('blur', $event)" :maxlength="maxlength"
          :max="maxdate" :minlength="minlength" :readonly="readonly" :class="{
            'border-gray-200 bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
            'border-red-500 focus:ring-red-400 focus:border-red-400': error,
            'border-neutral-200 focus:ring-1': !readonly && !error
          }" class="w-full h-10 p-2 border rounded-md focus:outline-none" :required="required" />
      </template>

      <template v-else-if="type === 'phone'">
        <div class="flex items-center border rounded-md focus-within:ring-1"
          :class="{ 'border-red-500 focus-within:ring-red-400 focus-within:border-red-400': error }">
          <button @click="toggleCountryDropdown" type="button"
            class="flex gap-2 items-center px-2 border-r border-neutral-200 relative"
            :class="{ 'border-red-500': error }">
            <span :class="'fi fi-' + selectedCountryCode.toLowerCase()"></span>
            <span class="text-sm text-neutral-800">{{
              getCountryCallingCode(selectedCountryCode)
            }}</span>
          </button>

          <div v-if="isCountryDropdownOpen" ref="countryDropdown"
            class="absolute left-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-md shadow-md z-10 max-h-60 overflow-auto">
            <div v-for="(country, index) in countryList" :key="index" @click="selectCountry(country)"
              class="flex items-center p-2 hover:bg-blue-100 cursor-pointer border-gray-200">
              <span :class="'fi fi-' + country.code.toLowerCase()"></span>
              <span class="ml-2 text-sm">{{ country.name }} ({{ country.callingCode }})</span>
            </div>
          </div>

          <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue" @keypress="handleKeyPress"
            @input="$emit('update:modelValue', $event.target.value)" @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)" :readonly="readonly" :class="{
              'border-gray-200 bg-neutral-100 text-neutral-300 cursor-not-allowed': readonly,
              'border-red-500': error,
              'border-neutral-200 focus:ring-1': !readonly && !error
            }" class="w-full h-10 p-2 rounded-md" :required="required" :maxlength="35" />
        </div>
      </template>
      <template v-else>
        <div class="relative">
          <button type="button" @click="toggleDropdown" ref="trigger"
            class="w-full h-10 px-3 border rounded-md focus:outline-none text-left flex items-center justify-between"
            :class="{
              'border-red-500 focus:ring-red-400 focus:border-red-400': error,
              'border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-blue-400': !error
            }">
            <span :class="selectedLabel ? 'text-neutral-900' : 'text-gray-400'">
              {{ selectedLabel ?? placeholder }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-500" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <div v-if="isOpen && hasSearch" ref="dropdown"
            class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1 max-h-60 overflow-y-auto">
            <div class="p-2 sticky top-0 bg-white z-20">
              <input type="text" v-model="searchQuery" placeholder="Cari..."
                class="w-full h-8 px-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div v-for="(option, index) in filteredOptions" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
            <div v-if="filteredOptions.length === 0 && searchQuery" class="p-3 text-sm text-neutral-500">
              Tidak ada hasil ditemukan.
            </div>
          </div>

          <div v-else-if="isOpen && !hasSearch" ref="dropdown"
            class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1 max-h-60 overflow-y-auto">
            <div v-for="(option, index) in options" :placeholder="placeholder" :key="index"
              @click="selectOption(option)" class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div>

          <!-- <div v-if="isOpen" ref="dropdown"
            class="absolute w-full bg-white border border-neutral-200 rounded-md shadow-md z-10 mt-1 max-h-60 overflow-y-auto">
            <div v-for="(option, index) in options" :key="index" @click="selectOption(option)"
              class="p-3 hover:bg-blue-100 cursor-pointer border-b border-gray-200">
              <p class="text-sm text-neutral-800">{{ option.label }}</p>
              <p v-if="option.subtitle" class="text-xs text-neutral-500">{{ option.subtitle }}</p>
            </div>
          </div> -->
        </div>
      </template>
    </div>
    <p v-if="hint" class="text-xs text-neutral-700 mt-1" :class="{ 'text-red-500': error, 'text-neutral-700': !error }">
      {{ hint }}
    </p>
  </div>
</template>

<script>
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import "flag-icons/css/flag-icons.css";
import { getCountryCallingCode } from "libphonenumber-js";

countries.registerLocale(enLocale);

export default {
  name: "FormField",
  props: {
    label: { type: String, required: true },
    id: { type: String, required: true },
    type: { type: String, default: "text" },
    modelValue: { type: [String, Number], default: "" },
    placeholder: { type: String, default: "" },
    hint: { type: String, default: "" },
    required: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    isDropdown: { type: Boolean, default: false },
    hasSearch: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    error: { type: Boolean, default: false },
    variant: { type: String, default: "" },
    maxlength: { type: Number, default: null },
    maxdate: { type: String, default: null },
    minlength: { type: Number, default: null },

    selectedCountryCode: String,
  },
  emits: ["update:modelValue", "update:selectedCountryCode", "focus", "blur"],
  data() {
    return {
      isOpen: false,
      phoneNumber: "",
      isCountryDropdownOpen: false,
      countryList: [
        { code: "ID", name: "Indonesia", callingCode: "+62" },
        { code: "US", name: "United States", callingCode: "+1" },
        { code: "GB", name: "United Kingdom", callingCode: "+44" },
        { code: "IN", name: "India", callingCode: "+91" },
        { code: "MY", name: "Malaysia", callingCode: "+60" },
        { code: "SG", name: "Singapore", callingCode: "+65" },
        { code: "AU", name: "Australia", callingCode: "+61" },
        { code: "CA", name: "Canada", callingCode: "+1" },
        { code: "DE", name: "Germany", callingCode: "+49" },
        { code: "FR", name: "France", callingCode: "+33" },
        { code: "JP", name: "Japan", callingCode: "+81" },
        { code: "CN", name: "China", callingCode: "+86" },
        { code: "KR", name: "South Korea", callingCode: "+82" },
        { code: "BR", name: "Brazil", callingCode: "+55" },
        { code: "ZA", name: "South Africa", callingCode: "+27" },
        { code: "NG", name: "Nigeria", callingCode: "+234" },
        { code: "EG", name: "Egypt", callingCode: "+20" },
        { code: "SA", name: "Saudi Arabia", callingCode: "+966" },
        { code: "MX", name: "Mexico", callingCode: "+52" },
        { code: "TR", name: "Turkey", callingCode: "+90" },
      ],
      searchQuery: "",
    };
  },
  computed: {
    selectedLabel() {
      const selected = this.options.find((opt) => opt.value === this.modelValue);
      return selected ? selected.label : null;
    },
    filteredOptions() {
      if (!this.searchQuery || !this.hasSearch) {
        return this.options;
      }
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(option =>
        option.label.toLowerCase().includes(query) ||
        (option.subtitle && option.subtitle.toLowerCase().includes(query))
      );
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    document.addEventListener("click", this.handleClickOutsideCountryDropdown);
    if (this.type === "handphone") {
      this.phoneNumber = this.modelValue
        ? this.modelValue.replace(this.getCountryCallingCode(this.selectedCountryCode), "").trim()
        : "";
    }
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    document.removeEventListener("click", this.handleClickOutsideCountryDropdown);
  },

  methods: {
    handleKeyPress(event) {
      const key = event.key;

      if (this.variant === "alpha" && !/^[a-zA-Z\s]$/.test(key)) {
        event.preventDefault();
      }
      if (this.variant === "numeric" && !/^\d$/.test(key)) {
        event.preventDefault();
      }
      // Di sini perubahan untuk alphanumeric: izinkan huruf dan angka
      if (this.variant === "alphanumeric" && !/^[a-zA-Z0-9]$/.test(key)) {
        event.preventDefault();
      }
      if (this.type === "phone") {
        const isDigit = /^\d$/.test(key);
        if (!isDigit) {
          event.preventDefault();
        } else if (this.modelValue.length >= 35) {
          event.preventDefault();
        } else if (this.modelValue.length === 0 && key === "0") {
          event.preventDefault();
        }
      }
    },

    handleInput(event) {
      let value = event.target.value;

      if (this.variant === "alpha") {
        value = value.replace(/[^a-zA-Z\s]/g, "");
      } else if (this.variant === "numeric") {
        value = value.replace(/[^0-9]/g, "");
      }
      // Di sini perubahan untuk alphanumeric: hapus karakter selain huruf dan angka
      else if (this.variant === "alphanumeric") {
        value = value.replace(/[^a-zA-Z0-9]/g, "");
      }

      value = value.trimStart(); // Menghapus spasi di awal
      value = value.replace(/\s\s+/g, ' '); // Mengganti spasi berlebih dengan satu spasi
      this.$emit("update:modelValue", value);
    },

    // handleInput(event) {
    //   let value = event.target.value;

    //   if (this.variant === "alpha") {
    //     value = value.replace(/[^a-zA-Z\s]/g, ""); // hanya huruf dan spasi
    //   } else if (this.variant === "numeric") {
    //     value = value.replace(/[^0-9]/g, ""); // hanya angka
    //   }

    //   // Hapus spasi di awal dan akhir
    //   value = value.trimStart(); // Menghapus spasi di awal
    //   value = value.replace(/\s\s+/g, ' '); // Mengganti multiple spasi menjadi single spasi
    //   this.$emit("update:modelValue", value);

    //   // Ini untuk memastikan kursor tidak melompat ketika spasi di awal dihapus
    //   this.$nextTick(() => {
    //     if (event.target.value !== value) {
    //       event.target.value = value;
    //     }
    //   });
    // },

    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.searchQuery = "";
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.$emit("change", option.value);
      this.isOpen = false;
    },

    handleClickOutside(event) {
      if (
        this.isOpen &&
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target) &&
        this.$refs.trigger &&
        !this.$refs.trigger.contains(event.target)
      ) {
        this.isOpen = false;
      }
    },

    toggleCountryDropdown() {
      this.isCountryDropdownOpen = !this.isCountryDropdownOpen;
    },
    selectCountry(country) {
      this.$emit("update:selectedCountryCode", country.code);
      this.isCountryDropdownOpen = false;
    },

    handleClickOutsideCountryDropdown(event) {
      if (
        this.isCountryDropdownOpen &&
        this.$refs.countryDropdown &&
        !this.$refs.countryDropdown.contains(event.target) &&
        this.$refs.countryDropdownTrigger &&
        !this.$refs.countryDropdownTrigger.contains(event.target)
      ) {
        this.isCountryDropdownOpen = false;
      }
    },
    handlePhoneNumberInput(event) {
      let phoneNumber = event.target.value.replace(/\D/g, "").slice(0, 13);
      this.phoneNumber = phoneNumber;
      // this.$emit("update:modelValue", this.getCountryCallingCode(this.selectedCountryCode) + phoneNumber);
    },
    getCountryCallingCode(countryCode) {
      const country = this.countryList.find(c => c.code === countryCode);
      return country ? country.callingCode : "+62";
    },
  },
};
</script>

<style scoped>
.radio-button-choose-label {
  font-size: inherit;
}

.radio-button-choose-label {
  padding-top: 2px;
  padding-bottom: 2px;
}

.radio-button-choose-input {
  padding-top: 0;
  padding-bottom: 0;
}

input::placeholder {
  color: #9ca3af;
}

/* Untuk kompatibilitas browser lain */
input::-webkit-input-placeholder {
  color: #9ca3af;
}

input::-moz-placeholder {
  color: #9ca3af;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: #9ca3af;
}

input::-ms-input-placeholder {
  color: #9ca3af;
}
</style>
