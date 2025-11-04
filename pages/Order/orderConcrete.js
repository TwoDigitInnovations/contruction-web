import React, { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useLocation } from "@/Components/context/LocationContext";
import { Api } from "@/services/service";
import ProductDetail from "@/Components/iteminfodetails";

const libraries = ["places"];

export default function OrderConcrete(props) {
  const router = useRouter();
  const categoryId = router?.query?.category;
  const { location, fetchCurrentLocation } = useLocation();
  const [productdetail, setProductDetail] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);
  const [shopsData, setShopsData] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [open, setOpen] = useState(false);
  const mapRef = useRef(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    setMapReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (location?.lat && location?.lng) {
        setCurrentLocation({ lat: location.lat, lng: location.lng });
        getNearbyShops(location);
      } else {
        props.toaster({ type: "error", message: "Unable to get location." });
      }
    }, 2000); // ⏱️ 2 second delay

    return () => clearTimeout(timer); // cleanup on unmount
  }, [location]);



  const getProduct = async () => {
    const data = {
      category: categoryId,
      posted_by: selectedShop?._id,
    };
    props.loader(true);

    try {
      const res = await Api("post", "getProductByVendorandCategory", data, router);
      props.loader(false);

      if (res.status && Array.isArray(res.data) && res.data.length > 0) {
        setProductDetail(res.data[0]);
        const firstWithValue = res.data[0]?.attributes?.find(
          (it) => it?.value
        );
        if (firstWithValue) setSelectedAttribute(firstWithValue);
      } else {
        props.toaster({ type: "error", message: "No product found" });
      }
    } catch (err) {
      props.loader(false);
      props.toaster({ type: "error", message: "Failed to fetch product" });
    }
  };

  const getNearbyShops = async (loc) => {
    try {
      props.loader(true);
      const res = await Api("post", "shopsnearme", {
        location: [loc.lng, loc.lat],
        categoryId,
      });
      props.loader(false);

      if (res?.status) {
        setShopsData(res.data);
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
    if (!mapReady || !mapRef.current || !shopsData.length || !currentLocation)
      return;

    const bounds = new window.google.maps.LatLngBounds();
    shopsData.forEach((shop) => {
      bounds.extend({
        lat: shop.location.coordinates[1],
        lng: shop.location.coordinates[0],
      });
    });
    bounds.extend(currentLocation);

    mapRef.current.fitBounds(bounds);
  }, [shopsData, currentLocation, mapReady]);

  const handleNextClick = () => {
    if (!selectedShop)
      return props.toaster({
        type: "error",
        message: "Please select a shop first.",
      });
    setOpen(true);

    if (selectedShop?._id && categoryId) {
      getProduct();
    }
  };

  const mapStyles = [
    { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
  ];

  return (
    <div>
      {/* Header Banner */}
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
            {currentLocation ? (
              <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{
                  width: "100%",
                  height: "600px",
                  borderRadius: "12px",
                }}
                center={currentLocation}
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
                      url:
                        selectedShop?._id === shop._id
                          ? "https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"
                          : "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png",
                      // scaledSize: new window.google.maps.Size(40, 40),
                    }}
                  />
                ))}

                {/* ✅ Current Location Marker */}
                <Marker
                  position={currentLocation}
                  title="Your Location"
                  icon={{
                    url: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              </GoogleMap>
            ) : (
              <div className="flex justify-center items-center h-[600px] text-gray-300">
                Loading map & location...
              </div>
            )}
          </LoadScript>

          {selectedShop && (
            <div className="mt-4 p-4 bg-gray-700 rounded-md">
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

        <ProductDetail
          open={open}
          selectedShop={selectedShop}
          setOpen={setOpen}
          setSelectedAttribute={setSelectedAttribute}
          selectedAttribute={selectedAttribute}
          productdetail={productdetail}
        />
      </div>
    </div>
  );
}
