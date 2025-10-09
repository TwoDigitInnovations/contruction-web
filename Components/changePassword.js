import React, { useState } from 'react'
import { useRouter } from "next/router";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { Api } from "@/services/service";
import { checkForEmptyKeys } from "@/services/InputsNullChecker";
import { MdPassword } from "react-icons/md";

function ChangePassword(props) {
    const router = useRouter();
    const [showEmail, setShowEmail] = useState(true);
    const [showOtp, setShowOtp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState();

    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const Submit = (e) => {
        e.preventDefault()

        if (password === "") {
            props.toaster({ type: "error", message: "New Password is required" });
            return;
        }
        if (confirmPassword === "") {
            props.toaster({ type: "error", message: "Confirm Password is required" });
            return;
        }

        if (confirmPassword !== password) {
            props.toaster({
                type: "error",
                message: "Your password is not matched with confirm password",
            });
            return;
        }

        const data = {
            password,
        };
        props.loader(true);
        Api("post", "profile/changePassword", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setPassword('')
                    setConfirmPassword('')
                    props.toaster({ type: "success", message: res?.data?.message });
                } else {
                    console.log(res?.data?.message);
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.data?.message });
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    return (
        <div className="w-full  flex items-center justify-center px-2 md:px-0">
            {/* -mt-16 md:-mt-24 pt-8 md:pt-14 */}
            <div className="h-full w-full flex flex-col justify-center items-end">
                <div className="w-full mx-auto md:max-w-7xl h-full">
                    <div className="flex w-full items-center justify-center h-full ">
                        <form onSubmit={Submit} className="flex  px-3 flex-col  mx-auto w-full justify-center md:py-20 py-5 bg-custom-black items-center md:px-7  rounded-xl shadow-xl">
                            <p className="text-custom-orange text-3xl font-bold my-5 text-white">
                                {" "}
                                Change Password
                            </p>
                            <div className="mb-3 block flex-col md:flex w-full justify-start md:max-w-2xl  md:px-20 px-5 ">
                                <div className="mr-2 relative w-full bg-white  sm:pb-0 pb-1 flex rounded-2xl  justify-start items-center border outline-custom-orange ">
                                    <AiFillLock className=" text-custom-yellow h-5 w-5 ml-2" />
                                    <input
                                        placeholder="New Password"
                                        autoComplete="off"
                                        type="password"
                                        className=" w-full pl-2  text-black  sm:text-lg text-sm rounded-2xl sm:py-4 py-2 outline-none"
                                        value={password}
                                        required
                                        onChange={(text) => {
                                            setPassword(text.target.value);
                                        }}
                                    />
                                </div>

                                <div className="mr-2 relative w-full bg-white  sm:pb-0 pb-1 flex rounded-2xl  justify-start items-center border outline-custom-orange mt-4">
                                    <AiFillLock className=" text-custom-yellow h-5 w-5 ml-2" />
                                    <input
                                        placeholder="Confirm Password"
                                        type="password"
                                        autoComplete="off"
                                        className=" w-full pl-2  text-black  sm:text-lg text-sm rounded-2xl sm:py-4 py-2 outline-none"
                                        value={confirmPassword}
                                        required
                                        onChange={(text) => {
                                            setConfirmPassword(text.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col justify-center w-full items-center md:max-w-2xl  sm:my-5 my-2 md:px-20 px-5">
                                <button

                                    type="submit"
                                    className="border-4 border-white text-black font-extrabold bg-custom-yellow font-nunito   text-center md:h-14 h-10 w-full rounded-2xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword