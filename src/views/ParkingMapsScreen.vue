<template>
    <div class="w-full mx-auto bg-gray-50 shadow-lg flex flex-col" :style="{ minHeight: appHeight }">
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p class="mt-4 text-neutral-900 font-semibold ">Loading parking data...</p>
            </div>
        </div>
        <div class="absolute top-0 left-0 right-0 px-6 pt-4 md:px-6 md:pt-6 flex items-center justify-between z-20">
            <i class="fas fa-arrow-left text-lg md:text-xl text-neutral-900" @click="goBack"></i>
            <p class="text-md md:text-lg font-extrabold text-neutral-900 ">Cek Parkir</p>
            <button @click="recenterMap" class="p-2 rounded-full">
                <i class="fas fa-crosshairs text-base md:text-lg text-neutral-900"></i>
            </button>
        </div>

        <div class="absolute top-[72px] sm:top-[96px] left-0 right-0 px-6 md:px-6 z-10">
            <div class="relative flex items-center bg-white rounded-full px-3 py-3 sm:px-4 sm:py-4 shadow-lg">
                <i class="fas fa-search text-gray-500 mr-2 sm:mr-3 text-base sm:text-lg"></i>
                <input placeholder="Cari Lokasi" class="flex-grow bg-transparent text-neutral-900 placeholder-gray-500 text-sm sm:text-base 
           focus:outline-none focus:ring-0 focus:border-transparent" v-model="searchQuery" @input="searchLocation"
                    @focus="showSuggestions = true" @blur="hideSuggestionsWithDelay" />

            </div>
            <ul v-if="showSuggestions && suggestions.length"
                class="absolute left-4 right-4 bg-white shadow-lg rounded-lg mt-2 py-2 z-30">
                <li v-for="suggestion in suggestions" :key="suggestion.place_id"
                    @mousedown.prevent="selectSuggestion(suggestion)"
                    class="px-3 py-1 sm:px-4 sm:py-2 cursor-pointer hover:bg-gray-100 text-neutral-900 text-sm sm:text-base">
                    {{ suggestion.description }}
                </li>
            </ul>
        </div>

        <div id="map" class="flex-grow w-full h-full min-h-[200px] bg-gray-200 pt-[140px] sm:pt-[190px]">
        </div>

        <div class="absolute bottom-0 left-0 right-0 p-3 px-6 overflow-x-auto flex space-x-3 pb-2 z-10 w-full">
            <div v-for="location in nearbyParkingData" :key="location.location_code"
                class="bg-white rounded-2xl shadow-lg flex-shrink-0 w-[260px] sm:w-[280px] md:w-80 overflow-hidden pb-3 items-start"
                @click="handleCardClick(location)">
                <img :src="location.imageUrl" :alt="location.name"
                    class=" w-full h-24 mb-1 object-cover rounded-t-xl" />

                <div class="w-full py-0 px-3 flex flex-row justify-between items-start h-18">
                    <div class="w-full items-center">
                        <h3 class="text-gray-900  font-bold text-xs sm:text-sm mt-1 h-8 overflow-hidden text-ellipsis">
                            {{ location.name }}
                        </h3>
                        <div class="flex flex-row justify-between items-center mt-1">
                            <p class="text-gray-600 text-xs border px-2 py-1 rounded-full flex items-center">
                                <i class="fas fa-map-marker-alt mr-0.5 text-xs"></i>
                                <span v-if="userLocation">
                                    {{ calculateDistance(userLocation.lat, userLocation.lng, location.latitude,
                                        location.longitude) }}
                                </span>
                                <span v-else>
                                    Calculating distance...
                                </span>
                            </p>
                            <div class="flex flex-row items-center px-2 py-0.5 rounded-lg gap-0.5 bg-red-50">
                                <img :src="parkingSignIcon" alt="Parking Sign Icon" class="h-5 w-5 sm:h-6 sm:w-6">
                                <p class="font-bold text-lg sm:text-xl text-red-500">{{ location.spots }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="nearbyParkingData.length === 0" class="w-full text-center  text-gray-600 p-4">
                Tidak ada lokasi parkir terdekat ditemukan.
            </div>
        </div>

        <ParkingDetailsModal :is-visible="showParkingModal" :parking-location="selectedParkingLocation"
            :user-current-location="userLocation" @close="showParkingModal = false" />
    </div>
</template>

<script>
// import axios from 'axios';
import { dummyParkingLocationsResponse } from '../data/dummyParkingLocation.js';
import ParkingDetailsModal from '../components/HomePage/ParkingDetailModal.vue';
import ParkingSignIcon from '../assets/icons/parking-sign.svg';
import { createParkingOverlayClass } from '../components/HomePage/MapOverlay.js';

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
    name: 'ParkingMapScreen',
    components: {
        ParkingDetailsModal,
    },
    data() {
        return {
            placesService: null,
            appHeight: '100vh',
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
        };
    },
    mounted() {
        this.loadGoogleMapsApi();
        this.setAppHeight();
        window.addEventListener('resize', this.setAppHeight);
        window.addEventListener('orientationchange', this.setAppHeight);
        // window.parkingMapScreenInstance = this;
    },
    beforeUnmount() {
        // Bersihkan event listener saat komponen dihancurkan
        window.removeEventListener('resize', this.setAppHeight);
        window.removeEventListener('orientationchange', this.setAppHeight);
        // delete window.parkingMapScreenInstance;
    },
    methods: {
        initializeGoogleServices() {
            this.autocompleteService = new window.google.maps.places.AutocompleteService();
            this.geocoder = new window.google.maps.Geocoder();
            this.placesService = new window.google.maps.places.PlacesService(this.map);
        },
        setAppHeight() {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
            this.appHeight = `${window.innerHeight}px`;
        },
        goBack() {
            window.history.back();
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
            this.selectedParkingLocation = locationData;
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
                        this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng);
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

            this.map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
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
                    anchor: new window.google.maps.Point(24, 24) // Sesuaikan anchor jika perlu
                }
            });
            console.log("User marker initialized in initMap.");
        },

        // async getImageFromGoogle(locationName) {
        //     const apiKey = "AIzaSyDPIPNe7opK1Q5ab7B6_w0TPjRZdzUYOs4";
        //     const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(locationName)}&key=${apiKey}`;

        //     try {
        //         const searchResponse = await fetch(searchUrl);
        //         const searchData = await searchResponse.json();

        //         if (searchData.results && searchData.results.length > 0 && searchData.results[0].photos) {
        //             const photoReference = searchData.results[0].photos[0].photo_reference;
        //             return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        //         }
        //     } catch (error) {
        //         console.error("Gagal mengambil gambar dari Google:", error);
        //     }

        //     // Fallback ke placeholder jika gagal
        //     return `https://placehold.co/256x120/a0aec0/ffffff?text=${encodeURIComponent(locationName || 'No Name')}`;
        // },

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

        // async fetchNearbyParkingLocations(latitude, longitude, isCurrentLocation = false) {
        //     this.isLoading = true;
        //     if (this.parkingMarkers.length > 0) {
        //         console.log("Clearing", this.parkingMarkers.length, "existing HTML parking markers.");
        //         this.parkingMarkers.forEach(overlay => overlay.setMap(null));
        //         this.parkingMarkers = [];
        //         console.log("HTML Parking markers cleared. Current count:", this.parkingMarkers.length);
        //     } else {
        //         console.log("No HTML parking markers to clear.");
        //     }
        //     this.updateUserMarker(
        //         { lat: latitude, lng: longitude },
        //         isCurrentLocation ? '#FF0000' : '#FF0000'
        //     );
        //     this.userLocation = { lat: latitude, lng: longitude };


        //     let processedParkingData = [];
        //     const apiUrl = `https://sps-service.onrender.com/api/v1/parking-inq`;
        //     const radiusKm = 15;

        //     try {
        //         const response = await fetch(apiUrl, {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ latitude, longitude, radius: radiusKm })
        //         });

        //         if (!response.ok) {
        //             const errorText = await response.text();
        //             throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        //         }

        //         const apiResponse = await response.json();
        //         console.log("Respons API (Full):", apiResponse);

        //         if (apiResponse.responseStatus === "SUCCESS" && apiResponse.data) {
        //             processedParkingData = await Promise.all(apiResponse.data.map(async location => {
        //                 const parkingLotData = (location.parking_lot && location.parking_lot.length > 0) ? location.parking_lot[0] : {};
        //                 const availableCarSpots = getRandomNumber(0, 50);
        //                 const availableMotorSpots = getRandomNumber(0, 50);

        //                 const availableSpots = availableCarSpots + availableMotorSpots;
        //                 const minCarCapacity = availableCarSpots;
        //                 const maxCarCapacity = Math.max(minCarCapacity, getRandomNumber(50, 200));
        //                 const carCapacity = maxCarCapacity;

        //                 const minMotorCapacity = availableMotorSpots;
        //                 const maxMotorCapacity = Math.max(minMotorCapacity, getRandomNumber(50, 200));
        //                 const motorCapacity = maxMotorCapacity;

        //                 const totalCapacity = carCapacity + motorCapacity;
        //                 const lat = location.coordinate ? location.coordinate.latitude : 0;
        //                 const lng = location.coordinate ? location.coordinate.longitude : 0;
        //                 const distance = this.calculateDistanceRaw(latitude, longitude, lat, lng);
        //                 const imageUrl = await this.getImageFromGoogle(location.location_name);

        //                 return {
        //                     location_code: location.location_code, latitude: lat, longitude: lng,
        //                     spots: availableSpots, name: location.location_name,
        //                     // imageUrl: location.image_url || `https://placehold.co/256x120/a0aec0/ffffff?text=${encodeURIComponent(location.location_name || 'No Name')}`,
        //                     imageUrl,
        //                     distance: distance, address: location.address, capacity: totalCapacity,
        //                     lastUpdated: location.last_updated,
        //                 };
        //             }));

        //             const filteredParkingData = processedParkingData.filter(location => location.distance <= radiusKm);
        //             filteredParkingData.sort((a, b) => a.distance - b.distance);
        //             this.nearbyParkingData = filteredParkingData;

        //             if (this.nearbyParkingData.length > 0) {
        //                 this.nearbyParkingData.forEach(location => {
        //                     if (this.ParkingOverlayClass) {
        //                         const htmlMarker = new this.ParkingOverlayClass(this.map, location, this.handleCardClick);
        //                         this.parkingMarkers.push(htmlMarker);
        //                     } else {
        //                         console.error("ParkingOverlayClass is not defined. Google Maps API might not be fully loaded yet.");
        //                     }
        //                 });
        //                 console.log("HTML Parking markers created. Total:", this.parkingMarkers.length, "lokasi.");
        //             } else {
        //                 console.log("Tidak ada lokasi parkir ditemukan dalam radius. Tidak ada marker yang akan digambar.");
        //                 this.nearbyParkingData = [];
        //             }
        //         } else {
        //             console.error("Status respons API bukan SUCCESS atau data kosong:", apiResponse);
        //             this.nearbyParkingData = [];
        //         }
        //     } catch (error) {
        //         console.error("Terjadi kesalahan saat mengambil data parkir:", error);
        //         this.nearbyParkingData = [];
        //     } finally {
        //         this.isLoading = false;
        //     }
        // },

        async fetchNearbyParkingLocations(latitude, longitude, isCurrentLocation = false) {
            this.isLoading = true;
            if (this.parkingMarkers.length > 0) {
                console.log("Clearing", this.parkingMarkers.length, "existing HTML parking markers.");
                this.parkingMarkers.forEach(overlay => overlay.setMap(null));
                this.parkingMarkers = [];
                console.log("HTML Parking markers cleared. Current count:", this.parkingMarkers.length);
            } else {
                console.log("No HTML parking markers to clear.");
            }
            this.updateUserMarker(
                { lat: latitude, lng: longitude },
                isCurrentLocation ? '#FF0000' : '#FF0000'
            );
            this.userLocation = { lat: latitude, lng: longitude };

            let processedParkingData = [];
            // The API URL and radius are not needed for the dummy data
            // const apiUrl = `https://sps-service.onrender.com/api/v1/parking-inq`;
            const radiusKm = 15;

            try {
                const apiResponse = dummyParkingLocationsResponse;
                console.log("Respons Dummy Data (Full):", apiResponse);

                if (apiResponse.responseStatus === "SUCCESS" && apiResponse.data) {
                    processedParkingData = await Promise.all(apiResponse.data.map(async location => {
                        const parkingLotData = (location.parking_lot && location.parking_lot.length > 0) ? location.parking_lot[0] : {};
                        const availableCarSpots = getRandomNumber(0, 50);
                        const availableMotorSpots = getRandomNumber(0, 50);

                        const availableSpots = availableCarSpots + availableMotorSpots;
                        const minCarCapacity = availableCarSpots;
                        const maxCarCapacity = Math.max(minCarCapacity, getRandomNumber(50, 200));
                        const carCapacity = maxCarCapacity;

                        const minMotorCapacity = availableMotorSpots;
                        const maxMotorCapacity = Math.max(minMotorCapacity, getRandomNumber(50, 200));
                        const motorCapacity = maxMotorCapacity;

                        const totalCapacity = carCapacity + motorCapacity;
                        const lat = location.coordinate ? location.coordinate.latitude : 0;
                        const lng = location.coordinate ? location.coordinate.longitude : 0;
                        const distance = this.calculateDistanceRaw(latitude, longitude, lat, lng);
                        // const imageUrl = await this.getImageFromGoogle(location.location_name);
                        // const imageUrl = location.image_url || `https://placehold.co/256x120/a0aec0/ffffff?text=${encodeURIComponent(location.location_name || 'No Name')}`;
                        let imageUrl;
                        if (location.image_url) {
                            imageUrl = location.image_url;
                            console.log(`Menggunakan URL gambar dari data dummy: ${imageUrl}`);
                        } else {
                            imageUrl = await this.getImageFromGoogle(location.location_name);
                            console.log(`Tidak ada URL gambar di data dummy, mengambil dari Google: ${imageUrl}`);
                        }

                        return {
                            location_code: location.location_code, latitude: lat, longitude: lng,
                            spots: availableSpots, name: location.location_name,
                            imageUrl,
                            distance: distance, address: location.address, capacity: totalCapacity,
                            lastUpdated: location.last_updated,
                        };
                    }));

                    const filteredParkingData = processedParkingData.filter(location => location.distance <= radiusKm);
                    filteredParkingData.sort((a, b) => a.distance - b.distance);
                    this.nearbyParkingData = filteredParkingData;

                    if (this.nearbyParkingData.length > 0) {
                        this.nearbyParkingData.forEach(location => {
                            if (this.ParkingOverlayClass) {
                                const htmlMarker = new this.ParkingOverlayClass(this.map, location, this.handleCardClick);
                                this.parkingMarkers.push(htmlMarker);
                            } else {
                                console.error("ParkingOverlayClass is not defined. Google Maps API might not be fully loaded yet.");
                            }
                        });
                        console.log("HTML Parking markers created. Total:", this.parkingMarkers.length, "lokasi.");
                    } else {
                        console.log("Tidak ada lokasi parkir ditemukan dalam radius. Tidak ada marker yang akan digambar.");
                        this.nearbyParkingData = [];
                    }
                } else {
                    console.error("Status respons API bukan SUCCESS atau data kosong:", apiResponse);
                    this.nearbyParkingData = [];
                }
            } catch (error) {
                console.error("Terjadi kesalahan saat memproses data parkir:", error);
                this.nearbyParkingData = [];
            } finally {
                this.isLoading = false;
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
                            this.fetchNearbyParkingLocations(this.userLocation.lat, this.userLocation.lng, true);
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

                    this.userLocation = { lat: newLat, lng: newLng }; // Update state ini

                    // updateUserMarker akan memindahkan marker yang sudah ada
                    this.updateUserMarker(this.userLocation, '#FF0000'); // Merah untuk hasil pencarian

                    this.map.setCenter({ lat: newLat, lng: newLng });
                    this.map.setZoom(15);

                    this.fetchNearbyParkingLocations(newLat, newLng, false); // false, karena ini hasil pencarian
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
            const R = 6371; // Radius of Earth in kilometers
            const dLat = this.deg2rad(lat2 - lat1);
            const dLon = this.deg2rad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in km
            return distance.toFixed(1) + 'Km';
        },
        calculateDistanceRaw(lat1, lon1, lat2, lon2) {
            if (lat1 === null || lon1 === null || lat2 === null || lon2 === null || lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
                return Infinity;
            }
            const R = 6371; // Radius of Earth in kilometers
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
    }
};
</script>

<style scoped>
#map {
    height: calc(100vh - 190px);
    width: 100%;
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