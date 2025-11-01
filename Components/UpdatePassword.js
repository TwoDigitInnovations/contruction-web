import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Api } from "@/services/service";

const UpdatePasswordModal = ({ open, onClose, toaster, loader }) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmNewPassword } = formData;

    if (!oldPassword)
      return toaster({ type: "error", message: "Old Password is required" });
    if (!newPassword)
      return toaster({ type: "error", message: "New Password is required" });
    if (!confirmNewPassword)
      return toaster({
        type: "error",
        message: "Confirm New Password is required",
      });
    if (newPassword !== confirmNewPassword)
      return toaster({
        type: "error",
        message: "New password and confirm password do not match",
      });

    loader(true);
    try {
      const res = await Api("post", "updatepassword", formData);
      loader(false);
      if (res?.status) {
        toaster({ type: "success", message: res?.data?.message });
        setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        onClose();
      } else {
        toaster({ type: "error", message: res?.data?.message });
      }
    } catch (err) {
      loader(false);
      toaster({ type: "error", message: err?.data?.message || err?.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black rounded-2xl shadow-2xl w-full max-w-md mx-3 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <IoClose size={24} />
        </button>

        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-bold text-center text-custom-yellow mb-6">
            Change Password
          </h2>

          {["oldPassword", "newPassword", "confirmNewPassword"].map((field, i) => (
            <div
              key={i}
              className="flex items-center bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 mb-4 focus-within:border-custom-yellow"
            >
              <AiFillLock className="text-custom-yellow h-5 w-5 mr-2" />
              <input
                type={showPassword[field] ? "text" : "password"}
                name={field}
                placeholder={
                  field === "oldPassword"
                    ? "Old Password"
                    : field === "newPassword"
                    ? "New Password"
                    : "Confirm New Password"
                }
                value={formData[field]}
                onChange={handleChange}
                className="w-full text-black py-2 outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => toggleShow(field)}
                className="text-gray-500 hover:text-gray-700 ml-2"
              >
                {showPassword[field] ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
          ))}

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-3 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 bg-custom-yellow hover:bg-yellow-400 text-white font-bold py-3 rounded-xl transition-all"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
