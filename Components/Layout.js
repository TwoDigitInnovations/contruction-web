/* eslint-disable react-hooks/exhaustive-deps */
import Footer from "@/Components/footer";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState, useContext } from "react";
import { userContext } from "../pages/_app";
// import Service from "@/components/Service";
// import Works from "@/components/Works";
// import Cleaning from "@/components/Cleaning";
import Navbar from "@/Components/Navbar";


// import constant from "./constant";

const Layout = ({ children, loader, toaster, constant, open }) => {

   const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      loader(false);
    });
    router.events.on("routeChangeStart", () => {
      loader(true);
    });
    loader(false);
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <div className="min-h-screen flex-col bg-white relative">
          
          {/* Navbar - Higher z-index with inline style */}
          <div 
            className="fixed w-full top-0" 
            style={{ zIndex: 99999 }}
          >
             <Navbar
    loader={loader}
    toaster={toast}
    isOpen={navbarOpen}
    setIsOpen={setNavbarOpen}
  />
          </div>

          {/* Main content with proper spacing */}
          {/* <div className="flex-1">
            {open && (
              <div 
                className="h-screen w-screen fixed flex justify-center items-center backdrop-blur-sm"
                style={{ zIndex: 9998 }}
              >
                <img 
                  src="/book1.gif" 
                  className="absolute rounded-full h-60 w-60 object-contain" 
                  dir="rtl" 
                />
              </div>
            )}
            
            <main className="h-full flex-1">
              {children}
            </main>
          </div> */}
          <div className="flex-1 pt-20">
  {open && (
    <div
      className="h-screen w-screen fixed flex justify-center items-center backdrop-blur-sm"
      style={{ zIndex: 9998 }}
    >
      <img
        src="/book1.gif"
        className="absolute rounded-full h-60 w-60 object-contain"
        dir="rtl"
      />
    </div>
  )}
                  
  <main className="h-full flex-1">
    {children}
  </main>
</div>

          <Footer loader={loader} toaster={toast} />
        </div>
      </div>
    </>
  );
};

export default Layout;
