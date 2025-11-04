import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { languageContext, userContext } from "@/pages/_app";
import { RxCross2 } from "react-icons/rx";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaUserCircle, FaHome, FaInfoCircle, FaCog, FaProjectDiagram, FaPhone, FaUser, FaCalendarAlt, FaHistory } from "react-icons/fa";
import { TiWorld } from "react-icons/ti";
import { TiThMenu } from "react-icons/ti";
import { ImCross } from "react-icons/im";

// Material-UI imports
import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  AccountCircle,
  Person,
  ExitToApp,
  History,
  ShoppingBag
} from '@mui/icons-material';

const Navbar = ({ loader, toaster, isOpen, setIsOpen }) => {
  const [viewPopup, setviewPopup] = useState(false);
  const [user, setUser] = useContext(userContext);
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const [showSub, setShowSub] = useState("");
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("HOME");
  const [showHover, setShowHover] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sidebar drawer state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [profileExpanded, setProfileExpanded] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileExpanded, setProfileExpanded] = useState(false);



  // Material-UI Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = `sidebar ${isOpen ? 'open' : 'closed'}`;
  console.log("navberuser==>", user);

  // useEffect(() => {
  //   setSidebarOpen(false);
  // }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      loader(false);
      // setNavbarOpen(false); // Add this line to close sidebar on route change
    });
    router.events.on("routeChangeStart", () => {
      loader(true);
    });
    loader(false);
  }, []);


  const logout = async () => {
    setIsLoading(true);

    // 3 second loading
    await new Promise(resolve => setTimeout(resolve, 3000));

    router.push(`/`);
    localStorage.removeItem("userDetail");
    localStorage.removeItem("token");
    setUser("");
    setIsLoading(false);
    setShowLogoutConfirm(false);
    setSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = () => {
    logout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  // Material-UI Menu handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push("/Order/profile");
  };

  const handleMyOrdersClick = () => {
    handleMenuClose();
    router.push("/Order/myOrder");
  };

  const handleHistoryClick = () => {
    handleMenuClose();
    router.push("/history");
  };

  // Sidebar handlers
  const toggleSidebar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSidebarOpen(false);
  };

  const handleSidebarNavigation = (href) => {
    setIsOpen(false);
    router.push(href);
  };

  const toggleProfileExpansion = () => {
    setProfileExpanded(!profileExpanded);
  };

  const menuItems = [
    {
      href: "/",
      title: "Home",
      icon: <FaHome />,
      sub: false,
    },
    {
      href: "/about-us",
      title: "About Us",
      icon: <FaInfoCircle />,
      sub: false,
    },
    {
      href: "/service",
      title: "Service",
      icon: <FaCog />,
      sub: false,
    },
    {
      href: "/project",
      title: "Project",
      icon: <FaProjectDiagram />,
      sub: false,
    },
    {
      href: "/contact-us",
      title: "Contact Us",
      icon: <FaPhone />,
      sub: false,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleItemClick = (index, href) => {
    setActiveIndex(index);
    setMenuOpen(false);
    router.push(href);
  };

  return (
    <>

      <nav
        className="w-full bg-custom-black"

      >
        <div className="bg-custom-black max-w-7xl mx-auto py-4 px-6 md:px-0 flex justify-between items-center relative" style={{ width: '100%', boxSizing: 'border-box' }}>
          {/* Logo */}
          <div onClick={() => router.push("/")}>
            <Image className="text-yellow-500  " src='/Image/logo.png' width={100} height={100} />
          </div>

          {/* Hamburger Menu for Sidebar */}
          <div className="sm:hidden" onClick={toggleNavbar}>
            <TiThMenu className="text-white text-2xl cursor-pointer pointer-events-auto" />
          </div>

          {/* Desktop Menu Items (hidden on mobile) */}
          <div className="hidden sm:flex sm:flex-row sm:pl-10 md:flex-row flex-col gap-2 md:gap-5 items-center">
            {menuItems.slice(0, 4).map((item, index) => (
              <div key={index}>
                <div
                  onClick={() => handleItemClick(index, item.href)}
                  className={`cursor-pointer text-lg font-sans ${activeIndex === index
                    ? "text-yellow-500 border-b-2 border-yellow-500"
                    : "text-white hover:text-yellow-500"
                    }`}
                >
                  {item.title}

                </div>
              </div>
            ))}
          </div>

          {/* Desktop Items */}

          <div className="hidden md:flex gap-3 justify-center items-center flex-shrink-0">
            {/* Language Selector */}
            <div className="bg-custom-black flex justify-center items-center gap-2 flex-shrink-0">
              <TiWorld className="text-2xl text-white" />
              <select
                className="bg-transparent outline-none text-white cursor-pointer"
                style={{
                  backgroundColor: 'transparent',
                  color: 'white'
                }}
              >
                <option value="en" style={{ backgroundColor: '#000000', color: 'white' }}>English</option>
                <option value="es" style={{ backgroundColor: '#000000', color: 'white' }}>Spanish</option>
                <option value="de" style={{ backgroundColor: '#000000', color: 'white' }}>German</option>
                <option value="gr" style={{ backgroundColor: '#000000', color: 'white' }}>Greek</option>
                <option value="fr" style={{ backgroundColor: '#000000', color: 'white' }}>French</option>
              </select>
            </div>

            {/* Contact Us */}
            <button
              onClick={() => router.push("/contact-us")}
              className="px-4 bg-yellow-600 rounded-md flex-shrink-0 py-2.5"

            >
              Contact Us
            </button>

            {/* Desktop User Menu */}
            {user?.token ? (
              <div className="flex-shrink-0">
                <IconButton
                  onClick={handleMenuClick}
                  size="small"
                  sx={{
                    width: 40,
                    height: 40,
                    flexShrink: 0
                  }}
                  disableRipple={true}
                >
                  <Avatar
                    sx={{ width: 36, height: 36, bgcolor: '#d97706' }}
                  >
                    {user.username[0].toUpperCase()}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  disableScrollLock={true}
                  disablePortal={false}
                  style={{ zIndex: 9999 }}
                  PaperProps={{
                    sx: {
                      width: '160px',
                      mt: 1
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleProfileClick} dense>
                    <ListItemIcon><Person fontSize="small" className="text-black" /></ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem onClick={handleMyOrdersClick} dense>
                    <ListItemIcon><ShoppingBag fontSize="small" className="text-black" /></ListItemIcon>
                    <ListItemText primary="My Orders" />
                  </MenuItem>
                  <MenuItem onClick={handleHistoryClick} dense>
                    <ListItemIcon><History fontSize="small" className="text-black" /></ListItemIcon>
                    <ListItemText primary="History" />
                  </MenuItem>
                  <MenuItem onClick={handleLogoutClick} dense>
                    <ListItemIcon><ExitToApp fontSize="small" className="text-black" /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <IconButton
                onClick={() => router.push("/auth/signIn")}
                size="large"
                className="flex-shrink-0"
              >
                <FaUserCircle className="text-yellow-600 text-3xl cursor-pointer" />
              </IconButton>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998] sm:hidden pointer-events-auto"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(false);
          }}
        />
      )}

      {/* <div className={`fixed top-0 left-0 h-full w-80 bg-custom-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50 sm:hidden pointer-events-auto`}>


        <div className="flex items-center justify-between p-4 bg-custom-black">
          <div className="flex items-center gap-3">
            <span className="text-yellow-500 font-bold text-2xl">Construction</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white pointer-events-auto"
            type="button"
          >
            <ImCross className="text-xl" />
          </button>
        </div>


        <div className="p-4 overflow-y-auto h-full pb-20">

          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                onClick={() => handleSidebarNavigation(item.href)}
                className="w-full flex items-center gap-3 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </button>
            </div>
          ))}


          <div className="mb-4 mt-6">
            <div className="flex items-center gap-3 p-3 text-white">
              <TiWorld className="text-xl" />
              <select className="bg-transparent outline-none text-white cursor-pointer flex-1">
                <option className="text-black">English</option>
                <option className="text-black">Spanish</option>
                <option className="text-black">German</option>
                <option className="text-black">Greek</option>
                <option className="text-black">French</option>
              </select>
            </div>
          </div>



          {user?.token ? (
            <div className="mt-6 border-t border-white border-opacity-20 pt-4">
              <button
                onClick={toggleProfileExpansion}
                className="w-full flex items-center gap-3 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              >
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: '#d97706' }}
                >
                  {user.username[0].toUpperCase()}
                </Avatar>
                <span className="font-medium flex-1 text-left">PROFILE</span>
                {profileExpanded ? (
                  <TiArrowSortedUp className="text-xl" />
                ) : (
                  <TiArrowSortedDown className="text-xl" />
                )}
              </button>

              
              {profileExpanded && (
                <div className="ml-6 mt-2 space-y-1">
                  <button
                    onClick={() => handleSidebarNavigation("/Order/profile")}
                    className="w-full flex items-center gap-3 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <FaUser className="text-lg" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => handleSidebarNavigation("/history")}
                    className="w-full flex items-center gap-3 p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <FaHistory className="text-lg" />
                    <span>History Pages</span>
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 p-2 text-red-300 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-colors duration-200 text-sm"
                  >
                    <ExitToApp className="text-lg" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 border-t border-white border-opacity-20 pt-4">
              <button
                onClick={() => {
                  handleSidebarNavigation("/auth/signIn");
                }}
                className="w-full flex items-center gap-3 p-3 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
              >
                <FaUserCircle className="text-2xl" />
                <span className="font-medium">Sign In</span>
              </button>
            </div>
          )}
        </div>
      </div> */}

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Confirm Logout</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Are you sure you want to logout?</p>
            <div className="flex gap-2 sm:gap-3 justify-end">
              <button
                onClick={handleLogoutCancel}
                className="px-3 py-2 text-sm sm:text-base bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-3 py-2 text-sm sm:text-base bg-yellow-500 text-white rounded hover:bg-yellow-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
              <span className="text-gray-700">Logging out...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;