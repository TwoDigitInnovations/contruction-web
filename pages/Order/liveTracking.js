import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaIdBadge } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import { GoogleMap, LoadScript, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';

const libraries = ['places'];

function LiveTracking() {
  const router = useRouter();
  const { productId } = router.query;
  
  // Existing states
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shopLocationText, setShopLocationText] = useState("");
  const [clientLocationText, setClientLocationText] = useState("");
  
  // New map-related states
  const [shopLocation, setShopLocation] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [mapMode, setMapMode] = useState("shop");
  const [isLoaded, setIsLoaded] = useState(false);
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

  useEffect(() => {
    console.log("productId:", productId);
    if (productId) {
      getOrderById(productId);
    }
  }, [productId]);

  const getOrderById = (id) => {
    setLoading(true);
    Api("get", `getOrderById/${id}`, {}, router).then(
      (res) => {
        setLoading(false);
        console.log("Full response:", res);
        
        if (res?.status && res?.data) {
          setOrderDetail(res.data);
          
          // Set location texts from API response
          if (res.data.shop_location) {
            setShopLocationText(res.data.shop_location);
            // Try to geocode if it's an address
            geocodeAddress(res.data.shop_location, 'shop');
          }
          if (res.data.client_location) {
            setClientLocationText(res.data.client_location);
            // Try to geocode if it's an address
            geocodeAddress(res.data.client_location, 'client');
          }
        } else {
          console.error("Failed to fetch order detail:", res?.message || "No data received");
        }
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching order detail:", error);
      }
    );
  };

  // Geocode address to get coordinates
  const geocodeAddress = (address, type) => {
    if (window.google && window.google.maps && address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0] && results[0].geometry) {
          const location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          };
          
          if (type === 'shop') {
            setShopLocation(location);
          } else {
            setClientLocation(location);
          }
        }
      });
    }
  };

  // Calculate route between shop and client
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

  // Calculate route when both locations are available
  useEffect(() => {
    if (shopLocation && clientLocation && isLoaded) {
      calculateRoute();
    }
  }, [shopLocation, clientLocation, isLoaded, calculateRoute]);

  // Map load callback
  const onMapLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);

  // Handle LoadScript onLoad
  const handleScriptLoad = () => {
    setIsLoaded(true);
  };

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
        setShopLocationText(place.formatted_address || place.name);
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
        setClientLocationText(place.formatted_address || place.name);
      }
    }
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
              setShopLocationText(address);
            } else {
              setClientLocation(location);
              setClientLocationText(address);
            }
          }
        }
      );
    }
  }, [mapMode]);

  // Function to update tracking status
  const updateTrackingStatus = () => {
    if (!productId) return;
    
    setLoading(true);
    const updateData = {
      shop_location: shopLocationText,
      client_location: clientLocationText,
      status: "confirmed"
    };

    Api("put", `updateOrderTracking/${productId}`, updateData, router).then(
      (res) => {
        setLoading(false);
        if (res?.status) {
          console.log("Tracking updated successfully");
          router.push("/Order/profile");
        } else {
          console.error("Failed to update tracking:", res?.message);
        }
      },
      (error) => {
        setLoading(false);
        console.error("Error updating tracking:", error);
      }
    );
  };

  return (
    <div>
      <div>
        <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              Live Tracking
            </p>
          </div>
        </div>

        <div className="bg-custom-black py-10">
          {/* Google Map Section */}
          <div className="mb-10">
            <div className="md:w-[80%] w-full mx-auto">
              <LoadScript 
                googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
                libraries={libraries}
                onLoad={handleScriptLoad}
                loadingElement={
                  <div style={{
                    height: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: '#374151', 
                    borderRadius: '12px'
                  }}>
                    <p style={{color: 'white'}}>Loading Map...</p>
                  </div>
                }
              >
                <GoogleMap
                  onLoad={onMapLoad}
                  mapContainerStyle={{
                    width: '100%',
                    height: '400px',
                    borderRadius: '12px'
                  }}
                  center={shopLocation || clientLocation || center}
                  zoom={12}
                  onClick={onMapClick}
                  options={{
                    styles: [
                      {
                        "elementType": "geometry",
                        "stylers": [{"color": "#242f3e"}]
                      },
                      {
                        "elementType": "labels.text.fill",
                        "stylers": [{"color": "#746855"}]
                      },
                      {
                        "elementType": "labels.text.stroke",
                        "stylers": [{"color": "#242f3e"}]
                      },
                      {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{"color": "#38414e"}]
                      },
                      {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#17263c"}]
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

                  {/* Directions Renderer */}
                  {directionsResponse && (
                    <DirectionsRenderer 
                      directions={directionsResponse}
                      options={{
                        suppressMarkers: true,
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

            {/* Distance and Duration Display */}
            {distance && duration && (
              <div className="text-center mt-4">
                <div className="inline-flex gap-4 bg-gray-700 px-6 py-3 rounded-lg">
                  <span className="text-white">📍 Distance: <strong className="text-yellow-400">{distance}</strong></span>
                  <span className="text-white">⏱️ Duration: <strong className="text-yellow-400">{duration}</strong></span>
                </div>
              </div>
            )}
          </div>
          
          <p className="my-10 text-center font-semibold text-3xl">
            Live Tracking
          </p>
          
          <div className="border bg-gray-700 border-gray-500 rounded md:px-10 px-5 py-5 w-[90%] md:w-[450px] mx-auto">
            <div className="pt-3">
              {loading ? (
                <div className="text-center py-10">
                  <p className="text-white">Loading order details...</p>
                </div>
              ) : (
                <>
                  {/* Map Mode Selector */}
                  <div className="mb-4">
                    <p className="text-white mb-2">Select location to update:</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setMapMode("shop")}
                        className={`px-4 py-2 rounded text-sm font-medium ${
                          mapMode === "shop" 
                            ? "bg-green-600 text-white" 
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        🏪 Shop Location
                      </button>
                      <button
                        onClick={() => setMapMode("client")}
                        className={`px-4 py-2 rounded text-sm font-medium ${
                          mapMode === "client" 
                            ? "bg-red-600 text-white" 
                            : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        👤 Client Location
                      </button>
                    </div>
                    <p className="text-gray-300 text-xs mt-1">
                      {mapMode === "shop" ? "Click on map to update shop location" : "Click on map to update client location"}
                    </p>
                  </div>

                  {/* Location Status Display */}
                  <div className="mb-4 p-3 bg-gray-600 rounded">
                    <div className="text-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-white">Shop: {shopLocation ? '✓ Located' : '✗ Not Located'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-white">Client: {clientLocation ? '✓ Located' : '✗ Not Located'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Location Input Fields */}
                  {isLoaded ? (
                    <>
                      <div className="relative">
                        <IoLocationSharp className="absolute top-10 right-5 text-gray-500" />
                        <Autocomplete
                          onLoad={(autocomplete) => {shopAutocompleteRef.current = autocomplete}}
                          onPlaceChanged={onShopPlaceSelected}
                          options={{
                            componentRestrictions: { country: 'IN' },
                            fields: ['formatted_address', 'geometry', 'name']
                          }}
                        >
                          <input
                            className="md:w-full w-full mt-6 pl-3 py-3 pr-10 placeholder:text-black rounded text-custom-black"
                            type="text"
                            required
                            placeholder="🔍 Search or click map for shop location"
                            value={shopLocationText}
                            onChange={(e) => setShopLocationText(e.target.value)}
                          />
                        </Autocomplete>
                      </div>
                      
                      <div className="relative">
                        <IoLocationSharp className="absolute top-10 right-5 text-gray-500" />
                        <Autocomplete
                          onLoad={(autocomplete) => {clientAutocompleteRef.current = autocomplete}}
                          onPlaceChanged={onClientPlaceSelected}
                          options={{
                            componentRestrictions: { country: 'IN' },
                            fields: ['formatted_address', 'geometry', 'name']
                          }}
                        >
                          <input
                            className="w-full mt-6 px-3 py-3 pr-10 placeholder:text-custom-black rounded text-custom-black"
                            type="text"
                            required
                            placeholder="🔍 Search or click map for client location"
                            value={clientLocationText}
                            onChange={(e) => setClientLocationText(e.target.value)}
                          />
                        </Autocomplete>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative">
                        <IoLocationSharp className="absolute top-10 right-5 text-gray-500" />
                        <input
                          className="md:w-full w-full mt-6 pl-3 py-3 pr-10 placeholder:text-black rounded text-custom-black"
                          type="text"
                          required
                          placeholder="Loading search... You can click on map"
                          value={shopLocationText}
                          onChange={(e) => setShopLocationText(e.target.value)}
                        />
                      </div>
                      
                      <div className="relative">
                        <IoLocationSharp className="absolute top-10 right-5 text-gray-500" />
                        <input
                          className="w-full mt-6 px-3 py-3 pr-10 placeholder:text-custom-black rounded text-custom-black"
                          type="text"
                          required
                          placeholder="Loading search... You can click on map"
                          value={clientLocationText}
                          onChange={(e) => setClientLocationText(e.target.value)}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-center items-center my-5">
                    <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-white py-3 px-3 rounded-md w-full gap-3">
                      <div className="flex items-center gap-3">
                        <FaIdBadge className="text-4xl text-yellow-500" />
                        <div>
                          <p className="text-base text-custom-black">
                            {orderDetail?.name || orderDetail?.productname || "Concrete"}
                          </p>
                          <p className="text-sm text-custom-black py-1">
                            {orderDetail?.createdAt 
                              ? new Date(orderDetail.createdAt).toLocaleDateString('en-GB')
                              : "12-08-2024"
                            }
                          </p>
                          <p className="text-xs text-custom-black">
                            {orderDetail?.price || "12456"} $
                          </p>
                        </div>
                      </div>
                      <div className="flex-col md:flex-row md:ml-0 ml-0 md:justify-end md:items-center md:gap-5 mt-3 md:mt-0">
                        <p className="md:mr-5 text-center text-custom-black text-sm md:text-right">
                          QTY - {orderDetail?.quantity || "100"} kg
                        </p>
                        <button className="mt-2 md:mt-2 px-4 text-sm py-1 bg-yellow-600 text-white rounded-md">
                          {orderDetail?.status || "In progress"}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={updateTrackingStatus}
                    disabled={loading}
                    className="bg-yellow-600 mb-5 rounded text-white font-semibold w-full px-3 py-2 mt-5 disabled:opacity-50 hover:bg-yellow-700 transition-colors"
                  >
                    {loading ? "Updating..." : "Confirm"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTracking;