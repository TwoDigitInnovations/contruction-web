import React, { useState, useEffect } from "react";
import { FaIdBadge } from "react-icons/fa";
import { useRouter } from "next/router";
import ClintEnquery from "../clintEnquery";
import { Api } from "@/services/service";

function MyOrder() {
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

  const handleProductClick = (productId) => {
    router.push(`/Order/orderHistory?productId=${productId}`);
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-600';
      case 'pending':
        return 'bg-yellow-600';
      case 'approved':
        return 'bg-blue-600';
      case 'cancelled':
        return 'bg-red-600';
      default:
        return 'bg-yellow-600';
    }
  };

  const getCardBackground = (index) => {
    return index === 0 ? 'bg-yellow-600' : 'bg-white';
  };

  const getTextColor = (index) => {
    return index === 0 ? 'text-custom-black' : 'text-custom-black';
  };

  const getIconColor = (index) => {
    return index === 0 ? 'text-custom-black' : 'text-yellow-500';
  };

  return (
    <div>
      <div>
        <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              MY ORDER
            </p>
          </div>
        </div>
      </div>

      <div className="bg-custom-black h-full pt-10 pb-10">
        <div className="border bg-gray-700 border-gray-500 rounded-md md:px-10 px-5 py-5 w-[90%] md:w-[600px] mx-auto">
          <div className="pt-5">
            <p className="text-center font-semibold text-3xl pb-5">My Orders</p>

            {loading && page === 1 ? (
              <div className="text-center py-10">
                <p className="text-white">Loading orders...</p>
              </div>
            ) : orderList.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">No orders found</p>
              </div>
            ) : (
              <div className="max-h-96 overflow-y-auto">
                {orderList.map((item, index) => (
                  <div key={item.id || index} className="flex justify-center items-center my-5">
                    <div 
                      onClick={() => handleProductClick(item._id || item.id)}
                      className={`flex flex-wrap md:flex-nowrap justify-between items-center ${getCardBackground(index)} py-3 px-3 rounded-md w-full gap-3 cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      <div className="flex items-center gap-3">
                        <FaIdBadge className={`text-4xl ${getIconColor(index)}`} />
                        <div>
                          <p className={`text-base ${getTextColor(index)}`}>
                            {item.productname}
                          </p>
                          <p className={`text-sm py-1 ${getTextColor(index)}`}>
                            {new Date(item.createdAt).toLocaleDateString('en-GB')}
                          </p>
                          <p className={`text-xs ${getTextColor(index)}`}>
                            {item.price} $
                          </p>
                        </div>
                      </div>
                      <div className="flex-col md:flex-row md:ml-0 ml-0 md:justify-end md:items-center md:gap-5 mt-3 md:mt-0">
                        <p className={`md:mr-5 text-center text-sm md:text-right ${getTextColor(index)}`}>
                          QTY - {item.quantity || '1'} kg
                        </p>
                        <button 
                          className={`mt-2 md:mt-2 px-4 text-sm py-1 ${
                            index === 0 
                              ? 'bg-custom-black text-white' 
                              : getStatusColor(item.status) + ' text-white'
                          } rounded-md`}
                        >
                          {item.status}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Load More Button */}
                {currentData.length === 20 && (
                  <div className="text-center py-4 mt-5">
                    <button
                      onClick={fetchNextPage}
                      disabled={loading}
                      className="bg-yellow-600 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-700"
                    >
                      {loading ? 'Loading...' : 'Load More Orders'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ClintEnquery />
    </div>
  );
}

export default MyOrder;