import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useLocation } from "@/Components/context/LocationContext";
import { Api } from "@/services/service";
import ProductDetail from "@/Components/iteminfodetails";

const libraries = ["places"];

function OrderConcrete(props) {
  const router = useRouter();
  const categoryId = router?.query?.category;
  const { location, fetchCurrentLocation } = useLocation();
  const [currentLocation, setCurrentLocation] = useState({ lat: "", lng: "" });
  const [shopsData, setShopsData] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const mapRef = useRef(null);


  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);


  useEffect(() => {
    (async () => {
      let loc = location;
      if (!loc) loc = await fetchCurrentLocation();

      if (loc?.lat && loc?.lng) {
        await new Promise(r => setTimeout(r, 500));
        setCurrentLocation({ lat: loc.lat, lng: loc.lng });
        getNearbyShops(loc);
      }

    })();
  }, []);


  const getNearbyShops = async (loc) => {
    try {
      props.loader(true);
      const res = await Api("post", "shopsnearme", {
        location: [loc.lng, loc.lat],
        categoryId,
      });
      props.loader(false);

      if (res?.status && res?.data?.length > 0) {
        setShopsData(res.data);
        setIsLoaded(true);
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

    shopsData.forEach((shop) => {
      bounds.extend({
        lat: shop.location.coordinates[1],
        lng: shop.location.coordinates[0],
      });
    });
    if (currentLocation.lat && currentLocation.lng)
      bounds.extend(currentLocation);


    if (bounds.isEmpty()) return;
    mapRef.current.fitBounds(bounds);

  }, [shopsData, currentLocation]);


  const handleNextClick = () => {
    if (!selectedShop)
      return props.toaster({
        type: "error",
        message: "Please select a shop first.",
      });
    setOpen(true);
  };


  const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  ];

  if (typeof window === "undefined") return null;

  return (
    <div>

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
          >
            {isLoaded && (
              <GoogleMap
                onLoad={onMapLoad}
                onError={(e) => console.error("Map failed to load:", e)}
                mapContainerStyle={{
                  width: "100%",
                  height: "600px",
                  borderRadius: "12px",
                }}
                center={
                  currentLocation.lat
                    ? currentLocation
                    : { lat: 26.047822, lng: 82.086527 }
                }
                zoom={12}
                options={{
                  styles: mapStyles,
                  zoomControl: true,
                  streetViewControl: false,
                  fullscreenControl: true,
                }}
              >

                {shopsData.map((shop, i) => (
                  <Marker
                    key={i}
                    position={{
                      lat: shop.location.coordinates[1],
                      lng: shop.location.coordinates[0],
                    }}
                    onClick={() => setSelectedShop(shop)}
                    title={shop.shop_name}
                    icon={{
                      url: "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
                      animation: window.google.maps.Animation.DROP,
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}

                  />
                ))}


                {currentLocation.lat && (
                  <Marker
                    position={currentLocation}
                    title="Current Location"
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
              <h3 className="text-white font-semibold">{selectedShop.shop_name}</h3>
              <p className="text-gray-300 text-sm">{selectedShop.address}</p>
            </div>
          )}
        </div>


        <div className="mt-10 text-center">
          <button
            onClick={handleNextClick}
            className="bg-yellow-600 mt-5 rounded text-white font-semibold w-[90%] md:w-[600px] px-3 py-2 hover:bg-yellow-700"
          >
            Next
          </button>
        </div>

        {/* Product Detail Popup */}
        <ProductDetail
          selectedShop={selectedShop}
          categotyid={categoryId}
          loader={props.loader}
          toaster={props.toaster}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
}

export default OrderConcrete;
