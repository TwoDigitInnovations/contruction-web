import React, { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegUser, FaRegIdBadge } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import ClintEnquery from "../clintEnquery";
import UpdatePasswordModal from "@/Components/UpdatePassword";
import { FaShippingFast } from "react-icons/fa";

const Profile = ({ toaster, loader }) => {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
    type: "",
    verified: "",
  });

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await Api("get", "getProfile");
      if (res?.status) {
        const data = res.data;
        setProfile({
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          type: data.type || "",
          verified: data.verified || "",
        });
      } else toaster({ type: "error", message: res?.data?.message });
    } catch (err) {
      toaster({ type: "error", message: "Error loading profile" });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await Api("post", "updateProfile", profile);
      if (res?.status) toaster({ type: "success", message: "Profile updated!" });
      else toaster({ type: "error", message: res?.data?.message });
    } catch (err) {
      toaster({ type: "error", message: err?.message });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);



  return (
    <div className="bg-custom-black min-h-screen ">
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold text-4xl sf-heading md:text-5xl lg:text-6xl text-white">
            Profile
          </p>
        </div>
      </div>
      <div className="py-10">
        <div className="max-w-7xl mx-auto md:px-0 px-3 flex flex-col md:flex-row gap-10 items-start">
          {/* Left Profile Card */}
          <div className="w-full md:w-2/5">
            <div className="bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
              <img
                src="/Image/dp.png"
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full border-2 border-yellow-500 object-cover"
              />
              <div className="flex justify-center items-center gap-2 mt-4"
                onClick={() => router.push("/Order/shippingAddress")}
              >
                <p className="text-white font-semibold">{profile.username}</p>
                <MdOutlineEdit className="text-white cursor-pointer" />
              </div>
              <p className="text-gray-300 text-sm">{profile.email}</p>
              <p className="text-gray-400 text-sm">{profile.phone}</p>

              <div className="flex justify-center gap-2 mt-3">
                {profile.type && (
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                    {profile.type}
                  </span>
                )}
                {profile.verified && (
                  <span className="bg-yellow-600 text-white text-xs px-3 py-1 rounded-full">
                    {profile.verified}
                  </span>
                )}
              </div>

              {/* My Account */}
              <div className="bg-yellow-600 rounded-lg p-3 mt-5 cursor-pointer flex items-center justify-between"
                onClick={() => router.push("/Order/shippingAddress")}
              >
                <div className="flex items-center gap-3 text-black">
                  <span className="bg-white/40 p-2 rounded-full">
                    <FaRegUser />
                  </span>
                  <div>
                    <p className="font-semibold">My Account</p>
                    <p className="text-sm text-white">Manage your account</p>
                  </div>
                </div>
                <FaAngleRight />
              </div>
              <div className="bg-white rounded-lg p-3 mt-3 flex items-center justify-between cursor-pointer"
                onClick={() => router.push("/Order/shippingAddress")}
              >
                <div className="flex items-center gap-3 text-black">
                  <span className="bg-white/40 p-2 rounded-full">
                    <FaShippingFast />
                  </span>
                  <div>
                    <p className="font-semibold">Add Shipping Address</p>
                    <p className="text-sm text-gray-400">Manage your address</p>
                  </div>
                </div>
                <FaAngleRight className="text-gray-400" />
              </div>

              {/* My Orders */}
              <div className="bg-white rounded-lg p-3 mt-3 flex items-center justify-between cursor-pointer"
                onClick={() => router.push("/Order/myOrder")}>
                <div className="flex justify-start items-start gap-3"

                >
                  <span className="bg-gray-200 p-2 rounded-full text-black">
                    <FaRegIdBadge />
                  </span>
                  <div>
                    <p className="font-semibold text-black">My Orders</p>
                    <p className="text-sm text-gray-400">Check your orders</p>
                  </div>
                </div>
                <FaAngleRight className="text-gray-400" />
              </div>


            </div>
          </div>

          
          <div className="w-full md:w-3/5 bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">
              Update Profile Information
            </h2>
            <form onSubmit={updateProfile} className="space-y-4 md:space-y-6">
              <div>
                <label className="text-gray-300 text-sm">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={(e) =>
                    setProfile({ ...profile, username: e.target.value })
                  }
                  className="w-full px-4 py-3 mt-2 rounded-md bg-gray-100 text-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full px-4 py-3 mt-2 rounded-md bg-gray-100 text-black outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-gray-300 text-sm">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 mt-2 rounded-md bg-gray-100 text-black outline-none"
                />
              </div>

              <div className="flex gap-4 pt-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-yellow-600 text-white font-semibold py-3 rounded-md hover:bg-yellow-700 transition"
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsPassword(true)}
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Password Modal */}
        {isPassword && (
          <UpdatePasswordModal
            open={isPassword}
            onClose={() => setIsPassword(false)}
            toaster={toaster}
            loader={loader}
          />
        )}

        <ClintEnquery />
      </div>
    </div>
  );
};

export default Profile;
