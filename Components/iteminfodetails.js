import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import Constants from "@/services/constant";

const ProductDetail = ({
    open,
    setOpen,
    setSelectedAttribute,
    selectedShop,
    selectedAttribute,
    productdetail,
}) => {

    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const Currency = Constants.Currency;

    const handleNext = () => {
        const selectedProductData = {
            productid: productdetail?._id,
            shopid: selectedShop?._id,
            attribute: selectedAttribute,
            input: inputValue,
        };

        router.push({
            pathname: "/Order/orderCategory",
            query: selectedProductData,
        });
    };


    const isNextDisabled =
        (inputValue === "" || !selectedAttribute?.value) &&
        productdetail?.attributes?.length > 0;

    const showStockWarning =
        Number(inputValue) > Number(selectedAttribute?.value);

    if (!open) return null;

    console.log("abcd", selectedAttribute);

    return (
        <div className="fixed inset-0 z-[9999999999] flex justify-center items-center pt-20">
            <div className="bg-black/80 backdrop-blur-sm overflow-y-auto rounded-2xl shadow-2xl 
                w-full max-w-lg mx-3 relative 
                max-h-[85vh] md:min-h-[550px] h-auto md:p-5 p-3">

                <button
                    onClick={() => setOpen(false)}
                    className=" absolute top-4 right-4 text-white hover:text-yellow-400 transition"
                >
                    <X />
                </button>

                <div
                    className="md:p-6 p-3 flex flex-col items-center"
                >

                    <h2 className="text-white text-xl font-semibold mb-6 text-center">
                        Select Mixed Design / Strength
                    </h2>

                    <h3 className="text-white text-2xl font-bold mb-8 text-center border-b-2 border-white pb-2">
                        {productdetail?.attributes?.length > 0
                            ? productdetail.name
                            : productdetail?.categoryname}
                    </h3>

                    {/* Attributes */}
                    {productdetail?.attributes?.length > 0 && (
                        <div className="w-full max-w-2xl space-y-4 mb-4">
                            {productdetail.attributes.map(
                                (item, index) =>
                                    item.value && (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedAttribute(item)}
                                            className={`w-full bg-gray-800/50 backdrop-blur-sm border rounded-lg p-4 flex items-center justify-between transition-all ${selectedAttribute?.name === item?.name
                                                ? "border-yellow-500 bg-gray-700/60"
                                                : "border-yellow-600/50 hover:bg-gray-700/40"
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`w-6 h-6 border-2 rounded flex items-center justify-center ${selectedAttribute?.name === item?.name
                                                        ? "bg-yellow-500 border-yellow-500"
                                                        : "border-yellow-500"
                                                        }`}
                                                >
                                                    {selectedAttribute?.name === item?.name && (
                                                        <Check className="w-4 h-4 text-gray-900" />
                                                    )}
                                                </div>
                                                <img src={item.image} className="w-20 h-20 object-contain" />
                                                <span className="text-white text-lg">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <span className="text-yellow-500 text-lg font-semibold">
                                                {Currency} {item.price}
                                            </span>
                                        </button>
                                    )
                            )}
                        </div>
                    )}

                    {/* Input Section */}
                    {productdetail?.attributes?.length > 0 ? (
                        <div className="flex items-center gap-4 mb-6">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter quantity"
                                className="w-72 px-5 py-3 text-lg rounded-lg bg-white text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            {selectedAttribute?.unit && (
                                <span className="text-white text-lg font-semibold">
                                    {selectedAttribute.unit}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="w-full max-w-2xl bg-gray-800/50 backdrop-blur-sm border border-yellow-600/50 rounded-lg p-6 mb-6">
                            <div className="flex items-center justify-between">
                                <p className="text-white text-lg truncate flex-1">
                                    {productdetail?.name}
                                </p>
                                <p className="text-yellow-500 text-lg font-semibold ml-4">
                                    {Currency} {productdetail?.price}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Stock Warning */}
                    {showStockWarning && (
                        <p className="text-red-500 text-md mb-6 text-center max-w-2xl">
                            Available stock is less than your entered value. You can
                            purchase up to {selectedAttribute?.value}{" "}
                            {selectedAttribute?.unit}.
                        </p>
                    )}

                    {/* Next Button */}
                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        className={`w-full max-w-2xl py-3 rounded-lg text-white text-lg font-semibold shadow-lg transition-all ${isNextDisabled
                            ? "bg-yellow-700/50 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600"
                            }`}
                    >
                        Next
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
