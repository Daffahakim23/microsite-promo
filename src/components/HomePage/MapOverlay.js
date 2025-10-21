// src/utils/MapOverlay.js

// Import StoreIcon di sini juga agar bisa diakses oleh overlay
import StoreIcon from '../../assets/icons/icon_store.svg';

export function createParkingOverlayClass() {
    class ParkingOverlay extends window.google.maps.OverlayView {
        constructor(map, locationData, handleCardClickCallback) {
            super();
            this.setMap(map);
            this.location = locationData;
            this.handleCardClickCallback = handleCardClickCallback; // Callback untuk klik kartu
            this.div = null; // Elemen DOM marker HTML

            // Bind `this` untuk event listener agar tidak kehilangan konteks
            this.handleClick = this.handleClick.bind(this);
        }

        // Dipanggil saat overlay ditambahkan ke peta
        onAdd() {
            this.div = document.createElement('div');
            this.div.style.position = 'absolute';
            // Anchor: menempatkan tengah bawah ikon pada koordinat LatLng
            // Ini akan membuat pin menunjuk ke lokasi yang benar
            this.div.style.transform = 'translate(-50%, -100%)';
            this.div.style.willChange = 'transform'; // Optimasi performa untuk animasi

            // Styling dasar untuk marker HTML Anda
            this.div.style.background = 'linear-gradient(to bottom, #1D0C0C, #1A0303)';
            this.div.style.borderRadius = '10px';
            this.div.style.color = '#FFFFFF';
            this.div.style.padding = '5px 10px';
            this.div.style.display = 'flex';
            this.div.style.alignItems = 'center';
            this.div.style.justifyContent = 'center';
            this.div.style.gap = '4px';
            this.div.style.cursor = 'pointer';
            this.div.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
            this.div.style.zIndex = '10'; // Pastikan di atas peta

            // Tambahkan SVG icon dan teks spot
            this.div.innerHTML = `
                <img src="${StoreIcon}" style="height: 20px; width: 20px;">
                <span style="font-size: 16px; font-weight: bold;">${this.location.name}</span>
            `;

            // Tambahkan event listener untuk klik
            this.div.addEventListener('click', this.handleClick);

            // Tambahkan div ke pane overlay yang sesuai
            const panes = this.getPanes();
            panes.overlayMouseTarget.appendChild(this.div); // overlayMouseTarget menangani event mouse

            this.draw(); // Panggil draw() untuk posisi awal
        }

        // Dipanggil saat peta berubah (zoom, pan)
        draw() {
            const overlayProjection = this.getProjection();
            if (!overlayProjection || !this.location || !this.div) return;

            // Konversi LatLng ke koordinat piksel Div
            const position = overlayProjection.fromLatLngToDivPixel(
                new window.google.maps.LatLng(this.location.latitude, this.location.longitude)
            );

            // Set posisi elemen div
            this.div.style.left = position.x + 'px';
            this.div.style.top = position.y + 'px';
        }

        // Dipanggil saat overlay dihapus dari peta
        onRemove() {
            if (this.div) {
                this.div.removeEventListener('click', this.handleClick); // Hapus event listener
                this.div.parentNode.removeChild(this.div); // Hapus dari DOM
                this.div = null;
            }
        }

        // Handle click event untuk marker kustom
        handleClick() {
            if (this.handleCardClickCallback) {
                this.handleCardClickCallback(this.location);
            }
        }

        // Metode opsional untuk mengupdate marker jika data location berubah
        updateLocation(newLocationData) {
            this.location = newLocationData;
            if (this.div) {
                // Update konten HTML jika perlu, misalnya jika spots berubah
                this.div.querySelector('span.spot-count').textContent = newLocationData.spots;
            }
            this.draw(); // Gambar ulang posisi
        }
    }
    return ParkingOverlay; // Export the class definition
}