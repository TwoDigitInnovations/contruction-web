import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker, Autocomplete, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';


const libraries = ['places'];

function orderCategory() {
  const router = useRouter();
  const [shopLocation, setShopLocation] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [shopAddress, setShopAddress] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [mapMode, setMapMode] = useState("shop");
  const [isLoaded, setIsLoaded] = useState(false);
  const [shopsData, setShopsData] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");


  // Autocomplete refs
  const shopAutocompleteRef = useRef(null);
  const clientAutocompleteRef = useRef(null);

  // Default center (Delhi, India)
  const center = {
    lat: 28.6139,
    lng: 77.2090
  };

  // Map load callback
  const onMapLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);





  const calculateRoute = useCallback(async () => {
    if (!shopLocation || !clientLocation || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    try {
      const results = await directionsService.route({
        origin: shopLocation,
        destination: clientLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  }, [shopLocation, clientLocation]);

  // 4. useEffect add karo route calculate karne ke liye
  useEffect(() => {
    if (shopLocation && clientLocation && isLoaded) {
      calculateRoute();
    }
  }, [shopLocation, clientLocation, isLoaded, calculateRoute]);





  // Handle shop autocomplete place selection
  const onShopPlaceSelected = () => {
    if (shopAutocompleteRef.current) {
      const place = shopAutocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setShopLocation(location);
        setShopAddress(place.formatted_address || place.name);
      }
    }
  };

  // Handle client autocomplete place selection
  const onClientPlaceSelected = () => {
    if (clientAutocompleteRef.current) {
      const place = clientAutocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setClientLocation(location);
        setClientAddress(place.formatted_address || place.name);
      }
    }
  };

  useEffect(() => {
    console.log('Router query received:', router.query);

    // Set shops data
    if (router.query.shopsData) {
      try {
        const shops = JSON.parse(router.query.shopsData);
        setShopsData(shops);
        console.log('Received shops data:', shops);
      } catch (error) {
        console.error('Error parsing shops data:', error);
      }
    }

    if (router.query.selectedShop) {
      try {
        const shop = JSON.parse(router.query.selectedShop);
        setSelectedShop(shop);

        const shopLoc = {
          lat: shop.location.coordinates[1], // latitude
          lng: shop.location.coordinates[0]  // longitude
        };
        setShopLocation(shopLoc);
        setShopAddress(shop.shop_address || shop.shop_name || 'Selected Shop');
        console.log('Shop location auto-populated:', shopLoc);
      } catch (error) {
        console.error('Error parsing selected shop:', error);
      }
    }


    // Auto-populate client location from delivery location (jo user ne select kiya tha)
    if (router.query.lat && router.query.lng && router.query.address) {
      const clientLoc = {
        lat: parseFloat(router.query.lat),
        lng: parseFloat(router.query.lng)
      };
      setClientLocation(clientLoc);
      setClientAddress(decodeURIComponent(router.query.address));
      console.log('Client location auto-populated:', clientLoc);
      console.log('Client address auto-populated:', decodeURIComponent(router.query.address));
    }
    // CURRENT LOCATION के लिए अगर client location set नहीं है तो current location use करो
    else if (router.query.currentLat && router.query.currentLng) {
      const currentLoc = {
        lat: parseFloat(router.query.currentLat),
        lng: parseFloat(router.query.currentLng)
      };
      setClientLocation(currentLoc);
      console.log('Current location auto-populated as client location:', currentLoc);
    }

  }, [router.query]);

  // Handle LoadScript onLoad
  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

  // Handle map click
  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    const location = { lat: lat, lng: lng };

    // Reverse geocoding to get address
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: location },
        (results, status) => {
          if (status === 'OK' && results[0]) {
            const address = results[0].formatted_address;

            if (mapMode === "shop") {
              setShopLocation(location);
              setShopAddress(address);
            } else {
              setClientLocation(location);
              setClientAddress(address);
            }
          }
        }
      );
    }
  }, [mapMode]);

  useEffect(() => {

    if (router.query.currentLat && router.query.currentLng && !clientLocation) {
      const currentLoc = {
        lat: parseFloat(router.query.currentLat),
        lng: parseFloat(router.query.currentLng)
      };
      setClientLocation(currentLoc);
      console.log('Current location set as client location:', currentLoc);

      if (isLoaded && window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: currentLoc },
          (results, status) => {
            if (status === 'OK' && results[0]) {
              setClientAddress(results[0].formatted_address);
              console.log('Current location address set:', results[0].formatted_address);
            }
          }
        );
      }
    }
  }, [router.query, isLoaded, clientLocation]);

  return (
    <div>
      <div>
        <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              ORDER CATEGORY
            </p>
          </div>
        </div>
      </div>

      <div className="bg-custom-black py-10">
        <p className="text-center text-3xl font-semibold pb-10 text-white">Selected Shop</p>

        <div>
          <div className="md:w-[80%] w-full mx-auto">
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
              libraries={libraries}
              onLoad={handleScriptLoad}
              loadingElement={<div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#374151', borderRadius: '12px' }}>
                <p style={{ color: 'white' }}>Loading Map...</p>
              </div>}
            >
              <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{
                  width: '100%',
                  height: '500px',
                  borderRadius: '12px'
                }}
                center={shopLocation || clientLocation || center}
                zoom={12}
                onClick={onMapClick}
                options={{
                  styles: [
                    {
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#242f3e"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#746855"
                        }
                      ]
                    },
                    {
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#242f3e"
                        }
                      ]
                    },
                    {
                      "featureType": "administrative.locality",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#d59563"
                        }
                      ]
                    },
                    {
                      "featureType": "poi",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#d59563"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#263c3f"
                        }
                      ]
                    },
                    {
                      "featureType": "poi.park",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#6b9a76"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#38414e"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "geometry.stroke",
                      "stylers": [
                        {
                          "color": "#212a37"
                        }
                      ]
                    },
                    {
                      "featureType": "road",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#9ca5b3"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#746855"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "geometry.stroke",
                      "stylers": [
                        {
                          "color": "#1f2835"
                        }
                      ]
                    },
                    {
                      "featureType": "road.highway",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#f3d19c"
                        }
                      ]
                    },
                    {
                      "featureType": "transit",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#2f3948"
                        }
                      ]
                    },
                    {
                      "featureType": "transit.station",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#d59563"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "geometry",
                      "stylers": [
                        {
                          "color": "#17263c"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "labels.text.fill",
                      "stylers": [
                        {
                          "color": "#515c6d"
                        }
                      ]
                    },
                    {
                      "featureType": "water",
                      "elementType": "labels.text.stroke",
                      "stylers": [
                        {
                          "color": "#17263c"
                        }
                      ]
                    }
                  ],
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: false,
                  fullscreenControl: true
                }}
              >
                {/* Shop Marker (Green) */}
                {shopLocation && (
                  <Marker
                    position={shopLocation}
                    icon={{
                      url: 'data:image/svg+xml;base64,' + btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#10b981" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      `),
                      scaledSize: { width: 40, height: 40 }
                    }}
                    title="Shop Location"
                  />
                )}

                {/* Client Marker (Red) */}
                {clientLocation && (
                  <Marker
                    position={clientLocation}
                    icon={{
                      url: 'data:image/svg+xml;base64,' + btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#e11d48" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      `),
                      scaledSize: { width: 40, height: 40 }
                    }}
                    title="Client Location"
                  />
                )}




                {directionsResponse && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                      suppressMarkers: true, // Custom markers use kar rahe hain
                      polylineOptions: {
                        strokeColor: '#3B82F6',
                        strokeWeight: 4,
                        strokeOpacity: 0.8
                      }
                    }}
                  />
                )}


              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        <p className="my-10 text-center font-semibold text-3xl text-white">
          ORDER CATEGORY
        </p>

        <div className="border bg-gray-700 border-gray-500 rounded md:px-10 px-5 py-5 w-[90%] md:w-[450px] mx-auto">
          <div className="pt-3">
            {/* Map Mode Selector */}
            <div className="mb-4">
              <p className="text-white mb-2">Select location mode:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setMapMode("shop")}
                  className={`px-4 py-2 rounded text-sm font-medium ${mapMode === "shop"
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300"
                    }`}
                >
                  🏪 Shop Location
                </button>
                <button
                  onClick={() => setMapMode("client")}
                  className={`px-4 py-2 rounded text-sm font-medium ${mapMode === "client"
                      ? "bg-red-600 text-white"
                      : "bg-gray-600 text-gray-300"
                    }`}
                >
                  👤 Client Location
                </button>
              </div>
              <p className="text-gray-300 text-xs mt-1">
                {mapMode === "shop" ? "Click on map to select shop location (Green marker)" : "Click on map to select client location (Red marker)"}
              </p>
            </div>

            {/* Location Status Display */}
            <div className="mb-4 p-3 bg-gray-600 rounded">
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white">Shop: {shopLocation ? '✓ Selected' : '✗ Not Selected'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white">Client: {clientLocation ? '✓ Selected' : '✗ Not Selected'}</span>
                </div>
              </div>
            </div>

            {isLoaded ? (
              <>
                <Autocomplete
                  onLoad={(autocomplete) => { shopAutocompleteRef.current = autocomplete }}
                  onPlaceChanged={onShopPlaceSelected}
                  options={{
                    componentRestrictions: { country: 'IN' },
                    fields: ['formatted_address', 'geometry', 'name']
                  }}
                >
                  <input
                    className="md:w-full w-full mt-6 px-3 py-3 placeholder:text-gray-500 rounded text-black"
                    type="text"
                    required
                    placeholder="🔍 Search or click map for shop location"
                    value={shopAddress}
                    onChange={(e) => setShopAddress(e.target.value)}
                  />
                </Autocomplete>

                <Autocomplete
                  onLoad={(autocomplete) => { clientAutocompleteRef.current = autocomplete }}
                  onPlaceChanged={onClientPlaceSelected}
                  options={{
                    componentRestrictions: { country: 'IN' },
                    fields: ['formatted_address', 'geometry', 'name']
                  }}
                >
                  <input
                    className="w-full mt-6 px-3 py-3 placeholder:text-gray-500 rounded text-black"
                    type="text"
                    required
                    placeholder="🔍 Search or click map for client location"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </Autocomplete>
              </>
            ) : (
              <>
                <input
                  className="md:w-full w-full mt-6 px-3 py-3 placeholder:text-gray-500 rounded text-black"
                  type="text"
                  required
                  placeholder="Loading search... You can click on map"
                  value={shopAddress}
                  onChange={(e) => setShopAddress(e.target.value)}
                />

                <input
                  className="w-full mt-6 px-3 py-3 placeholder:text-gray-500 rounded text-black"
                  type="text"
                  required
                  placeholder="Loading search... You can click on map"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
              </>
            )}

            <textarea
              className="w-full mt-6 px-3 py-3 placeholder:text-gray-500 rounded text-black resize-none"
              rows="4"
              required
              placeholder="Description"
            />

            <button
              onClick={() => {
                if (shopLocation && clientLocation) {
                  router.push({
                    pathname: "/Order/shippingAddress",
                    query: {
                      ...router.query, // Pass all existing query parameters
                      shopLat: shopLocation.lat,
                      shopLng: shopLocation.lng,
                      shopAddress: shopAddress,
                      clientLat: clientLocation.lat,
                      clientLng: clientLocation.lng,
                      clientAddress: clientAddress
                    }
                  });
                } else {
                  alert("Please select both shop and client locations on the map");
                }
              }}
              className="bg-yellow-600 mb-5 rounded text-white font-semibold w-full px-3 py-2 mt-5 hover:bg-yellow-700 transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default orderCategory;