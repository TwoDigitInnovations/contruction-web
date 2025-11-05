import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { useLocation } from "@/Components/context/LocationContext";
import { Api } from "@/services/service";
import { MdDateRange } from "react-icons/md";
import Checkout from "@/Components/Checkout";

const libraries = ["places"];

export default function OrderCategory(props) {
  const router = useRouter();
  const { location } = useLocation();
  const [shopLocation, setShopLocation] = useState(null);
  const [clientLocation, setClientLocation] = useState(null);
  const [distanceValue, setDistanceValue] = useState(0);
  const [shopAddress, setShopAddress] = useState("");
  const [attribute, setAttribute] = useState("")
  const [clientAddress, setClientAddress] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShop, setSelectedShop] = useState(null);
  const [checkoutVisible, setCheckoutVisible] = useState(false)
  const [orderStatus, setOrderStatus] = useState({
    show: false,
    success: false,
    message: "",
  });

  const [summary, setSummary] = useState({
    total: 0,
    taxRate: 0,
    taxAmount: 0,
    deliveryCharge: 0,
    final: 0,
    value: 0

  });
  const [setting, setSetting] = useState({});

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
    getSettings();
  }, [])

  const getSettings = async () => {
    props.loader(true);
    Api("get", "getSetting", "", router)
      .then((res) => {
        props.loader(false);
        if (res?.data) {
          setSetting({
            TaxRate: res.data?.TaxRate || "",
            RatePerKM: res.data?.RatePerKM || "",
          });
        }
      })
      .catch((err) => {
        props.loader(false);
        props.toaster({ type: "error", message: err?.message });
      });
  };

  useEffect(() => {

    const storedAttribute = localStorage.getItem("selectedAttribute");
    const storedInput = localStorage.getItem("input");

    if (storedAttribute && storedInput) {
      const selectedAttribute = JSON.parse(storedAttribute);
      const valueInput = parseFloat(storedInput);

      setAttribute(selectedAttribute);

      if (!setting || !distanceValue) return;

      const taxRate = Number(setting?.TaxRate) || 0;
      const ratePerKM = Number(setting?.RatePerKM) || 0;

      if (selectedAttribute?.price) {
        const distance = Number(distanceValue) || 0;
        const total = valueInput * parseFloat(selectedAttribute.price);

        const taxAmount = (total * taxRate) / 100;
        const deliveryCharge = distance * ratePerKM;

        const final = total + taxAmount + deliveryCharge;

        setSummary({
          total,
          taxRate,
          taxAmount,
          deliveryCharge,
          final,
          value: valueInput,
        });
      }

    }
  }, [setting, distanceValue]);


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
        .then((result) => {
          setDirectionsResponse(result)
          const distanceInMeters = result.routes[0].legs[0].distance.value;
          setDistanceValue(distanceInMeters / 1000);
        })
        .catch((err) => console.log("Route error:", err));
    }
  }, [shopLocation, clientLocation]);

  const handleScriptLoad = () => setIsLoaded(true);

  const handleConfirm = () => {
    if (!shopLocation || !clientLocation) {
      return props.toaster({ type: "error", message: "Please ensure both shop and client locations are loaded" });
    }
    if (!attribute) {
      return props.toaster({ type: "error", message: "Please ensure Attribute is selected" });
    }
    setCheckoutVisible(true);
  };

  const orderPlace = async () => {
    try {
      props.loader(true);

      const Location = {
        type: "Point",
        coordinates: [clientLocation.lng, clientLocation.lat],
      }
      const data = {
        price: summary?.final?.toFixed(0),
        product: router.query.productid,
        productname: router.query.productName,
        vendor: router.query.shopid,
        location: Location,
        address: clientAddress,
        selectedAtribute: attribute,
      };

      if (summary?.value) data.inputvalue = summary?.value
      if (selectedDate) data.sheduledate = selectedDate
      if (description) data.description = description

      const res = await Api("post", "createOrder", data, {});

      if (res?.status) {
        localStorage.removeItem("selectedAttribute");
        localStorage.removeItem("input");
        props.loader(false);
        setCheckoutVisible(false)
        setOrderStatus({
          show: true,
          success: true,
          message: "Your order has been placed successfully!",
        });
      } else {
        setOrderStatus({
          show: true,
          success: false,
          message: "Order failed! Please try again.",
        });
      }


    } catch (err) {
      console.error("Order creation failed:", err);
      props.toaster({ type: "error", message: res?.message || "Order placed failed!" })
      props.loader(false);
    }
  };



  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[60vh]">
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center">
          <p className="text-white font-semibold text-4xl md:text-6xl">
            ORDER CATEGORY
          </p>
        </div>
      </div>


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

                <Marker
                  position={shopLocation}
                  icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                />

                <Marker
                  position={clientLocation}
                  icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
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

        <Checkout
          open={checkoutVisible}
          onClose={() => setCheckoutVisible(false)}
          selectedAttribute={attribute}
          location={clientAddress}
          summary={summary}
          onPlaceOrder={orderPlace}
        />

        {orderStatus.show && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] md:w-[400px] text-center animate-fadeIn">
              {/* Icon */}
              <div className="flex justify-center mb-3">
                {orderStatus.success ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>

              {/* Title */}
              <h2 className={`text-2xl font-semibold ${orderStatus.success ? "text-green-600" : "text-red-600"}`}>
                {orderStatus.success ? "Order Successful!" : "Order Failed"}
              </h2>

              {/* Message */}
              <p className="text-gray-700 mt-2 mb-5">{orderStatus.message}</p>

              {/* OK Button */}
              <button
                onClick={() => {
                  router.push("/Order/myOrder");
                  setOrderStatus({ ...orderStatus, show: false })
                }}
                className={`px-10 py-2.5 rounded-lg text-white font-medium ${orderStatus.success ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  } transition`}
              >
                OK
              </button>
            </div>
          </div>
        )}



      </div>
    </div>
  );
}
