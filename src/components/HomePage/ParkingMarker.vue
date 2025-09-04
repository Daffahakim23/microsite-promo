<script>
import ParkingMarkerIcon from './ParkingMarkerIcon.vue';

export default {
  props: {
    map: {
      type: Object, // Tipe: google.maps.Map instance
      required: true
    },
    locationData: {
      type: Object, // Data lokasi spesifik untuk marker ini
      required: true
    }
  },
  data() {
    return {
      marker: null // Instance google.maps.Marker
    };
  },
  mounted() {
    this.createMarker();
  },
  watch: {
    // Perhatikan perubahan pada locationData jika marker perlu diupdate
    locationData: {
      handler() {
        this.updateMarker();
      },
      deep: true
    }
  },
  methods: {
    createMarker() {
      // Dapatkan objek ikon dari ParkingMarkerIcon
      // Kita "menggunakan" komponen ParkingMarkerIcon secara internal untuk mendapatkan nilai markerIcon-nya.
      // Ini adalah cara yang sedikit "hacky" karena kita tidak merender ParkingMarkerIcon.
      // Cara yang lebih bersih adalah memindahkan logika SVG langsung ke utilitas JS biasa
      // seperti yang saya tunjukkan di jawaban sebelumnya (createParkingMarkerIcon.js),
      // lalu mengimpor utilitas itu di sini.
      // Namun, jika Anda bersikeras dalam file .vue untuk semua hal, ini bisa dilakukan.
      const iconComponent = new (this.$options.components.ParkingMarkerIcon || ParkingMarkerIcon)({
        propsData: {
          imageUrl: this.locationData.imageUrl,
          spots: this.locationData.spots
        }
      })._render(); // Ini untuk mendapatkan VNode dari komponen icon
      const parkingIcon = iconComponent.componentInstance.markerIcon; // Ambil nilai computed property

      this.marker = new window.google.maps.Marker({
        position: { lat: this.locationData.latitude, lng: this.locationData.longitude },
        map: this.map,
        icon: parkingIcon,
        title: `${this.locationData.name} - ${this.locationData.spots} spots available`
      });

      // Tambahkan event listener
      this.marker.addListener('click', () => {
        // Emit event ke parent component saat marker diklik
        this.$emit('marker-clicked', this.locationData);
      });
    },
    updateMarker() {
      // Update marker jika props locationData berubah
      if (this.marker) {
        const parkingIcon = new (this.$options.components.ParkingMarkerIcon || ParkingMarkerIcon)({
          propsData: {
            imageUrl: this.locationData.imageUrl,
            spots: this.locationData.spots
          }
        })._render().componentInstance.markerIcon;

        this.marker.setIcon(parkingIcon);
        this.marker.setPosition({ lat: this.locationData.latitude, lng: this.locationData.longitude });
        this.marker.setTitle(`${this.locationData.name} - ${this.locationData.spots} spots available`);
      }
    },
    removeMarker() {
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = null;
      }
    }
  },
  beforeUnmount() {
    // Pastikan marker dihapus dari peta saat komponen di-unmount
    this.removeMarker();
  },
  // Template kosong karena komponen ini tidak merender elemen DOM yang terlihat
  template: '<div></div>'
};
</script>