import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ClintEnquery from "../clintEnquery";
import { Api } from "@/services/service";

function shippingAddress() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [addressData, setAddressData] = useState({
    username: '',
    email: '',
    state: '',
    address: '',
    pincode: '',
    phone: '',
    city: '',
    country: '',
    scheduleDate: ''
  });

  // Get product data from router query or props
  const productData = router.query;

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    setLoading(true);
    
    try {
      const response = await Api("get", "getProfile", {}, router);
      
      if (response?.status) {
        setAddressData({
          username: response?.data?.username || '',
          address: response?.data?.address || productData?.useradd || '',
          pincode: response?.data?.pincode || '',
          phone: response?.data?.phone || '',
          city: response?.data?.city || '',
          country: response?.data?.country || '',
          email: response?.data?.email || '',
          state: response?.data?.state || '',
          scheduleDate: ''
        });
      }
    } catch (error) {
      console.log("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setAddressData({
      ...addressData,
      [field]: value
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !addressData.username ||
      !addressData.address ||
      !addressData.pincode ||
      !addressData.phone ||
      !addressData.city ||
      !addressData.country ||
      !addressData.email ||
      !addressData.state ||
      !addressData.scheduleDate
    ) {
      setSubmitted(true);
      return;
    }

    if (!validateEmail(addressData.email.trim())) {
      // Show error toast for invalid email
      console.log("Invalid email");
      return;
    }

    setLoading(true);

    const orderData = {
      ...addressData,
      price: productData.price,
      product: productData.productid,
      productname: productData.productname,
      vendor: productData.posted_by,
      sheduledate: addressData.scheduleDate
    };

    // Add location if available
    if (productData?.location?.latitude && productData?.location?.longitude) {
      orderData.location = {
        type: 'Point',
        coordinates: [productData.location.longitude, productData.location.latitude],
      };
    }

    if (productData.description) {
      orderData.description = productData.description;
    }

    try {
      const response = await Api("post", "createOrder", orderData, router);
      
      if (response?.status) {
        setShowModal(true);
        setSubmitted(false);
        // Reset form
        setAddressData({
          username: '',
          address: '',
          pincode: '',
          phone: '',
          city: '',
          country: '',
          email: '',
          state: '',
          scheduleDate: ''
        });
      } else {
        console.log("Order creation failed:", response?.message);
      }
    } catch (error) {
      console.log("Order creation error:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push("/Order/cart");
  };

  return (
    <div>
      <div>
        <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              SHIPPING ADDRESS
            </p>
          </div>
        </div>
      </div>

      <div className="bg-custom-black py-10">
        <div className="border bg-gray-700 border-gray-500 rounded px-5 md:px-10 py-5 w-[90%] md:w-[50%] mx-auto">
          <div className="pt-5">
            <p className="text-center text-white mb-5">Shipping address</p>
            
            <label className="text-white">Full Name</label>
            <input
              className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
              type="text"
              required
              placeholder="Name...."
              value={addressData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
            {submitted && !addressData.username && (
              <p className="text-red-500 text-sm mb-3">Name is required</p>
            )}

            <label className="mt-3 text-white">Mobile Number</label>
            <input
              className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
              type="number"
              required
              placeholder="Mobile Number"
              value={addressData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {submitted && !addressData.phone && (
              <p className="text-red-500 text-sm mb-3">Mobile number is required</p>
            )}

            <label className="mt-3 text-white">Email</label>
            <input
              className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
              type="email"
              required
              placeholder="demo@gmail.com"
              value={addressData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {submitted && !addressData.email && (
              <p className="text-red-500 text-sm mb-3">Email is required</p>
            )}

            <label className="mt-3 text-white">Address</label>
            <input
              className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
              type="text"
              required
              placeholder="Address...."
              value={addressData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            {submitted && !addressData.address && (
              <p className="text-red-500 text-sm mb-3">Address is required</p>
            )}

            <label className="mt-3 text-white">City</label>
            <input
              className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
              type="text"
              required
              placeholder="City...."
              value={addressData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
            {submitted && !addressData.city && (
              <p className="text-red-500 text-sm mb-3">City is required</p>
            )}

            <label className="mt-3 text-white">Country</label>
            <input
              className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
              type="text"
              required
              placeholder="Country...."
              value={addressData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
            {submitted && !addressData.country && (
              <p className="text-red-500 text-sm mb-3">Country is required</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="mt-3 text-white">Zip Code</label>
                <input
                  className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
                  type="number"
                  required
                  placeholder="000000"
                  value={addressData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                />
                {submitted && !addressData.pincode && (
                  <p className="text-red-500 text-sm">Zip code is required</p>
                )}
              </div>
              <div>
                <label className="text-white">State</label>
                <input
                  className="w-full mt-3 mb-3 px-3 py-3 rounded text-custom-black"
                  type="text"
                  required
                  placeholder="State...."
                  value={addressData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                />
                {submitted && !addressData.state && (
                  <p className="text-red-500 text-sm">State is required</p>
                )}
              </div>
            </div>

            <div>
              <label className="mt-10 text-white">Schedule Delivery</label>
              <input
                className="w-full mt-3 mb-3 cursor-pointer px-3 py-3 rounded text-custom-black"
                type="date"
                required
                value={addressData.scheduleDate}
                onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
              />
              {submitted && !addressData.scheduleDate && (
                <p className="text-red-500 text-sm mb-3">Schedule date is required</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-yellow-600 mb-5 rounded text-white font-semibold w-full px-3 py-2 mt-8 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        </div>

        <ClintEnquery />
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <div className="text-center">
              <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your Order is Confirmed.
              </h2>
              <p className="text-gray-600 mb-6">
                Thanks for your Order
              </p>
              <button
                onClick={closeModal}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default shippingAddress;