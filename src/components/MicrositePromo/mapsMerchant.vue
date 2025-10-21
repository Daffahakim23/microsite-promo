<template>
    <h2 class="text-md font-semibold">Lokasi Merchant</h2>
    <div class="w-full mx-auto bg-gray-50 shadow-lg flex flex-col relative h-[600px]">
        <div v-if="isLoading" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p class="mt-4 text-neutral-900 font-semibold ">Memuat Data Merchant</p>
            </div>
        </div>

        <div class="absolute top-0 left-0 right-0 px-4 py-3 flex items-right text-black z-20">
            <!-- <span class="text-md font-bold">Cek Parkir Terdekat</span> -->
        </div>

        <div class="absolute top-[24px] left-0 right-0 px-4 z-20 flex items-center w-full justify-between gap-4">
            <div class="w-full">
                <div class="relative flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                    <i class="fas fa-search text-gray-500 mr-4 text-base"></i>
                    <input placeholder="Cari Lokasi..."
                        class="flex-grow bg-transparent text-neutral-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-0 focus:border-transparent"
                        v-model="searchQuery" @input="searchLocation" @focus="showSuggestions = true"
                        @blur="hideSuggestionsWithDelay" />
                </div>
                <ul v-if="showSuggestions && suggestions.length"
                    class="absolute left-4 right-4 bg-white shadow-xl rounded-lg mt-2 py-2 z-30 max-h-48 overflow-y-auto border border-gray-100">
                    <li v-for="suggestion in suggestions" :key="suggestion.place_id"
                        @mousedown.prevent="selectSuggestion(suggestion)"
                        class="px-3 py-2 cursor-pointer hover:bg-gray-100 text-neutral-900 text-sm">
                        {{ suggestion.description }}
                    </li>
                </ul>
            </div>
            <div>
                <button @click="recenterMap" class="w-12 h-12 items-center rounded-full bg-white shadow">
                    <i class="fas fa-crosshairs text-xl text-neutral-900"></i>
                </button>
            </div>
        </div>

        <div id="map-compact" class="flex-grow w-full h-full">
        </div>

        <ParkingDetailsModal :is-visible="showParkingModal" :parking-location="selectedMerchant"
            :user-current-location="userLocation" @close="showParkingModal = false"
            @copy-success="showToasterNotification" />
    </div>

    <Toaster :type="toasterType" :message="toasterMessage" :show="showToaster" />
</template>

<script>
import ParkingDetailsModal from '../HomePage/ParkingDetailModal.vue';
import ParkingSignIcon from '../../assets/icons/parking-sign.svg';
import { createParkingOverlayClass } from '../HomePage/MapOverlay.js';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
import Toaster from '../../components/toaster.vue';

