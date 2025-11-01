
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify"; // Import toast if you're using react-toastify
import { Api } from "@/services/service";

function ClintEnquery(props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    description: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Helper function for showing toast notifications
  const showToast = (type, message) => {
    if (props.toaster) {
      props.toaster({type, message});
    } else if (typeof toast !== 'undefined') {
      // If react-toastify is available
      toast[type](message);
    } else {
      // Fallback to alert
      alert(message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name) {
      showToast("error", "Name is required!");
      return;
    }
    if (!formData.email) {
      showToast("error", "Email is required!");
      return;
    }
    if (!formData.phone) {
      showToast("error", "Phone is required!");
      return;
    }
    if (!formData.service || formData.service === "Select Your Service") {
      showToast("error", "Please select a service!");
      return;
    }
    
    // Prepare data for API call
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      description: formData.description
    };
    
    // Show loader
    if (props.loader) {
      props.loader(true);
    }
    
    // Make API call
    Api("post", "createInquery", data, router).then(
      (res) => {
        if (props.loader) {
          props.loader(false);
        }
        console.log("res=======> inquiry", res);
        if (res?.status) {
          setFormData({
            name: "",
            email: "",
            phone: "",
            service: "",
            description: ""
          });
          showToast("success", "Inquiry submitted successfully");
        } else {
          showToast("error", res?.data?.message || "Something went wrong");
        }
      },
      (error) => {
        if (props.loader) {
          props.loader(false);
        }
        console.log(error);
        showToast("error", error?.message || "Something went wrong");
      }
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <div className="bg-custom-black py-12">
          <div className="">
            <p className="text-4xl sf-heading text-center md:p-5 py-3 px-3 pt-10">
              Leading Way In Building & Civil Construction
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex justify-center items-center gap-5">
              <div className="flex items-center gap-1">
                <span>
                  <FaCheckCircle />
                </span>
                <p>Professional Staff</p>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <FaCheckCircle />
                </span>
                <p>100% Satisfaction</p>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <FaCheckCircle />
                </span>
                <p>Accurate Testing</p>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  <FaCheckCircle />
                </span>
                <p>Transparent Pricing</p>
              </div>
            </div>
          </div>

          {/* left form code start form here */}
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="flex gap-5 justify-center flex-col  md:flex-row grid md:grid-cols-3 px-4 md:px-0">
                <div className="bg-yellow-600 md:col-span-2 w-full py-5 rounded mt-10">
                  <p className="px-10 sf-heading text-white pb-5">Request a Quote</p>
                  <p className="px-10 pb-5 text-white text-sm">
                    Complete control over products allow us to our customers the
                    best quality prices and services. We take great pride in
                    everything that we do in Jhontraktor{" "}
                  </p>
                  <div className="flex flex-col md:flex-row gap-2 justify-center w-full px-5 md:px-10">
                    <input
                      className="px-5 py-3 w-full text-gray-700 rounded placeholder:text-custom-black"
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      className="px-5 py-3 w-full text-gray-700 rounded placeholder:text-custom-black"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2 justify-center mt-3 px-5 md:px-10 flex-col md:flex-row">
                    <input
                      className="px-5 py-3 w-full text-gray-700 rounded placeholder:text-custom-black"
                      placeholder="Phone"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <select 
                      className="px-5 py-3 w-full  rounded text-custom-black"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option>Select Your Service</option>
                      <option value="construction">Construction</option>
                      <option value="renovation">Renovation</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>
                  <div className="px-5 md:px-10 mt-3">
                    <textarea
                      className="w-full py-10 rounded px-5 text-gray-700 placeholder:text-custom-black"
                      placeholder="Additional Details!"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="px-5 md:px-10 mt-3">
                    <button
                      type="submit"
                      className="bg-custom-black text-white w-full py-3 rounded px-5"
                    >
                      Submit Request
                    </button>
                  </div>
                </div>

                
                <div className="bg-yellow-600 mt-10 w-full rounded">
                  <div>
                    <p className="px-8 text-white sf-heading py-5">Contact Info</p>
                    <div className="px-8">
                      <p className="text-white sf-heading">Our location</p>
                      <p className="text-sm text-white">
                        18 Office Park Building 21th Floor Unit C. Jl. TB
                      </p>
                      <p className="text-sm text-white">
                        Simatupang Kav. 18, Jakarta Selatan ,12520
                      </p>
                    </div>
                    <div className="px-8 mt-3 text-white">
                      <p className="sf-heading">Quick Contact</p>
                      <p className="text-sm">Email : (+62) 877-2469-7246</p>
                      <p className="text-sm">
                        Call Us : contact@jhontraktor.co
                      </p>
                    </div>
                    <div className="px-8 mt-3 text-white">
                      <p className="sf-heading">Opening Hours</p>
                      <p className="text-sm">Monday - Friday</p>
                      <p className="text-sm">09:00 AM - 06:00 PM</p>
                    </div>

                    <div className="px-8 mt-3 text-white">
                      <p className="">Do You Have Any Question, Just</p>
                      <p className="">Contact Us To Get Help!</p>
                    </div>

                    <div className="px-5 md:px-10 mt-4 mb-5">
                      <button className="w-full text-white px-5 py-3 rounded bg-custom-black">
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* left form code end here */}
        </div>
      </div>
    </div>
  );
}


export default ClintEnquery;
