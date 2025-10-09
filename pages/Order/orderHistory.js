import React, { useState, useEffect } from "react";
import { FaIdBadge } from "react-icons/fa";
import ClintEnquery from "../clintEnquery";
import { useRouter } from "next/router";
import { Api } from "@/services/service";


function orderHistory() {
  const router = useRouter();
  const { productId } = router.query;
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     console.log("productId:", productId);
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);

  const getProductById = (id) => {
    setLoading(true);
    Api("get", `getOrderById/${id}`, {}, router).then(
      (res) => {
        setLoading(false);
        console.log("Full response:", res);
        console.log("Product detail response:", res);
        console.log("Response data:", res?.data);
        console.log("Response status:", res?.status);
        
        if (res?.status && res?.data) {
          setProductDetail(res.data);
        } else {
          console.error("Failed to fetch product detail:", res?.message || "No data received");
        }
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching product detail:", error);
      }
    );
  };

  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
            Order History
          </p>
        </div>
      </div>

      <div className="bg-custom-black pt-10">
        <div className="border rela bg-gray-700 border-gray-500 rounded-md md:px-10 px-5 py-5 w-[90%] md:w-[600px] mx-auto">
          <div className="pt-5">
            <p className="text-center font-semibold text-3xl pb-5">
              Order History
            </p>

            {loading ? (
              <div className="text-center py-10">
                <p className="text-white">Loading product details...</p>
              </div>
            ) : !productDetail ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Product not found</p>
              </div>
            ) : (
              <div className="flex justify-center items-center my-5">
                <div 
                 onClick={() => router.push(`/Order/liveTracking?productId=${productDetail._id || productDetail.id}`)}
                  className="bg-white w-full rounded-md py-5 px-5 cursor-pointer"
                >
                  <div className="flex flex-wrap md:flex-nowrap justify-between items-center bg-white py-3 px-3 rounded-md w-full gap-3">
                    <div className="flex items-center gap-3">
                      <FaIdBadge className="text-4xl text-yellow-500" />
                      <div>
                        <p className="text-base text-custom-black">
                          {productDetail.name || productDetail.productname}
                        </p>
                        <p className="text-sm text-custom-black py-1">
                          {new Date(productDetail.createdAt).toLocaleDateString('en-GB')}
                        </p>
                        <p className="text-xs text-custom-black">
                          {productDetail.price} $
                        </p>
                        {productDetail.categoryname && (
                          <p className="text-xs text-gray-600">
                            Category: {productDetail.categoryname}
                          </p>
                        )}
                        {productDetail.posted_by && (
                          <p className="text-xs text-gray-600">
                            Vendor: {productDetail.posted_by.shop_name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex-col md:flex-row md:ml-0 ml-0 md:justify-end md:items-center md:gap-5 mt-3 md:mt-0">
                      <p className="md:mr-5 text-center text-custom-black text-sm md:text-right">
                        Price: ${productDetail.price}
                      </p>
                      {productDetail.attributes && productDetail.attributes.length > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          {productDetail.attributes.map((attr, index) => (
                            <p key={index}>
                              {attr.name}: {attr.value}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center px-5 mt-5">
                    <p className="w-8 h-[24px] rounded-full bg-yellow-600"></p>
                    <hr className="w-40" />
                    <p className="w-8 h-[24px] rounded-full bg-yellow-600"></p>
                    <hr className="w-40" />
                    <p className="w-8 h-[24px] rounded-full bg-yellow-600"></p>
                    <hr className="w-40" />
                    <p className="w-8 h-[24px] rounded-full bg-yellow-600"></p>
                  </div>
                  <div className="flex justify-between items-center px-5">
                    <div className="text-custom-black pr-3">
                      <p>Order</p>
                      <p>Received</p>
                    </div>
                    <p className="text-custom-black">Loading</p>
                    <div className="text-center pl-5 text-custom-black">
                      <p>Truck</p>
                      <p>Arrived</p>
                    </div>
                    <p className="text-custom-black pl-5">Delivered</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ClintEnquery />
      </div>
    </div>
  );
}

export default orderHistory;