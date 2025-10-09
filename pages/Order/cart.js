import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/router";
import ClintEnquery from "../clintEnquery";
import { Api } from "@/services/service";


function Cart() {
  const [placedOrderPopup, setPlacedOrderPopup] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const router = useRouter();

  // Fetch user orders on component mount
  useEffect(() => {
    getUserOrders(1);
  }, []);

  const getUserOrders = (p) => {
    setPage(p);
    setLoading(true);
    
    Api("get", `getrequestProductbyuser?page=${p}`, {}, router).then(
      (res) => {
        setLoading(false);
        console.log("User orders response:", res);
        if (res?.status) {
          setCurrentData(res.data);
          if (p === 1) {
            setOrderList(res.data);
          } else {
            setOrderList([...orderList, ...res.data]);
          }
        } else {
          console.error("Failed to fetch orders:", res?.message);
        }
      },
      (error) => {
        setLoading(false);
        console.error("Error fetching orders:", error);
      }
    );
  };

  const fetchNextPage = () => {
    if (currentData.length === 20) {
      getUserOrders(page + 1);
    }
  };

  const calculateTotal = () => {
    return orderList.reduce((total, item) => total + parseFloat(item.price || 0), 0);
  };

  const handleOpenPopup = () => {
    setPlacedOrderPopup(true);
  };

  const handleClosePopup = () => {
    setPlacedOrderPopup(false);
  };

  return (
    <div>
      <div>
        <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              MY ORDERS
            </p>
          </div>
        </div>
      </div>

      <div className="bg-custom-black">
        <p className="text-center font-semibold text-3xl pb-5 pt-5 md:pt-10">
          ORDER LIST
        </p>
        
        {loading && page === 1 ? (
          <div className="text-center py-10">
            <p className="text-white">Loading orders...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center gap-10">
            <div className="border border-b h-[480px] rounded-md px-2 md:my-5 mx-5 md:ml-20 pt-5 justify-between md:w-[60%] w-[90%] flex flex-col">
              {/* Header Row */}
              <div className="flex justify-between border-b border-gray-500 pb-5">
                <p className="flex-1 text-center font-bold">Product</p>
                <p className="flex-1 text-center font-bold">Status</p>
                <p className="flex-1 text-center font-bold">Price</p>
              </div>

              {/* Dynamic Order Items */}
              <div className="flex-1 overflow-y-auto">
                {orderList.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-400">No orders found</p>
                  </div>
                ) : (
                  orderList.map((item, index) => (
                    <div key={item.id || index} className="flex justify-between border-b border-gray-500 pb-5 mb-5">
                      <div className="flex-1 text-center">
                        <p className="font-medium">{item.productname}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(item.createdAt).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                      <div className="flex-1 mt-2 text-center">
                        <span className="bg-yellow-600 text-black px-2 py-1 rounded text-sm">
                          {item.status}
                        </span>
                      </div>
                      <div className="flex-1 text-center">
                        <p>${item.price}</p>
                      </div>
                    </div>
                  ))
                )}
                
                {/* Load More Button */}
                {currentData.length === 20 && (
                  <div className="text-center py-4">
                    <button
                      onClick={fetchNextPage}
                      disabled={loading}
                      className="bg-yellow-600 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-700"
                    >
                      {loading ? 'Loading...' : 'Load More'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-md my-2 mx-5 md:mx-0 md:mr-20 md:w-[30%] w-[90%]">
              <p className="mt-5 mx-10 font-semibold text-lg">Order Summary</p>
              <div>
                <div className="flex mx-10 mt-10 justify-between">
                  <p>Total Orders</p>
                  <p>{orderList.length}</p>
                </div>
                <div className="flex mx-10 mt-3 justify-between">
                  <p>Total Amount</p>
                  <p>${calculateTotal().toFixed(2)}</p>
                </div>

                <button
                  onClick={() => router.push("/Order/myOrder")}
                  className="mt-10 md:ml-10 ml-8 text-center bg-yellow-600 font-semibold px-28 py-2 rounded-md hover:bg-yellow-700"
                >
                  PlaceOrder
                </button>
                <div className="flex justify-end items-end mt-3 md:mx-6 mx-10 my-8 gap-2">
                  <FaPlusCircle className="text-2xl text-white" />
                  <p className="cursor-pointer hover:underline" onClick={() => router.push('/products')}>
                    Add Items
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {placedOrderPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black w-full md:w-[400px] md:h-[300px] p-8 rounded-lg mx-4 md:mx-0">
            <div onClick={handleClosePopup} className="flex justify-end">
              <ImCross className="cursor-pointer text-yellow-600" />
            </div>
            <div className="text-center text-3xl font-semibold md:pt-16 sm:pt-14 pt-8">
              <p>Your order has</p>
              <p>been placed</p>
            </div>
          </div>
        </div>
      )}

      {/* client enquery code start */}
      <ClintEnquery />
      {/* client enquery code end */}
    </div>
  );
}

export default Cart;