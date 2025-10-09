import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

// Add libraries for Google Maps API
const libraries = ['places'];

function orderConcrete() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const autocompleteRef = useRef(null);
  const [shopsData, setShopsData] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const mapRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMapInstance(map);
  }, []);



const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    console.log('Getting current location...');
    
    if (!navigator.geolocation) {
      console.log('Geolocation not supported');
      const fallbackLocation = { lat: 28.6139, lng: 77.2090 };
      setCurrentLocation(fallbackLocation);
      resolve(fallbackLocation);
      return;
    }

    const highAccuracyOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    const lowAccuracyOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000
    };

    // Try high accuracy first
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('High accuracy location:', location, 'Accuracy:', position.coords.accuracy + 'm');
        setCurrentLocation(location);
        
        if (mapInstance) {
          mapInstance.setCenter(location);
          mapInstance.setZoom(16);
        }
        resolve(location);
      },
      (error) => {
        console.log('High accuracy failed:', error.message, 'Trying low accuracy...');
        
        // Fallback to low accuracy
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log('Low accuracy location:', location, 'Accuracy:', position.coords.accuracy + 'm');
            setCurrentLocation(location);
            
            if (mapInstance) {
              mapInstance.setCenter(location);
              mapInstance.setZoom(14);
            }
            resolve(location);
          },
          (fallbackError) => {
            console.log('All location attempts failed:', fallbackError.message);
            // Use query params if available, otherwise default
            if (router.query.userLat && router.query.userLng) {
              const queryLocation = {
                lat: parseFloat(router.query.userLat),
                lng: parseFloat(router.query.userLng)
              };
              console.log('Using location from query:', queryLocation);
              setCurrentLocation(queryLocation);
              resolve(queryLocation);
            } else {
              const fallbackLocation = { lat: 28.6139, lng: 77.2090 };
              console.log('Using default location:', fallbackLocation);
              setCurrentLocation(fallbackLocation);
              resolve(fallbackLocation);
            }
            
            if (mapInstance) {
              mapInstance.setCenter(currentLocation || fallbackLocation);
              mapInstance.setZoom(12);
            }
          },
          lowAccuracyOptions
        );
      },
      highAccuracyOptions
    );
  });
};



useEffect(() => {
  if (isLoaded && mapInstance) {
    getCurrentLocation().catch(console.error);
  }
}, [isLoaded, mapInstance]);

  


useEffect(() => {
  if (mapInstance && window.google) {
    const bounds = new window.google.maps.LatLngBounds();
    let hasLocations = false;
    
    // Add all shop locations to bounds
    if (shopsData.length > 0) {
      shopsData.forEach(shop => {
        bounds.extend({
          lat: shop.location.coordinates[1],
          lng: shop.location.coordinates[0]
        });
      });
      hasLocations = true;
    }
    
    // Add current location to bounds
    if (currentLocation) {
      bounds.extend(currentLocation);
      hasLocations = true;
    }
    
    // Fit map to show all locations
    if (hasLocations) {
      mapInstance.fitBounds(bounds);
    }
  }
}, [shopsData, mapInstance, currentLocation]);

  // Map container style
  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px'
  };

  // Default center (Delhi, India)
  const center = {
    lat: 28.6139,
    lng: 77.2090
  };

  // Handle map click
const onMapClick = useCallback((event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  
  setSelectedLocation({
    lat: lat,
    lng: lng
  });

  // Only do reverse geocoding if Google Maps is fully loaded
  if (window.google && window.google.maps && window.google.maps.Geocoder) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: lat, lng: lng } },
      (results, status) => {
        if (status === 'OK' && results[0]) {
          setAddress(results[0].formatted_address);
          setSearchInput(results[0].formatted_address);
        }
      }
    );
  }
}, []);

