import { defineStore } from "pinia";

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    uuid: null,
  }),
  actions: {
    setUuid(value) {
      this.uuid = value;
    },
    resetUuid() {
      this.uuid = null;
    }
  },
});