import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";
import { useLocation } from "@/Components/context/LocationContext";
import { Api } from "@/services/service";

const libraries = ["places"];

function OrderConcrete(props) {
  const router = useRouter();
  const categoryId = router?.query?.category;
  const { location, fetchCurrentLocation } = useLocation();

  const [currentLocation, setCurrentLocation] = useState({ lat: "", lng: "" });
  const [shopsData, setShopsData] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [mixedDesign, setMixedDesign] = useState("");
  const [quantity, setQuantity] = useState("");
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);


  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);


  useEffect(() => {
    (async () => {
      let loc = location;
      if (!loc) loc = await fetchCurrentLocation();
      if (loc) {
        setCurrentLocation({ lat: loc.lat, lng: loc.lng });
        getNearbyShops(loc);
      }
    })();
  }, [location]);


  const getNearbyShops = async (loc) => {
    try {
      props.loader(true);
      const res = await Api("post", "shopsnearme", {
        location: [loc.lng, loc.lat],
        categoryId,
      });
      props.loader(false);

      if (res?.status && res?.data?.rides?.length > 0) {
        setShopsData(res.data.rides);
      } else {
        props.toaster({
          type: "info",
          message: "No shops found nearby for this category.",
        });
      }
    } catch (err) {
      props.loader(false);
      console.error("Error fetching shops:", err);
      props.toaster({
        type: "error",
        message: "Failed to fetch nearby shops.",
      });
    }
  };


  useEffect(() => {
    if (!mapRef.current || !window.google) return;
    const bounds = new window.google.maps.LatLngBounds();
    if (shopsData.length) {
      shopsData.forEach((shop) => {
        bounds.extend({
          lat: shop.location.coordinates[1],
          lng: shop.location.coordinates[0],
        });
      });
    }
    if (currentLocation.lat && currentLocation.lng) bounds.extend(currentLocation);
    if (!bounds.isEmpty()) mapRef.current.fitBounds(bounds);
  }, [shopsData, currentLocation]);


  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });

    if (window.google?.maps?.Geocoder) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          setSearchInput(results[0].formatted_address);
        }
      });
    }
  }, []);


  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setSelectedLocation({ lat, lng });
      setAddress(place.formatted_address || place.name);
      setSearchInput(place.formatted_address || place.name);
    }
  };


  const handleNextClick = () => {
    if (!selectedShop)
      return props.toaster({ type: "error", message: "Please select a shop first." });
    if (!selectedLocation || !address)
      return props.toaster({ type: "error", message: "Please select a valid delivery location." });
    if (!mixedDesign.trim())
      return props.toaster({ type: "warning", message: "Enter the mixed design." });
    if (!quantity.trim())
      return props.toaster({ type: "warning", message: "Enter the quantity." });

    const queryParams = new URLSearchParams({
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
      address,
      selectedShop: JSON.stringify(selectedShop),
      shopsData: JSON.stringify(shopsData),
      mixedDesign,
      quantity,
      currentLat: currentLocation.lat,
      currentLng: currentLocation.lng,
    });

    props.toaster({ type: "success", message: "Redirecting..." });
    setTimeout(() => {
      window.location.href = `/Order/orderCategory?${queryParams.toString()}`;
    }, 600);
  };

  const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  ];

  return (
    <div>
      {/* Header */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[50vh] md:h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-5xl text-white font-semibold">ORDER CONCRETE</p>
        </div>
      </div>

      <div className="bg-custom-black py-10">
        <div className="md:w-[80%] w-full mx-auto px-4">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
            libraries={libraries}
            onLoad={() => setIsLoaded(true)}
          >
            {isLoaded && (
              <GoogleMap
                onLoad={onMapLoad}
                onClick={onMapClick}
                mapContainerStyle={{
                  width: "100%",
                  height: "500px",
                  borderRadius: "12px",
                }}
                center={
                  currentLocation.lat
                    ? currentLocation
                    : { lat: 28.6139, lng: 77.209 }
                }
                zoom={12}
                options={{
                  styles: mapStyles,
                  zoomControl: true,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
              >
                {/* 🏪 Shops */}
                {shopsData.map((shop, i) => (
                  <Marker
                    key={i}
                    position={{
                      lat: shop.location.coordinates[1],
                      lng: shop.location.coordinates[0],
                    }}
                    onClick={() => {
                      setSelectedShop(shop);
                      setSelectedLocation({
                        lat: shop.location.coordinates[1],
                        lng: shop.location.coordinates[0],
                      });
                      setAddress(shop.address || "");
                      setSearchInput(shop.address || "");
                    }}
                    title={shop.shopname || "Shop"}
                  />
                ))}

                {/* 📍 Current Location */}
                {currentLocation.lat && (
                  <Marker
                    position={currentLocation}
                    title="My Current Location"
                    icon={{
                      url: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
                    }}
                  />
                )}
              </GoogleMap>
            )}
          </LoadScript>

          {selectedShop && (
            <div className="mt-4 p-4 bg-gray-600 rounded">
              <h3 className="text-white font-semibold">{selectedShop.shopname}</h3>
              <p className="text-gray-300 text-sm">{selectedShop.address}</p>
            </div>
          )}
        </div>

        <p className="my-10 text-center font-semibold text-3xl text-white">ORDER CONCRETE</p>
        <div className="border bg-gray-700 border-gray-500 rounded px-10 py-5 w-[90%] md:w-[600px] mx-auto">
          <input
            className="w-full mt-6 px-3 py-3 rounded text-black"
            placeholder="c15 / 20 OPC ( UP )"
            value={mixedDesign}
            onChange={(e) => setMixedDesign(e.target.value)}
          />
          <input
            className="w-full mt-6 px-3 py-3 rounded text-black"
            placeholder="Quantity (in cubic meters)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <div className="mt-6">
            <p className="text-white mb-3">Select Delivery Location</p>
            {isLoaded ? (
              <Autocomplete
                onLoad={(ac) => (autocompleteRef.current = ac)}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  className="w-full px-3 py-3 rounded text-black"
                  placeholder="Search or click on map"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </Autocomplete>
            ) : (
              <input
                className="w-full px-3 py-3 rounded text-black"
                placeholder="Loading..."
                disabled
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
          </div>

          <button
            onClick={handleNextClick}
            className="bg-yellow-600 mt-5 rounded text-white font-semibold w-full px-3 py-2 hover:bg-yellow-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConcrete;
