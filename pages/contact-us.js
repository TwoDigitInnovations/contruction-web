import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import ClintEnquery from "./clintEnquery";


function ContactUs() {
  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
              Contact US
          </p>
        </div>
      </div>
      
      {/* cleint enquery code start */}
       <ClintEnquery/>
      {/* cleint enquery code end */}
    </div>
  );
}

export default ContactUs;
