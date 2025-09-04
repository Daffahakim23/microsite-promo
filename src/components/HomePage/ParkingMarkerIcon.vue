<script>
export default {
    props: {
        imageUrl: {
            type: String,
            required: true,
            default: 'https://placehold.co/180x90/a0aec0/ffffff?text=No+Image' // Placeholder default
        },
        spots: {
            type: Number,
            required: true
        }
    },
    computed: {
        // Ini akan menghasilkan string SVG yang sudah di-encode
        iconSvgString() {
            // Perhatikan penggunaan 'this.imageUrl' dan 'this.spots' dari props
            return `
        <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 150L80 130H10C4.47715 130 0 125.523 0 120V10C0 4.47715 4.47715 0 10 0H190C195.523 0 200 4.47715 200 10V120C200 125.523 195.523 130 190 130H120L100 150Z" fill="#3B1E1E"/>
            <rect x="5" y="5" width="190" height="90" rx="8" fill="#D9D9D9"/>
            <image href="${this.imageUrl}" x="5" y="5" width="180" height="90" style="object-fit: cover; border-radius: 8px;"/>
            <text x="35" y="115" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">P</text>
            <text x="115" y="115" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${this.spots}</text>
        </svg>
      `;
        },
        // Ini akan menghasilkan objek ikon yang siap digunakan oleh Google Maps Marker
        markerIcon() {
            return {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(this.iconSvgString),
                scaledSize: new window.google.maps.Size(200, 150),
                anchor: new window.google.maps.Point(100, 150)
            };
        }
    },
    render() {
        // Komponen ini tidak merender elemen HTML, hanya mengembalikan null atau apa pun yang Anda inginkan
        // jika Anda tidak ingin komponen ini terlihat di DOM Vue.
        // Kita hanya tertarik pada nilai computed property 'markerIcon'.
        return null;
    }
};
</script>