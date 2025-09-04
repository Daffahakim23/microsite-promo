<template>
    <div :id="'marker-' + location.location_code" :class="['custom-parking-marker', { 'active': location.isActive }]">
        <div class="marker-content">
            <img :src="parkingSignIcon" alt="Parking Sign Icon" class="h-5 w-5">
            <span class="spot-count">{{ location.spots }}</span>
        </div>
    </div>
</template>

<script>
import ParkingSignIcon from '@/assets/icons/parking-sign.svg'; // Sesuaikan path

export default {
    props: {
        location: Object, // Data lokasi parkir
    },
    data() {
        return {
            parkingSignIcon: ParkingSignIcon,
        };
    },
    // Mungkin tidak perlu logika Vue di sini jika hanya display
};
</script>

<style scoped>
.custom-parking-marker {
    position: absolute;
    transform: translate(-50%, -100%);
    /* Menempatkan ujung bawah tengah ikon di koordinat */
    /* Sesuaikan styling sesuai desain SVG marker Anda */
    background: linear-gradient(to bottom, #1D0C0C, #1A0303);
    border-radius: 10px;
    /* Contoh, sesuaikan bentuk pin Anda */
    color: white;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 10;
    /* Atur z-index agar muncul di atas peta */
}

.marker-content {
    display: flex;
    align-items: center;
}

.spot-count {
    font-size: 16px;
    font-weight: bold;
}

/* Anda bisa menambahkan pseudo-element untuk membuat 'ekor' pin */
.custom-parking-marker::after {
    content: '';
    position: absolute;
    bottom: -10px;
    /* Sesuaikan agar sesuai dengan tinggi ekor */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #1D0C0C;
    /* Warna ekor pin */
    z-index: 9;
    /* Di bawah konten marker */
}
</style>