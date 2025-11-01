import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Api } from "@/services/service";
import LocationPicker from "@/Components/GetLocationButton";
import { useLocation } from "@/Components/context/LocationContext";

function ShippingAddress(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { setProfileLocation, location, source, fetchCurrentLocation } = useLocation();

  const [addressData, setAddressData] = useState({
    username: "",
    email: "",
    state: "",
    address: "",
    pincode: "",
    phone: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await Api("get", "getProfile", {}, router);
      if (response?.status) {
        setAddressData({
          ...response.data,
          username: response?.data?.username || "",
          address: response?.data?.address || "",
          pincode: response?.data?.pincode || "",
          phone: response?.data?.phone || "",
          city: response?.data?.city || "",
          country: response?.data?.country || "",
          email: response?.data?.email || "",
          state: response?.data?.state || "",
        });
      }
    } catch (error) {
      console.log("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {

    if (field === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return; // Limit to 10 digits
    }
    setAddressData({ ...addressData, [field]: value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // ✅ Validation for required fields
    const { username, phone, address } = addressData;
    if (!username || !phone || !address) {
      props.toaster({
        type: "error",
        message: "Please fill all required fields.",
      });
      return;
    }

    // ✅ Check phone format
    if (phone.length !== 10) {
      props.toaster({
        type: "error",
        message: "Phone number must be 10 digits.",
      });
      return;
    }

    const data = {
      ...addressData,
      location: JSON.stringify(addressData.location)
    }

    try {
      props.loader(true);
      const res = await Api("post", "updateProfile", data); 
      if (res?.status) {
        props.toaster({ type: "success", message: "Profile updated!" });
        fetchProfileData()
        setProfileLocation({
          long: addressData.location.coordinates[0],
          lat: addressData.location.coordinates[1],
          address: addressData.address
        })
      }
      else {
        props.toaster({ type: "error", message: res?.data?.message });
      }
    } catch (err) {
      props.toaster({ type: "error", message: err?.message });
    } finally {
      props.loader(false);
    }
  };

  useEffect(() => {
    const loadLocation = async () => {
      let loc = location;
      console.log(loc);
      if (!loc) {
        loc = await fetchCurrentLocation();
      }
    }



    loadLocation();
  }, [location]);
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
            SHIPPING ADDRESS
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-custom-black py-10 px-4">
        <div className="border bg-gray-700 border-gray-500 rounded px-5 sm:px-6 py-6 max-w-5xl mx-auto">
          <p className="text-center text-2xl md:text-3xl text-white mb-5">
            Shipping Address
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="text-white">Full Name</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="text"
                required
                placeholder="Name..."
                value={addressData.username}
                onChange={(e) =>
                  handleInputChange("username", e.target.value)
                }
              />
              {submitted && !addressData.username && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-white">Mobile Number</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="text"
                required
                placeholder="10-digit number"
                value={addressData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              {submitted && !addressData.phone && (
                <p className="text-red-500 text-sm mt-1">
                  Mobile number is required
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-white">Email</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="email"
                placeholder="demo@gmail.com"
                value={addressData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>

            {/* City */}
            <div>
              <label className="text-white">City</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="text"
                placeholder="City..."
                value={addressData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-white">Country</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="text"
                placeholder="Country..."
                value={addressData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="text-white">Zip Code</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="text"
                placeholder="000000"
                value={addressData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
              />
            </div>

            {/* State */}
            <div>
              <label className="text-white">State</label>
              <input
                className="w-full mt-2 px-3 py-2 rounded text-custom-black"
                type="text"
                placeholder="State..."
                value={addressData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
              />
            </div>

            {/* Address (with Location Picker) */}
            <div>
              <label className="text-white">Address</label>
              <LocationPicker
                createProject={addressData}
                setCreateProject={setAddressData}
              />
              {submitted && !addressData.address && (
                <p className="text-red-500 text-sm mt-1">Address is required</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={updateProfile}
            disabled={loading}
            className="bg-yellow-600 w-full text-white font-semibold rounded px-3 py-3 mt-8 hover:bg-yellow-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Update Shipping Address"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShippingAddress;
