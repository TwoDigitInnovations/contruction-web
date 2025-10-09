import React, { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { Api } from "@/services/service";

// Zod validation schema for SignUp
const signUpSchema = z.object({
  username: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\+]?[1-9][\d]{9,14}$/, "Please enter a valid phone number"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  gender: z.enum(["male", "female"], {
    required_error: "Please select a gender",
  }),
});

function signUp(props) {
  const router = useRouter();
  const [signup, setSignup] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: ""
  });
  const [errors, setErrors] = useState({});

  const validateField = (field, value) => {
    try {
      signUpSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors(prev => ({ ...prev, [field]: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ 
          ...prev, 
          [field]: error.errors[0]?.message || `Invalid ${field}` 
        }));
      }
    }
  };

  const handleInputChange = (field, value) => {
    setSignup({ ...signup, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleGenderChange = (value) => {
    setSignup({ ...signup, gender: value });
    validateField("gender", value);
  };

  const submit = (e) => {
    e.preventDefault();
    
    try {
      // Validate all fields
      const validatedData = signUpSchema.parse(signup);
      setErrors({});
      
      props.loader(true);
      const data = {
        username: validatedData.username.toLowerCase(),
        email: validatedData.email,
        phone: validatedData.phone,
        password: validatedData.password,
        gender: validatedData.gender
      };

      Api("post", "signUp", data, router).then(
        (res) => {
          props.loader(false);
          console.log("res==========> signup ::", res);
          if (res?.success) {  
  setSignup({
    username: "",
    email: "",
    phone: "",
    password: "",
    gender: ""
  });
  setErrors({});
  props.toaster({ type: "success", message: "Account created successfully!" });
  router.push("/auth/signIn");
} else {
  props.toaster({ type: "error", message: res?.data?.message || "Sign up failed" });
}
        },
        (error) => {
          props.loader(false);
          console.log(error);
          props.toaster({ type: "error", message: error?.message || "Something went wrong" });
        }
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0];
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
        
        // Show first error in toast
        const firstError = error.errors[0];
        props.toaster({ 
          type: "error", 
          message: firstError?.message || "Please fix the form errors" 
        });
      }
    }
  };

  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[1000px] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <form onSubmit={submit}>
        <div className=" pt-32  ">
          <div className="border bg-gray-700 border-gray-500 rounded px-5 sm:px-8 md:px-10 lg:px-12 py-8 md:py-10 lg:py-12 w-[90%] md:w-[450px] lg:w-[500px] mx-auto">
            <p className="text-center text-2xl font-semibold text-white">Sign Up</p>
            
            {/* Gender Selection */}
            <div className="flex justify-center items-center gap-5 mt-5">
              <div className={`border w-48 py-3 rounded-md pl-2 ${errors.gender ? 'border-red-500' : 'border-gray-500'}`}>
                <input 
                  className="cursor-pointer"
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={signup.gender === "male"}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                <label htmlFor="male" className="pl-3 text-white">Male</label>
              </div>
              <div className={`border w-48 rounded-md py-3 pl-2 ${errors.gender ? 'border-red-500' : 'border-gray-500'}`}>
                <input 
                  className="cursor-pointer"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={signup.gender === "female"}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                <label className="pl-3 text-white" htmlFor="female">Female</label>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-2 text-center">{errors.gender}</p>
            )}

            {/* Full Name */}
            <div className="pt-5">
              <label className="block mb-2 text-white">Full Name</label>
              <input
                className={`w-full px-3 py-3 rounded text-custom-black ${
                  errors.username ? 'border-2 border-red-500' : ''
                }`}
                type="text"
                placeholder="Enter your full name"
                value={signup.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                onBlur={(e) => validateField("username", e.target.value)}
              />
              {errors.username && (
                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="pt-5">
              <label className="block mb-2 text-white">Email</label>
              <input
                className={`w-full px-3 py-3 rounded text-custom-black ${
                  errors.email ? 'border-2 border-red-500' : ''
                }`}
                type="email"
                placeholder="demo@gmail.com"
                value={signup.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={(e) => validateField("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="pt-5">
              <label className="block mb-2 text-white">Phone Number</label>
              <input
                className={`w-full px-3 py-3 rounded text-custom-black ${
                  errors.phone ? 'border-2 border-red-500' : ''
                }`}
                type="tel"
                placeholder="+91 9876543210"
                value={signup.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                onBlur={(e) => validateField("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="pt-5 pb-5">
              <label className="block mb-2 text-white">Password</label>
              <input
                className={`w-full text-custom-black py-3 px-3 rounded ${
                  errors.password ? 'border-2 border-red-500' : ''
                }`}
                type="password"
                placeholder="***************"
                value={signup.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                onBlur={(e) => validateField("password", e.target.value)}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-gray-300 text-xs mt-1">
                Password must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div className="pt-5">
              <button 
                type="submit"
                className="py-3 px-5 font-semibold bg-yellow-600 hover:bg-yellow-700 text-white w-full rounded transition-colors"
              >
                SIGN UP
              </button>
            </div>

            <div className="flex justify-center items-center pt-5 gap-5">
              <p className="text-white">
                Already have an account?
                <span
                  onClick={() => router.push("/auth/signIn")}
                  className="text-yellow-500 font-semibold pl-2 cursor-pointer hover:text-yellow-400"
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
          {/* <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Sign Up
          </p> */}
        </div>
      </div>

      
    </div>
  );
}

export default signUp;