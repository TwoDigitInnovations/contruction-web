import React, { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { GoAlertFill } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa6";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiDark } from "react-icons/ci";
import { FaRegIdBadge } from "react-icons/fa6";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/router"; // Next.js navigation hook
import ClintEnquery from "../clintEnquery";
import { Api } from "@/services/service";

function Profile(props) {
  const router = useRouter(); // Initialize Next.js router
  
  // State to store user profile data
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone: "",
    type: "",
    verified: "",
    _id: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
  });
  
  // State for form inputs - this will be used for editing
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });
  
  // State to control loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Function to fetch user profile data
  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      if (!token) {
        // Handle not logged in scenario
        console.error("User not logged in");
        setIsLoading(false);
        return;
      }
      
      // Make API call to get profile data
      const response = await Api("get", "getProfile", null);
      console.log("my profile============", response);
      
      if (response?.status) {
        // Set profile data
        const userData = response.data;
        
        // Update state with user data using actual fields from API response
        const userProfileData = {
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
          type: userData.type || "",
          verified: userData.verified || "",
          _id: userData._id || "",
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          gender: userData.gender || "",
          dob: userData.dob || "",
        };
        
        setProfileData(userProfileData);
        
        // Set form data with current profile values for editing
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
        });
      } else {
        // Handle error
        console.error("Failed to fetch profile data:", response?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to update profile
  const updateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Prepare data for API
      const updateData = {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
      };
      
      // Make API call to update profile
      const response = await Api("post", "updateProfile", updateData);
      
      if (response?.status) {
        // Show success message
       props.toaster({type:"success", message:"Profile updated successfully!"})
        
        // Refresh profile data
        fetchProfileData();
      } else {
        // Handle error
        alert(response?.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to navigate to change password page
  const handleChangePassword = () => {
    router.push('/updatepassword');
  };
  
  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold text-4xl sf-heading md:text-5xl lg:text-6xl text-white">
            Profile
          </p>
        </div>
      </div>

      <div className="bg-[#22272B] border h-full py-10">
        <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:gap-30">
          <div>
            <div className="flex-col md:flex-row md:px-10 px-5">
              <div>
                <div className="w-14 md:w-28 md:ml-24 ml-36">
                  <img
                    className="object-contain"
                    src="/Image/dp.png"
                    width="100%"
                    height="100%"
                    alt="Profile Picture"
                  />
                </div>
                <div className="flex justify-center items-center gap-3 mt-5">
                  <p className="text-white">{profileData.username || `${profileData.firstName} ${profileData.lastName}`.trim()}</p>
                  <span className="cursor-pointer">
                    <MdOutlineEdit className="text-white text-2xl" />
                  </span>
                </div>
                <p className="text-center text-white">{profileData.email}</p>
                <p className="text-center text-gray-300">{profileData.phone}</p>
                
                {/* User Role Badge */}
                <div className="text-center mt-2">
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
                    {profileData.type}
                  </span>
                  <span className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded-full text-xs">
                    {profileData.verified}
                  </span>
                </div>

                <div className="w-[350px] bg-yellow-600 px-5 py-1 mt-5 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center">
                      <span className="w-7 h-7 rounded-full bg-gray-400 opacity-35 flex items-center justify-center text-black">
                        <FaRegUser />
                      </span>
                      <div className="px-3">
                        <p className="text-black">My Account</p>
                        <p className="text-sm text-white">
                          Make changes to your account
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                      <span className="text-red-600">
                        <GoAlertFill />
                      </span>
                      <span className="cursor-pointer">
                        <FaAngleRight />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:px-10 px-5 my-3">
              <div>
                <div className="w-[350px] bg-white px-5 py-1 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center">
                      <span className="w-7 h-7 rounded-full bg-gray-400 opacity-35 flex items-center justify-center text-black">
                        <FaRegUser />
                      </span>
                      <div className="px-3">
                        <p className="text-black">Help and support</p>
                        <p className="text-sm text-gray-400">
                          Take help if any doubt happens
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                      <span className="cursor-pointer text-gray-400">
                        <FaAngleRight />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="flex flex-col md:flex-row md:px-10 px-5 my-3">
              <div>
                <div className="w-[350px] bg-white px-5 py-1 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center">
                      <span className="w-7 h-7 rounded-full bg-gray-400 opacity-35 flex items-center justify-center text-black">
                        <IoIosNotificationsOutline />
                      </span>
                      <div className="px-3">
                        <p className="text-black">Notification</p>
                        <p className="text-sm text-gray-400">
                          Manage your notifications at ease
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                      <span className="cursor-pointer text-gray-400">
                        <FaAngleRight />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="flex flex-col md:flex-row md:px-10 px-5 my-3">
              <div>
                <div className="w-[350px] bg-white px-5 py-1 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center">
                      <span className="w-7 h-7 rounded-full bg-gray-400 opacity-35 flex items-center justify-center text-black">
                        <CiDark />
                      </span>
                      <div className="px-3">
                        <p className="text-black">Dark Mode</p>
                        <p className="text-sm text-gray-400">
                          Switch to dark mode
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                      <span className="cursor-pointer text-gray-200 pt-2">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="flex flex-col md:flex-row md:px-10 px-5 my-3">
              <div>
                <div className="w-[350px] bg-white px-5 py-1 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center">
                      <span className="w-7 h-7 rounded-full bg-gray-400 opacity-35 flex items-center justify-center text-black">
                        <FaRegIdBadge />
                      </span>
                      <div className="px-3">
                        <p className="text-black">My Order</p>
                        <p className="text-sm text-gray-400">
                          Check your orders
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                      <span className="cursor-pointer text-gray-400">
                        <FaAngleRight />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>

            <div className="flex flex-col md:flex-row md:px-10 px-5 my-3">
              <div>
                <div className="w-[350px] bg-white px-5 py-1 rounded-md">
                  <div className="flex justify-between">
                    <div className="flex justify-start items-center">
                      <span className="w-7 h-7 rounded-full bg-gray-400 opacity-35 flex items-center justify-center text-black">
                        <IoLogOutOutline />
                      </span>
                      <div className="px-3">
                        <p className="text-black">Logout</p>
                        <p className="text-sm text-gray-400">
                          Sign out from your account
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center items-center gap-5">
                      <span 
                        className="cursor-pointer text-gray-400"
                        onClick={() => {
                          localStorage.removeItem("token");
                          router.push("/login");
                        }}
                      >
                        <FaAngleRight />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>

          {/* form code start */}
          <div className="px-5 border-l-2">
            <h2 className="text-xl font-bold text-white sf-heading mb-6">Update Profile Information</h2>
            <p className="text-gray-300 mb-6">Your user ID: {profileData._id}</p>
            
            <form onSubmit={updateProfile}>
              <div>
                <label className="text-white">Username</label>
                <input
                  className="w-full text-gray-700 px-5 py-4 rounded-md mt-3 md:mb-7 mb-4"
                  type="text"
                  name="username"
                  required
                  placeholder="Enter your Name"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label className="text-white">Email</label>
                <input
                  className="w-full text-gray-700 px-5 py-4 rounded-md mt-3 md:mb-7 mb-4"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="text-white">Phone Number</label>
                <input
                  className="w-full text-gray-700 px-5 py-4 rounded-md mt-3 md:mb-7 mb-4"
                  type="tel"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex gap-4 mt-5">
                <button 
                  type="submit" 
                  className="flex-1 bg-yellow-600 text-white py-4 rounded-md hover:bg-yellow-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Profile"}
                </button>
                
                <button 
                  type="button"
                  onClick={handleChangePassword}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <ClintEnquery />
    </div>
  );
}

export default Profile;