const db = getFirestore(firebaseApp);

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    name: 'CompactMerchantMap',
    components: {
        ParkingDetailsModal,
        Toaster,
    },
    data() {
        return {
            showToaster: false,
            toasterMessage: '',
            toasterType: 'success',
            placesService: null,
            isLoading: false,
            parkingSignIcon: ParkingSignIcon,
            map: null,
            userLocation: null,
            userMarker: null,
            parkingMarkers: [],
            mapStyles: [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ],
            searchQuery: '',
            suggestions: [],
            showSuggestions: false,
            autocompleteService: null,
            geocoder: null,
            hideTimeout: null,
            nearbyParkingData: [],
            showParkingModal: false,
            selectedParkingLocation: null,
            ParkingOverlayClass: null,
            nearbyMerchantData: [],
            selectedMerchant: null,
        };
    },
    mounted() {
        this.loadGoogleMapsApi();
    },
    beforeUnmount() {
    },
    methods: {
        showToasterNotification(message, type = 'success') {
            this.toasterMessage = message;
            this.toasterType = type; // Tangkap tipe event yang dikirim (success/error)
            this.showToaster = true;

            // Sembunyikan setelah 3 detik
            setTimeout(() => {
                this.showToaster = false;
            }, 3000);
        },

        initializeGoogleServices() {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            this.geocoder = new window.google.maps.Geocoder();
            this.placesService = new window.google.maps.places.PlacesService(this.map);
        },

        updateUserMarker(position, color) {
            if (this.userMarker) {
                this.userMarker.setPosition(position);
                const userIconSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 48 48'>
        <g fill='none' stroke-width='3'>
            <path fill='${color === '#0000FF' ? '#7db8ff' : '#FF7D7D'}' d='M42 21c0 12.919-13.35 22.128-17.056 24.436a1.77 1.77 0 0 1-1.888 0C19.351 43.128 6 33.919 6 21c0-9.941 8.059-18 18-18s18 8.059 18 18'/>
            <path fill='#fff' d='M32 21a8 8 0 1 1-16 0a8 8 0 0 1 16 0'/>
            <path stroke='${color === '#0000FF' ? '#3f76ed' : '#ED3F3F'}' stroke-linecap='round' stroke-linejoin='round' d='M42 21c0 12.919-13.35 22.128-17.056 24.436a1.77 1.77 0 0 1-1.888 0C19.351 43.128 6 33.919 6 21c0-9.941 8.059-18 18-18s18 8.059 18 18'/>
            <path stroke='${color === '#0000FF' ? '#3f76ed' : '#ED3F3F'}' stroke-linecap='round' stroke-linejoin='round' d='M32 21a8 8 0 1 1-16 0a8 8 0 0 1 16 0'/>
        </g>
    </svg>
            `;
                this.userMarker.setIcon({
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(userIconSvg)}`,
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new window.google.maps.Point(24, 48)
                });
                console.log("User marker updated position and icon.");
            } else {
                console.warn("User marker not yet initialized. Cannot update position/icon.");
            }
        },

        handleCardClick(locationData) {
            // this.selectedParkingLocation = locationData;
            this.selectedMerchant = merchantData;
            this.showParkingModal = true;
            this.map.setZoom(18);
            if (this.map && locationData.latitude && locationData.longitude) {
                this.map.panTo({ lat: locationData.latitude, lng: locationData.longitude });
            }
        },

        loadGoogleMapsApi() {
            if (window.google && window.google.maps) {
                this.initializeGoogleServices();
                this.ParkingOverlayClass = createParkingOverlayClass();
                this.getCurrentLocationAndInitMap();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDPIPNe7opK1Q5ab7B6_w0TPjRZdzUYOs4&libraries=places&callback=initMapCallback`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            window.initMapCallback = () => {
                this.initializeGoogleServices();
                this.ParkingOverlayClass = createParkingOverlayClass();
                this.getCurrentLocationAndInitMap();
            };
        },

        initializeGoogleServices() {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            this.geocoder = new window.google.maps.Geocoder();
        },

        getCurrentLocationAndInitMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.userLocation = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        if (!this.map) {
                            this.initMap(this.userLocation);
                        } else {
                            this.map.setCenter(this.userLocation);
                            this.map.setZoom(17);
                        }
                        this.updateUserMarker(this.userLocation, '#0000FF');
                        // this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng);
                        this.fetchNearbyMerchantsFromFirestore(this.userLocation.lat, this.userLocation.lng);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        let errorMessage = "Tidak dapat mengambil lokasi Anda. Pastikan GPS diaktifkan dan berikan izin lokasi.";
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                errorMessage = "Anda menolak permintaan lokasi. Mohon izinkan akses lokasi untuk melihat posisi Anda.";
                                break;
                            case error.TIMEOUT:
                                errorMessage = "Permintaan lokasi terlalu lama. Pastikan koneksi internet stabil.";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMessage = "Informasi lokasi tidak tersedia. Coba lagi nanti.";
                                break;
                        }
                        alert(errorMessage);
                        this.userLocation = { lat: -6.2208, lng: 106.6601 };
                        if (!this.map) {
                            this.initMap(this.userLocation);
                        } else {
                            this.map.setCenter(this.userLocation);
                            this.map.setZoom(17);
                        }
                        this.updateUserMarker(this.userLocation, '#0000FF');
                        this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng);
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                alert("Browser Anda tidak mendukung Geolocation. Harap gunakan browser yang berbeda atau masukkan lokasi secara manual.");
                this.userLocation = { lat: -6.2208, lng: 106.6601 };
                if (!this.map) {
                    this.initMap(this.userLocation);
                } else {
                    this.map.setCenter(this.userLocation);
                    this.map.setZoom(17);
                }
                this.updateUserMarker(this.userLocation, '#0000FF');
                this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng);
            }
        },

        // Ubah ID elemen map di initMap
        initMap(userLatLng) {
            const mapOptions = {
                center: userLatLng,
                zoom: 14,
                styles: this.mapStyles,
                disableDefaultUI: true,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                rotateControl: false
            };

            // ID harus unik, ganti dari 'map' ke 'map-compact'
            this.map = new window.google.maps.Map(document.getElementById('map-compact'), mapOptions);

            // ... (sisanya sama, termasuk userMarker initialization)
            const userIconSvg = `
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 48 48'>
                <g fill='none' stroke-width='3'>
                    <path fill='#7db8ff' d='M42 21c0 12.919-13.35 22.128-17.056 24.436a1.77 1.77 0 0 1-1.888 0C19.351 43.128 6 33.919 6 21c0-9.941 8.059-18 18-18s18 8.059 18 18'/>
                    <path fill='#fff' d='M32 21a8 8 0 1 1-16 0a8 8 0 0 1 16 0'/>
                    <path stroke='#3f76ed' stroke-linecap='round' stroke-linejoin='round' d='M42 21c0 12.919-13.35 22.128-17.056 24.436a1.77 1.77 0 0 1-1.888 0C19.351 43.128 6 33.919 6 21c0-9.941 8.059-18 18-18s18 8.059 18 18'/>
                    <path stroke='#3f76ed' stroke-linecap='round' stroke-linejoin='round' d='M32 21a8 8 0 1 1-16 0a8 8 0 0 1 16 0'/>
                </g>
            </svg>
            `;
            this.userMarker = new window.google.maps.Marker({
                position: userLatLng,
                map: this.map,
                icon: {
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(userIconSvg)}`,
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new window.google.maps.Point(24, 24)
                }
            });
            console.log("User marker initialized in initMap.");
        },

        async getImageFromGoogle(locationName) {
            return new Promise((resolve) => {
                const service = new google.maps.places.PlacesService(document.createElement('div'));

                const request = {
                    query: locationName,
                    fields: ['photos'],
                };

                service.findPlaceFromQuery(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results[0]?.photos?.[0]) {
                        const photoUrl = results[0].photos[0].getUrl({ maxWidth: 400 });
                        resolve(photoUrl);
                    } else {
                        resolve(`https://placehold.co/256x120/a0aec0/ffffff?text=${encodeURIComponent(locationName || 'No Name')}`);
                    }
                });
            });
        },

        // Ganti nama fungsi menjadi fetchNearbyMerchantsFromFirestore
        async fetchNearbyMerchantsFromFirestore(centerLat, centerLng, isCurrentLocation = false) {
            this.isLoading = true;

            // Hapus marker lama
            if (this.parkingMarkers.length > 0) {
                this.parkingMarkers.forEach(overlay => overlay.setMap(null));
                this.parkingMarkers = [];
            }

            // Perbarui posisi marker pengguna
            this.updateUserMarker(
                { lat: centerLat, lng: centerLng },
                isCurrentLocation ? '#FF0000' : '#FF0000'
            );
            this.userLocation = { lat: centerLat, lng: centerLng };

            try {
                const radiusKm = 15;
                const merchantsRef = collection(db, "merchants");
                const snapshot = await getDocs(merchantsRef);

                let processedMerchantData = [];

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const merchantId = doc.id;
                    const finalImageUrl = data.imageUrl
                        ? data.imageUrl
                        : `https://placehold.co/260x100/a0aec0/ffffff?text=${encodeURIComponent(data.name || 'Merchant')}`;

                    const lat = data.latitude;
                    const lng = data.longitude;
                    console.log("Merchant Mentah:", doc.id, "Lat:", lat, "Lng:", lng, "name:", name, "Type Lat:", typeof lat);

                    if (lat && lng) {
                        const distance = this.calculateDistanceRaw(centerLat, centerLng, lat, lng);
                        if (distance <= radiusKm) {
                            processedMerchantData.push({
                                id: merchantId,
                                latitude: lat,
                                longitude: lng,
                                name: data.name || 'Merchant Tanpa Nama',
                                sub: data.sub,
                                lastLogin: data.lastLogin,
                                distance: distance,
                                imageUrl: finalImageUrl,
                                categories: data.categories,
                                address: data.address,
                                promoAvailable: data.promoAvailable,
                                phone: data.phone,
                                websiteUrl: data.websiteUrl
                                // imageUrl: data.imageUrl,
                            });
                        }
                    }
                });

                processedMerchantData.sort((a, b) => a.distance - b.distance);
                this.nearbyMerchantData = processedMerchantData;

                if (this.nearbyMerchantData.length > 0) {
                    this.nearbyMerchantData.forEach(merchant => {
                        if (this.ParkingOverlayClass) {
                            const htmlMarker = new this.ParkingOverlayClass(this.map, merchant, this.handleMerchantClick);
                            this.parkingMarkers.push(htmlMarker);
                        }
                    });
                    console.log("HTML Merchant markers created. Total:", this.parkingMarkers.length, "lokasi.");
                } else {
                    console.log("Tidak ada merchant ditemukan dalam radius.");
                }

            } catch (error) {
                console.error("Terjadi kesalahan saat mengambil data merchant dari Firestore:", error);
                alert("Gagal memuat data merchant. Silakan periksa koneksi atau izin Firebase Anda.");
                this.nearbyMerchantData = [];
            } finally {
                this.isLoading = false;
            }
        },
        handleMerchantClick(merchantData) {
            this.selectedMerchant = merchantData;
            this.showParkingModal = true;
            this.map.setZoom(18);
            if (this.map && merchantData.latitude && merchantData.longitude) {
                this.map.panTo({ lat: merchantData.latitude, lng: merchantData.longitude });
            }
        },

        recenterMap() {
            if (this.map) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const newLat = position.coords.latitude;
                            const newLng = position.coords.longitude;
                            this.userLocation = { lat: newLat, lng: newLng };

                            this.map.setCenter(this.userLocation);
                            this.map.setZoom(17);

                            this.updateUserMarker(this.userLocation, '#FF0000');
                            // this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng, true);
                            this.fetchNearbyMerchantsFromFirestore(this.userLocation.lat, this.userLocation.lng, true);
                        },
                        (error) => {
                            console.error("Error getting current location for recenter:", error);
                            let errorMessage = "Terjadi kesalahan saat memuat lokasi Anda. ";
                            switch (error.code) {
                                case error.PERMISSION_DENIED:
                                    errorMessage += "Anda menolak permintaan lokasi. Mohon izinkan akses lokasi untuk melihat posisi Anda.";
                                    break;
                                case error.TIMEOUT:
                                    errorMessage += "Permintaan lokasi terlalu lama. Pastikan koneksi internet stabil.";
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    errorMessage += "Informasi lokasi tidak tersedia. Coba lagi nanti.";
                                    break;
                                default:
                                    errorMessage += "Silakan pastikan GPS diaktifkan dan berikan izin lokasi.";
                                    break;
                            }
                            alert("Cannot get location, please allow location access.\n" + errorMessage);

                            this.userLocation = { lat: -6.2208, lng: 106.6200 };
                            this.map.setCenter(this.userLocation);
                            this.map.setZoom(17);

                            this.updateUserMarker(this.userLocation, '#FF0000');
                            this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng, true);
                        },
                        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                    );
                } else {
                    alert("Browser Anda tidak mendukung Geolocation. Harap gunakan browser yang berbeda.");

                    this.userLocation = { lat: -6.2208, lng: 106.6601 };
                    this.map.setCenter(this.userLocation);
                    this.map.setZoom(17);

                    if (this.userMarker) {
                        this.userMarker.setPosition(this.userLocation);
                        this.updateUserMarker(this.userLocation, '#FF0000');
                    } else {
                        this.updateUserMarker(this.userLocation, '#FF0000');
                    }
                    this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng, true);
                }
            }
        },

        searchLocation() {
            clearTimeout(this.hideTimeout);
            if (!this.autocompleteService || this.searchQuery.length < 3) {
                this.suggestions = [];
                this.showSuggestions = false;
                return;
            }

            this.autocompleteService.getPlacePredictions(
                { input: this.searchQuery, componentRestrictions: { country: 'id' } },
                (predictions, status) => {
                    if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
                        this.suggestions = [];
                        this.showSuggestions = false;
                        return;
                    }
                    this.suggestions = predictions;
                    this.showSuggestions = true;
                }
            );
        },

        selectSuggestion(suggestion) {
            this.searchQuery = suggestion.description;
            this.showSuggestions = false;
            if (!this.geocoder) return;

            this.geocoder.geocode({ placeId: suggestion.place_id }, (results, status) => {
                if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
                    const newLocation = results[0].geometry.location;
                    const newLat = newLocation.lat();
                    const newLng = newLocation.lng();
                    this.userLocation = { lat: newLat, lng: newLng };
                    this.updateUserMarker(this.userLocation, '#FF0000');

                    this.map.setCenter({ lat: newLat, lng: newLng });
                    this.map.setZoom(15);

                    // this.fetchNearbyParkingLocations(newLat, newLng, false); // false, karena ini hasil pencarian
                    this.fetchNearbyMerchantsFromFirestore(newLat, newLng, false);
                } else {
                    console.error('Geocoder failed due to: ' + status);
                    alert('Tidak dapat menemukan lokasi untuk saran yang dipilih.');
                }
            });
        },

        hideSuggestionsWithDelay() {
            this.hideTimeout = setTimeout(() => {
                this.showSuggestions = false;
            }, 150);
        },

        calculateDistance(lat1, lon1, lat2, lon2) {
            if (lat1 === null || lon1 === null || lat2 === null || lon2 === null || lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
                return 'N/A';
            }
            const R = 6371;
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance.toFixed(1) + 'Km';
        },
        calculateDistanceRaw(lat1, lon1, lat2, lon2) {
            if (lat1 === null || lon1 === null || lat2 === null || lon2 === null || lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
                return Infinity;
            }
            const R = 6371;
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        }
    },
};
</script>

<style scoped>
#map-compact {
    height: 100%;
    width: 100%;
    padding-top: 100px;
    box-sizing: border-box;
}

.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.custom-infowindow {
    width: 200px;
    border-radius: 12px;
    overflow: hidden;
    background-color: #333;
    color: #fff;
    font-family: Arial, sans-serif;
    padding: 0;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
}

.infowindow-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    margin-bottom: 8px;
}

.infowindow-body {
    padding: 8px 12px 12px;
}

.infowindow-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #fff;
}

.infowindow-spots {
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;
}

.infowindow-spots span {
    font-size: 32px;
    margin-left: 5px;
}

.gm-ui-hover-effect {
    display: none !important;
}

.gm-style .gm-iw-cc {
    padding: 0 !important;
}

.gm-style .gm-iw-bg {
    background: transparent !important;
    box-shadow: none !important;
}

.gm-style .gm-iw-tg {
    display: none !important;
}

#app-container {
    min-height: var(--app-height);
}
</style>