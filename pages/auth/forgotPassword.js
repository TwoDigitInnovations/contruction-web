import React, { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { Api } from "@/services/service";

// Zod validation schemas
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
});

const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .regex(/^\d{6}$/, "OTP must be exactly 6 digits")
});

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
  confirmPassword: z.string().min(1, "Confirm password is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

function ForgotPassword(props) {
  const router = useRouter();
  const [sentOtp, setSentOtp] = useState(false);
  const [createPassword, setCreatePassword] = useState(false);
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Validation error states
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Clear error when user starts typing
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleOtpChange = (e) => {
    // Only allow digits and limit to 6 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (otpError) setOtpError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  const sendOtp = () => {
    // Reset previous errors
    setEmailError("");

    // Validate email
    try {
      emailSchema.parse({ email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
        return;
      }
    }

    const data = { email };
    console.log(data);
    props.loader(true);
    
    Api("post", "sendOTP", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);
        if (res?.status) {
          setShowEmail(false);
          setShowOtp(true);
          setToken(res?.data?.token);
          props.toaster({type:"success", message:"OTP sent successfully"});
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message || err?.message });
      }
    );
  };

  const verifyOtp = () => {
    // Reset previous errors
    setOtpError("");

    // Validate OTP
    try {
      otpSchema.parse({ otp });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setOtpError(error.errors[0].message);
        return;
      }
    }

    const data = { otp, token };
    console.log(data);
    props.loader(true);
    
    Api("post", "verifyOTP", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);

        if (res?.status) {
          setShowEmail(false);
          setShowOtp(false);
          setCreatePassword(true);
          setToken(res?.data?.token);
          props.toaster({ type: "success", message: res?.data?.message });
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message || err?.message });
      }
    );
  };

  const Submit = () => {
    // Reset previous errors
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate passwords
    try {
      passwordSchema.parse({ password, confirmPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === 'password') {
            setPasswordError(err.message);
          } else if (err.path[0] === 'confirmPassword') {
            setConfirmPasswordError(err.message);
          }
        });
        return;
      }
    }

    const data = { password, token };
    props.loader(true);
    
    Api("post", "changePassword", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);
        if (res?.status) {
          setShowEmail(true);
          setShowOtp(false);
          setCreatePassword(false);
          router.push("/auth/signIn");
          props.toaster({ type: "success", message: res?.data?.message });
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message || err?.message });
      }
    );
  };

  return (
    <div>
      {/* Background Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Forgot Password
          </p>
        </div>
      </div>

      {/* Form Section */}
      <form>
        <div className="bg-custom-black py-20">
          <div className="border bg-gray-700 border-gray-500 rounded px-5 sm:px-8 md:px-10 lg:px-12 py-8 md:py-10 lg:py-12 w-[90%] md:w-[450px] lg:w-[500px] mx-auto">
            <p className="text-center text-2xl font-semibold text-white">
              Forgot Password
            </p>

            {/* Email Field */}
            {showEmail && (
              <div className="pt-5">
                <label className="block mb-2 text-white">Email</label>
                <input
                  className={`w-full px-3 py-3 rounded text-black ${
                    emailError ? 'border-2 border-red-500' : ''
                  }`}
                  type="email"
                  required
                  placeholder="demo@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <p className="text-red-400 text-sm mt-1">{emailError}</p>
                )}
              </div>
            )}

            {/* OTP Field */}
            {showOtp && (
              <div className="pt-5">
                <label className="block mb-2 text-white">Enter OTP</label>
                <input
                  className={`w-full px-3 py-3 rounded text-black ${
                    otpError ? 'border-2 border-red-500' : ''
                  }`}
                  type="text"
                  required
                  placeholder="000000"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                />
                {otpError && (
                  <p className="text-red-400 text-sm mt-1">{otpError}</p>
                )}
              </div>
            )}

            {/* New Password Fields */}
            {createPassword && (
              <>
                <div className="pt-5">
                  <label className="block mb-2 text-white">New Password</label>
                  <input
                    className={`w-full px-3 py-3 rounded text-black ${
                      passwordError ? 'border-2 border-red-500' : ''
                    }`}
                    type="password"
                    required
                    placeholder="New Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && (
                    <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                  )}
                </div>
                <div className="pt-5">
                  <label className="block mb-2 text-white">Confirm Password</label>
                  <input
                    className={`w-full px-3 py-3 rounded text-black ${
                      confirmPasswordError ? 'border-2 border-red-500' : ''
                    }`}
                    type="password"
                    required
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  {confirmPasswordError && (
                    <p className="text-red-400 text-sm mt-1">{confirmPasswordError}</p>
                  )}
                </div>
              </>
            )}

            {/* Button Section */}
            <div className="pt-10">
              {showEmail && (
                <button
                  type="button"
                  onClick={() => {
                    sendOtp();
                    setSentOtp(true);
                  }}
                  className="py-3 px-5 font-semibold bg-yellow-600 text-white w-full rounded hover:bg-yellow-700 transition-colors"
                >
                  Send OTP
                </button>
              )}

              {showOtp && (
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="py-3 px-5 font-semibold bg-yellow-600 text-white w-full rounded hover:bg-yellow-700 transition-colors"
                >
                  Next
                </button>
              )}

              {createPassword && (
                <button
                  type="button"
                  onClick={Submit}
                  className="py-3 px-5 font-semibold bg-yellow-600 text-white w-full rounded hover:bg-yellow-700 transition-colors"
                >
                  Save
                </button>
              )}
            </div>

            {/* Sign In Navigation */}
            {createPassword && (
              <p className="text-center mt-5 text-white">
                Already have an account?{" "}
                <span
                  onClick={() => router.push("/auth/signIn")}
                  className="text-yellow-500 font-semibold pl-2 cursor-pointer hover:text-yellow-400 transition-colors"
                >
                  Sign In
                </span>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;