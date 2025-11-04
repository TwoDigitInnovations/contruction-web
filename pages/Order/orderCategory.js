import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useLocation } from "@/Components/context/LocationContext";
import { Api } from "@/services/service";
import { MdDateRange } from "react-icons/md";

const libraries = ["places"];

export default function OrderCategory(props) {
  const router = useRouter();
  const { location } = useLocation();
  const [shopLocation, setShopLocation] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [shopAddress, setShopAddress] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);

  console.log(location);

  useEffect(() => {
    if (router.query.shopid) {
      Api("get", `getVendorById/${router.query.shopid}`, "", router)
        .then((res) => {
          if (res?.status && res?.data?.location) {
            const shop = res.data;
            setSelectedShop(shop);
            setShopLocation({
              lat: shop.location.coordinates[1],
              lng: shop.location.coordinates[0],
            });
            setShopAddress(shop.address);
          }
        })
        .catch((err) => console.error("Shop fetch error:", err));
    }
  }, [router.query.shopid]);


  useEffect(() => {
    if (location?.lat && location?.lng) {
      setClientLocation({ lat: location.lat, lng: location.lng });

      if (window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === "OK" && results[0]) {
            setClientAddress(results[0].formatted_address);
          }
        });
      }
    }
  }, [location]);


  useEffect(() => {
    if (shopLocation && clientLocation && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService
        .route({
          origin: shopLocation,
          destination: clientLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        })
        .then((result) => setDirectionsResponse(result))
        .catch((err) => console.log("Route error:", err));
    }
  }, [shopLocation, clientLocation]);

  const handleScriptLoad = () => setIsLoaded(true);

  const handleConfirm = () => {
    const { selectedAttribute, inputValue } = router.query;

    if (!shopLocation || !clientLocation) {
      return alert("Please ensure both shop and client locations are loaded");
    }

    console.log("data", shopLocation, clientLocation, selectedShop, shopAddress, clientAddress, inputValue, selectedAttribute, selectedDate);


    // router.push({
    //   pathname: "/Order/cart",
    //   query: {
    //     shopid: selectedShop?._id,
    //     shopAddress,
    //     shopLat: shopLocation.lat,
    //     shopLng: shopLocation.lng,
    //     clientAddress,
    //     clientLat: clientLocation.lat,
    //     clientLng: clientLocation.lng,
    //     selectedAttribute,
    //     inputValue,
    //     description,
    //     selectedDate: selectedDate || "",
    //   },
    // });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[60vh]">
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center">
          <p className="text-white font-semibold text-4xl md:text-6xl">
            ORDER CATEGORY
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-custom-black py-10">
        <div className="text-center text-3xl font-semibold pb-8 text-white">
          Selected Shop
        </div>

        {shopLocation && clientLocation ? (
          <div className="md:w-[80%] w-[95%] mx-auto mb-10 rounded-xl overflow-hidden shadow-lg">
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
              libraries={libraries}
              onLoad={handleScriptLoad}
            >
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "500px" }}
                center={shopLocation}
                zoom={12}
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  styles: [{ elementType: "geometry", stylers: [{ color: "#1e293b" }] }],
                }}
              >
                {/* Shop Marker */}
                <Marker
                  position={shopLocation}
                  icon={{
                    url: "data:image/svg+xml;base64," + btoa(`
                      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='#10b981' stroke='#fff' stroke-width='2'>
                        <path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0Z'/>
                        <circle cx='12' cy='10' r='3'/>
                      </svg>`),
                  }}
                />
                {/* Client Marker */}
                <Marker
                  position={clientLocation}
                  icon={{
                    url: "data:image/svg+xml;base64," + btoa(`
                      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='#ef4444' stroke='#fff' stroke-width='2'>
                        <path d='M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0116 0Z'/>
                        <circle cx='12' cy='10' r='3'/>
                      </svg>`),
                  }}
                />
                {directionsResponse && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: { strokeColor: "#3b82f6", strokeWeight: 4 },
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading locations...</p>
        )}


        <div className="border bg-[#22272B] border-gray-700 rounded-2xl shadow-xl md:px-5 px-3 py-4 w-[95%] md:w-[450px] mx-auto space-y-5">

          <div>
            <label className="text-white text-lg font-medium block mb-2">Shop Location</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              value={shopAddress}
              readOnly
              placeholder="Shop Address"
            />
          </div>

          <div>
            <label className="text-white text-lg font-medium block mb-2">Delivery Location</label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
              value={clientAddress}
              readOnly
              placeholder="Delivery Location"
            />
          </div>

          <div>
            <label className="text-white text-lg font-medium block mb-2">Description</label>
            <textarea
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all resize-none"
              rows="4"
              placeholder="Add description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="text-white text-lg font-medium block mb-2">Schedule Delivery</label>
            <div className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 hover:ring-2 hover:ring-yellow-500 cursor-pointer transition-all">
              <input
                type="date"
                className="bg-transparent text-yellow-400 outline-none cursor-pointer w-full"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <MdDateRange className="text-yellow-400 text-2xl ml-2" />
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="bg-yellow-600 hover:bg-yellow-700 w-full py-3 mt-2 rounded-lg text-white font-semibold text-lg transition-all"
          >
            Confirm Order
          </button>
        </div>

      </div>
    </div>
  );
}
