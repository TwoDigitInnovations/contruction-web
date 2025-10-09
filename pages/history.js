import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { HiChevronRight, HiEye } from "react-icons/hi";
import { MdDateRange, MdLocationOn, MdBuild } from "react-icons/md";
import { FaFilter, FaSearch } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import { PiFireTruckFill } from "react-icons/pi";

function History(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);
  const [historyData, setHistoryData] = useState([
  ]);

  useEffect(() => {
    setMounted(true);
    // Initialize history data after component mounts
    setHistoryData([
      {
        id: 1,
        orderNumber: "ORD-2024-001",
        projectName: "House Making",
        customerName: "Rohan Kumar",
        location: "TX-254 colony main road new delhi 110059",
        orderDate: "2024-03-15",
        status: "completed",
        items: ["Concrete - 5 cubic meters", "Sand - 2 tons", "Ballast - 3 tons"],
        totalAmount: "₹25,000",
        deliveryDate: "2024-03-18"
      },
      {
        id: 2,
        orderNumber: "ORD-2024-002",
        projectName: "Commercial Building",
        customerName: "Amit Singh",
        location: "Sector 15, Noida, UP 201301",
        orderDate: "2024-03-10",
        status: "pending",
        items: ["Concrete - 10 cubic meters", "Bill of Quantities"],
        totalAmount: "₹45,000",
        deliveryDate: "2024-03-20"
      },
      {
        id: 3,
        orderNumber: "ORD-2024-003",
        projectName: "Residential Complex",
        customerName: "Priya Sharma",
        location: "Gurgaon, Haryana 122001",
        orderDate: "2024-03-08",
        status: "in-progress",
        items: ["Exhauster Service", "Book Inspection"],
        totalAmount: "₹15,000",
        deliveryDate: "2024-03-12"
      },
      {
        id: 4,
        orderNumber: "ORD-2024-004",
        projectName: "Villa Construction",
        customerName: "Rajesh Gupta",
        location: "Dwarka, New Delhi 110075",
        orderDate: "2024-03-05",
        status: "completed",
        items: ["Concrete - 8 cubic meters", "Sand - 4 tons"],
        totalAmount: "₹35,000",
        deliveryDate: "2024-03-08"
      },
      {
        id: 5,
        orderNumber: "ORD-2024-005",
        projectName: "Office Building",
        customerName: "Sunita Verma",
        location: "Connaught Place, New Delhi 110001",
        orderDate: "2024-03-02",
        status: "cancelled",
        items: ["Ballast - 5 tons", "Sand - 3 tons"],
        totalAmount: "₹20,000",
        deliveryDate: "2024-03-05"
      }
    ]);
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "in-progress":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const filteredData = historyData.filter(order => {
    const matchesFilter = filterStatus === "all" || order.status === filterStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div>
        {/* Hero Section */}
        <div className="relative bg-gray-800 bg-cover bg-center h-screen w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
            <p className="text-center sf-heading text-4xl md:text-5xl lg:text-6xl text-white">
              Order History
            </p>
            <p className="text-center text-lg md:text-xl text-white/80 mt-4">
              Track all your construction orders and projects
            </p>
          </div>
        </div>
        <div className="bg-custom-black p-5 px-4 md:px-28">
          <div className="flex justify-between items-center mb-4">
            <p className="text-white text-2xl">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center sf-heading font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
            Order History
          </p>
          <p className="text-center text-lg md:text-xl text-white/80 mt-4">
            Track all your construction orders and projects
          </p>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-custom-black p-5 px-4 md:px-28">
        <div className="flex justify-between items-center mb-4">
          <p className="text-white text-2xl">Order History</p>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="bg-custom-black px-4 md:px-28 pb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order number, project, or customer..."
              className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full md:w-auto">
            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              className="w-full md:w-48 pl-10 pr-4 py-3 bg-white text-black rounded-lg border border-gray-300 appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* History Cards Section */}
      <div className="bg-custom-black py-10 px-4 md:px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((order) => (
            <div
              key={order.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {order.orderNumber}
                  </h3>
                  <p className="text-yellow-500 font-medium">
                    {order.projectName}
                  </p>
                </div>
                <span
                  className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>

              {/* Customer Info */}
              <div className="mb-4">
                <p className="text-white mb-2">{order.customerName}</p>
                <div className="flex items-start gap-2">
                  <MdLocationOn className="text-yellow-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{order.location}</p>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <BsCalendar3 className="text-yellow-500" />
                  <span className="text-gray-300 text-sm">
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <MdDateRange className="text-yellow-500" />
                  <span className="text-gray-300 text-sm">
                    Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PiFireTruckFill className="text-yellow-500" />
                  <span className="text-white font-semibold">
                    {order.totalAmount}
                  </span>
                </div>
              </div>

              {/* Items Preview */}
              <div className="mb-4">
                <p className="text-gray-300 text-sm mb-2">Items:</p>
                <div className="text-gray-400 text-sm">
                  {order.items.slice(0, 2).map((item, index) => (
                    <p key={index}>• {item}</p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-yellow-500">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(order)}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300"
              >
                <HiEye />
                View Details
              </button>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredData.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400 text-lg">No orders found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black w-full max-w-2xl px-6 py-6 rounded-lg mx-4 md:mx-0 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">Order Details</h2>
              <ImCross
                className="cursor-pointer text-white hover:text-yellow-500 transition-colors"
                onClick={() => setShowDetails(false)}
              />
            </div>

            {/* Order Info */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">Order Information</h3>
                  <p className="text-white mb-1">
                    <span className="text-gray-400">Order Number:</span> {selectedOrder.orderNumber}
                  </p>
                  <p className="text-white mb-1">
                    <span className="text-gray-400">Project:</span> {selectedOrder.projectName}
                  </p>
                  <p className="text-white mb-1">
                    <span className="text-gray-400">Customer:</span> {selectedOrder.customerName}
                  </p>
                  <p className="text-white">
                    <span className="text-gray-400">Total Amount:</span> {selectedOrder.totalAmount}
                  </p>
                </div>
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">Dates & Status</h3>
                  <p className="text-white mb-1">
                    <span className="text-gray-400">Order Date:</span>{' '}
                    {new Date(selectedOrder.orderDate).toLocaleDateString()}
                  </p>
                  <p className="text-white mb-1">
                    <span className="text-gray-400">Delivery Date:</span>{' '}
                    {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">Status:</span>
                    <span
                      className={`${getStatusColor(selectedOrder.status)} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {getStatusText(selectedOrder.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-yellow-500 font-semibold mb-2">Delivery Location</h3>
              <div className="flex items-start gap-2">
                <MdLocationOn className="text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-white">{selectedOrder.location}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-yellow-500 font-semibold mb-4">Ordered Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowDetails(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Close
              </button>
              {selectedOrder.status === 'completed' && (
                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg transition-colors duration-300">
                  Reorder
                </button>
              )}
              {selectedOrder.status === 'pending' && (
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors duration-300">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default History;