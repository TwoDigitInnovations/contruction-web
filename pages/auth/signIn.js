import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { Api } from "@/services/service";
import { userContext } from "../_app";

// Zod validation schema for SignIn
const signInSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(2, "Username must be at least 2 characters")
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

function SignIn(props) {
  const router = useRouter();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [user, setUser] = useContext(userContext);

  const validateField = (field, value) => {
    try {
      signInSchema.pick({ [field]: true }).parse({ [field]: value });
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
    setLogin({ ...login, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const userLogin = (e) => {
    e.preventDefault();

    try {
      // Validate all fields using Zod
      const validatedData = signInSchema.parse(login);
      setErrors({});

      const data = {
        username: validatedData.username.toLowerCase(),
        password: validatedData.password
      };

      props.loader(true);
      Api("post", "login", data, router).then(
        (res) => {
          props.loader(false);
          console.log("res=======> login", res);

          if (res?.status) {
            router.push("/");
            localStorage.setItem("userDetail", JSON.stringify(res.data));
            localStorage.setItem("token", res.data.token);
            setUser(res?.data);
            setLogin({
              username: "",
              password: ""
            });
            setErrors({});
            props.toaster({ type: "success", message: "Login successfully" });
          } else {
            props.toaster({
              type: "error",
              message: res?.data?.message || "Login failed"
            });
          }
        },
        (error) => {
          props.loader(false);
          console.log(error);
          props.toaster({
            type: "error",
            message: error?.message || "Something went wrong"
          });
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
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">

          <div className="pt-4">
            <form
              onSubmit={userLogin}
              className="w-[400px] md:w-[450px] md:mx-auto"
            >

              <div className="border bg-gray-700 border-gray-500 rounded md:px-10 px-4 py-10">
                <p className="text-center text-2xl font-semibold text-white">
                  Log In
                </p>

                {/* Username Field */}
                <div className="pt-5">
                  <label className="block mb-2 text-white">User Name</label>
                  <input
                    className={`w-full px-3 py-3 rounded text-black ${errors.username ? 'border-2 border-red-500' : ''
                      }`}
                    type="text"
                    placeholder="user name"
                    value={login.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    onBlur={(e) => validateField("username", e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="pt-5">
                  <label className="block mb-2 text-white">Password</label>
                  <input
                    className={`w-full text-black py-3 px-3 rounded ${errors.password ? 'border-2 border-red-500' : ''
                      }`}
                    type="password"
                    placeholder="***************"
                    value={login.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onBlur={(e) => validateField("password", e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <span onClick={() => router.push("/auth/forgotPassword")}>
                  <p className="text-end text-gray-300 mt-3 cursor-pointer hover:text-white transition-colors">
                    Forgot Password ?
                  </p>
                </span>

                {/* Login Button */}
                <div className="pt-8">
                  <button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 font-semibold px-4 rounded transition-colors"
                  >
                    Log In
                  </button>

                  <div className="text-center mt-5">
                    <p className="text-white">
                      Haven't registered yet?
                      <span
                        onClick={() => router.push("/auth/signUp")}
                        className="pl-2 font-semibold text-yellow-500 cursor-pointer hover:text-yellow-400 transition-colors"
                      >
                        Sign up
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


    </div>
  );
}

export default SignIn;