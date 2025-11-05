import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Constants from "@/services/constant";

const Checkout = ({ open, onClose, selectedAttribute, location, summary, onPlaceOrder }) => {
    if (!open) return null;
console.log(selectedAttribute);

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[#1F242B] text-white rounded-2xl shadow-2xl w-full max-w-md mx-3 relative p-5 space-y-4">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                    <IoClose size={24} />
                </button>


                <div>
                    <h2 className="text-lg font-semibold mb-2">
                        Product Name :{" "}
                        <span className="text-white/80">{selectedAttribute?.productName}</span>
                    </h2>
                    <div className="flex items-center gap-4">
                        <img
                            src={selectedAttribute?.image}
                            alt={selectedAttribute?.productName}
                            className="w-20 h-20 object-cover rounded-md bg-gray-800"
                        />
                        <div>
                            <p className="capitalize font-medium">{selectedAttribute?.name}</p>
                            <p className="text-sm text-gray-200">{summary?.value} {selectedAttribute?.unit}</p>
                        </div>
                        <div className="ml-auto text-yellow-500 font-semibold">
                            {Constants.Currency} {selectedAttribute?.price}
                        </div>
                    </div>
                </div>

               
                <div>
                    <h3 className="text-lg font-semibold mb-2">Delivery Location</h3>
                    <div className="flex items-center gap-3 bg-[#2B3138] p-3 rounded-xl">
                        <FaUser className="text-2xl text-gray-300" />
                        <div>
                            {/* <p className="capitalize">{location?.name}</p> */}
                            <p className="text-gray-400 text-sm truncate max-w-[240px]">
                                {location}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-[#2B3138] rounded-2xl p-4 space-y-2">
                    <h3 className="text-lg font-semibold mb-2">Payment Summary</h3>
                    <div className="flex justify-between text-gray-400">
                        <span>Total</span>
                        <span className="text-white">{Constants.Currency} {summary?.total}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Tax</span>
                        <span className="text-white">{Constants.Currency} {summary?.taxAmount}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                        <span>Delivery Fee</span>
                        <span className="text-white">{Constants.Currency} {summary?.deliveryCharge}</span>
                    </div>
                    <hr className="border-gray-600 my-2" />
                    <div className="flex justify-between font-semibold">
                        <span>Final</span>
                        <span className="text-yellow-500">{Constants.Currency} {summary?.final}</span>
                    </div>
                </div>

                {/* Place Order Button */}
                <button
                    onClick={onPlaceOrder}
                    className="w-full bg-[#D69E2E] text-white font-semibold py-3 rounded-xl hover:bg-yellow-600 transition"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