useEffect(() => {
  const hasReloaded = sessionStorage.getItem('orderConcreteReloaded');
  
  if (!hasReloaded) {
    sessionStorage.setItem('orderConcreteReloaded', 'true');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}, []); // Empty dependency array - sirf ek bar run hoga

// Page leave hone par sessionStorage clear kar do (next visit ke liye)
useEffect(() => {
  // URL me reload parameter check karo
  const urlParams = new URLSearchParams(window.location.search);
  const hasReloaded = urlParams.get('reloaded');
  
  if (!hasReloaded) {
    // URL me reloaded=true add karke reload karo
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('reloaded', 'true');
    window.location.href = newUrl.toString();
  }
}, []);
  

 useEffect(() => {
  if (isLoaded && mapInstance) {
    getCurrentLocation().catch(console.error);
  }
}, [isLoaded, mapInstance]);

// Router query useEffect को update करें:
useEffect(() => {
  console.log('Router query in orderConcrete:', router.query);
  
  // Set shops data
  if (router.query.shopsData) {
    try {
      const shops = JSON.parse(router.query.shopsData);
      setShopsData(shops);
      console.log('Parsed shops data:', shops);
    } catch (error) {
      console.error('Error parsing shopsData:', error);
      setShopsData([]);
    }
  }
  
  // Set current location from query if available
  if (router.query.userLat && router.query.userLng && !currentLocation) {
    const queryLocation = {
      lat: parseFloat(router.query.userLat),
      lng: parseFloat(router.query.userLng)
    };
    console.log('Setting location from query params:', queryLocation);
    setCurrentLocation(queryLocation);
  }
}, [router.query]);

  // Handle LoadScript onLoad
  const handleScriptLoad = () => {
  console.log('Google Maps script loaded');
  setIsLoaded(true);
};

  // Handle place selection from autocomplete
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place && place.geometry) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        setSelectedLocation({
          lat: lat,
          lng: lng
        });
        
        setAddress(place.formatted_address || place.name);
        setSearchInput(place.formatted_address || place.name);
      }
    }
  };

  return (
    <div>
      <div>
        <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              ORDER CONCRETE
            </p>
          </div>
        </div>
      </div>

      <div className="bg-custom-black py-10">
        <div>
          <div className="md:w-[80%] w-full mx-auto">
          <LoadScript 
  googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
  libraries={libraries}
  onLoad={handleScriptLoad}
  onError={(error) => {
    console.error('Error loading Google Maps:', error);
    setIsLoaded(false);
  }}
  loadingElement={<div style={{height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#374151', borderRadius: '12px'}}>
    <p style={{color: 'white'}}>Loading Map...</p>
  </div>}
>
   {isLoaded && (
              <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{
                  width: '100%',
                  height: '500px',
                  borderRadius: '12px'
                }}
               center={currentLocation || (shopsData.length > 0 ? {
  lat: shopsData[0].location.coordinates[1],
  lng: shopsData[0].location.coordinates[0]
} : center)}
                zoom={shopsData.length > 0 ? 12 : 8}
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
                {shopsData && shopsData.map((shop, index) => (
                 <Marker
  key={index}
  position={{
    lat: shop.location.coordinates[1],
    lng: shop.location.coordinates[0]
  }}
 onClick={() => {
  setSelectedShop(shop);
  const shopLocation = {
    lat: shop.location.coordinates[1],
    lng: shop.location.coordinates[0]
  };
  setSelectedLocation(shopLocation);
  
  if (shop.address) {
    setAddress(shop.address);
    setSearchInput(shop.address);
  } else {
    // Only do reverse geocoding if Google Maps is fully loaded
    if (window.google && window.google.maps && window.google.maps.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode(
        { location: shopLocation },
        (results, status) => {
          if (status === 'OK' && results[0]) {
            setAddress(results[0].formatted_address);
            setSearchInput(results[0].formatted_address);
          }
        }
      );
    }
  }
}}
  icon={{
    url: 'data:image/svg+xml;base64,' + btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#ef4444" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 7h20l-2 10H4L2 7zM2 7l-1-4h3m0 0h16m-16 0V1a1 1 0 011-1h14a1 1 0 011 1v2M6 21a1 1 0 100-2 1 1 0 000 2zM20 21a1 1 0 100-2 1 1 0 000 2z"/>
        <path d="M7 8v4m5-4v4m5-4v4"/>
      </svg>
    `),
    scaledSize: { width: 40, height: 40 }
  }}
  title={shop.shopname || 'Shop'}
/>
                ))}



{currentLocation && (
  <Marker
    position={currentLocation}
    onClick={() => {
      setSelectedLocation(currentLocation);
      
      // Reverse geocoding for current location
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: currentLocation },
          (results, status) => {
            if (status === 'OK' && results[0]) {
              setAddress(results[0].formatted_address);
              setSearchInput(results[0].formatted_address);
            }
          }
        );
      }
    }}
    icon={{
      url: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="#3b82f6" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8"/>
          <circle cx="12" cy="12" r="3" fill="#ffffff"/>
          <path d="M12 1v6M12 17v6M23 12h-6M7 12H1"/>
        </svg>
      `),
      scaledSize: { width: 45, height: 45 },
      anchor: { x: 22.5, y: 22.5 }
    }}
    title="My Current Location"
  />
)}

                
              </GoogleMap>
   )}

  
              {selectedShop && (
                <div className="mt-4 p-4 bg-gray-600 rounded">
                  <h3 className="text-white font-semibold">{selectedShop.shopname || 'Selected Shop'}</h3>
                  <p className="text-gray-300 text-sm">{selectedShop.address || 'No address available'}</p>
                  <p className="text-yellow-400 text-sm">Click to select this shop for delivery</p>
                </div>
              )}
            </LoadScript>
          </div>
        </div>
        
        <p className="my-10 text-center font-semibold text-3xl text-white">ORDER CONCRETE</p>
        
        <div className="border bg-gray-700 border-gray-500 rounded px-10 py-5 w-[90%] md:w-[600px] mx-auto">
          <div className="pt-5">
            <p className="text-center text-white mb-4">Select Mixed Design/Strength</p>
            
            <input
              className="w-full mt-6 px-3 py-3 placeholder:text-gray-500 rounded text-black"
              type="text"
              required
              placeholder="c15 / 20 OPC ( UP )"
            />
            
            <input
              className="w-full mt-6 px-3 py-3 rounded text-black"
              type="text"
              required
              placeholder="Quantity (in cubic meters)"
            />

            {/* Enhanced Delivery Location Section */}
            <div className="mt-6">
              <p className="text-white mb-3">Select Delivery Location</p>
              
              {/* Search Input with Google Autocomplete */}
              {isLoaded ? (
                <Autocomplete
                  onLoad={(autocomplete) => {autocompleteRef.current = autocomplete}}
                  onPlaceChanged={onPlaceChanged}
                  options={{
                    componentRestrictions: { country: 'IN' },
                    fields: ['formatted_address', 'geometry', 'name'],
                    types: ['geocode']
                  }}
                >
                  <input
                    className="w-full px-3 py-3 rounded text-black"
                    type="text"
                    placeholder="🔍 Search for delivery location or click on map"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Autocomplete>
              ) : (
                <input
                  className="w-full px-3 py-3 rounded text-black"
                  type="text"
                  placeholder="Loading search... You can click on map"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              )}

              {address && (
                <div className="mt-3 p-3 bg-gray-600 rounded">
                  <p className="text-white text-sm">
                    <strong>Selected Address:</strong> {address}
                  </p>
                  {selectedLocation && (
                    <p className="text-gray-300 text-xs mt-1">
                      Coordinates: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
                    </p>
                  )}
                </div>
              )}

              <p className="text-gray-300 text-sm mt-2">
                Search for a location above or click on the map to select delivery location
              </p>
            </div>

            <button
            onClick={(e) => {
  e.preventDefault();
  e.stopPropagation();
                
                // Add form validation
                const mixedDesign = document.querySelector('input[placeholder*="c15"]').value;
                const quantity = document.querySelector('input[placeholder*="Quantity"]').value;
                
                if (!selectedShop) {
                  alert("Please select a shop from the map first");
                  return;
                }
                
                if (!selectedLocation || !address) {
                  alert("Please select a delivery location");
                  return;
                }
                
                if (!mixedDesign.trim()) {
                  alert("Please enter Mixed Design/Strength");
                  return;
                }
                
                if (!quantity.trim()) {
                  alert("Please enter Quantity");
                  return;
                }
                
                console.log('Navigating with data:', {
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                  address: address,
                  selectedShop: selectedShop,
                  shopsData: shopsData,
                  mixedDesign: mixedDesign,
                  quantity: quantity,
                  currentLocation: currentLocation
                });
                
                // Use window.location for more reliable navigation
    const queryParams = new URLSearchParams({
    lat: selectedLocation.lat.toString(),
    lng: selectedLocation.lng.toString(),
    address: address,
    selectedShop: JSON.stringify(selectedShop),
    shopsData: JSON.stringify(shopsData),
    mixedDesign: mixedDesign,
    quantity: quantity,
    
    ...(currentLocation && {
      currentLat: currentLocation.lat.toString(),
      currentLng: currentLocation.lng.toString()
    })
  });
  
  window.location.href = `/Order/orderCategory?${queryParams.toString()}`;
}}
              className="bg-yellow-600 mb-5 rounded text-white font-semibold w-full px-3 py-2 mt-5 hover:bg-yellow-700 transition-colors"
              type="button"
            >
              Next
            </button>

















          </div>
        </div>
      </div>
    </div>
  );
}

export default orderConcrete;