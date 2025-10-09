import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import ClintEnquery from "./clintEnquery";

function service() {
  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center sf-heading font-semibold text-4xl md:text-5xl sf-heading lg:text-6xl text-white">
            Service
          </p>
        </div>
      </div>

      {/* text code start from here */}
      <div className="bg-custom-black px-10 flex flex-col md:flex-row justify-between pt-20">
        <div className="max-w-2xl">
          <p className="text-4xl sf-heading">Our Bill </p>
          <p className="text-4xl sf-heading">of Quantities(BOQ)</p>
          <p className="max-w-xl">
           services not only help in estimating costs but also provide a clear roadmap for your construction journey. With transparent and itemized breakdowns, clients gain a better understanding of resource allocation, making tendering and project execution more efficient. We ensure every BOQ is tailored to the project’s unique requirements, eliminating guesswork and enhancing decision-making from start to finish.
          </p>
        </div>
        <div className="md:w-[40%] w-full">
          {/* <img
            width="100%"
            height="100%"
            src="/Image/constructionImage.png"
            alt="construction"
          /> */}
        </div>
      </div>

      <div className="bg-custom-black px-10 flex flex-col md:flex-row justify-between gap-10 pt-28 ">
        <div className="md:w-[40%] w-full">
          {/* <img
            width="100%"
            height="100%"
            src="/Image/constructionImage.png"
            alt="construction"
          /> */}
        </div>
        <div className="max-w-2xl ">
          <p className="text-4xl sf-heading">Booking with us </p>
         
          <p className="max-w-lg">
           means more than just scheduling a service—it’s about partnering with a team that values punctuality, precision, and professionalism. Our user-friendly booking system ensures quick confirmations, flexible scheduling, and real-time updates. Whether it's material delivery or service execution, we prioritize your time and trust.
          </p>
        </div>
      </div>
      <div className="bg-custom-black px-10 flex  flex-col md:flex-row gap-10 justify-between pt-28 pb-10">
        <div className="max-w-2xl">
          <p className="text-4xl sf-heading">Comprehensive inspection </p>
          <p className="text-4xl sf-heading">services</p>
          <p className="max-w-xl">
           ensure your construction standards are never compromised. From verifying material specifications to monitoring work progress, we carry out inspections that cover structural, mechanical, and safety aspects. Our goal is to catch issues early, reduce risk, and ensure your project complies with all regulatory and quality benchmarks.
          </p>
        </div>
        <div className="md:w-[40%] w-full">
          {/* <img
            width="100%"
            height="100%"
            src="/Image/constructionImage.png"
            alt="construction"
          /> */}
        </div>
      </div>
      {/* text code end */}
      
      

      {/* what our client says code start */}
      <div>
        <div>
          <div className="bg-custom-black pb-10 pt-10">
            <div className="text-center py-5">
              <p className="text-yellow-500 text-lg sf-heading font-semibold py-4">
                What Our Client Says
              </p>
              <p className="max-w-3xl mx-auto pb-3 px-5 text-sm">
                I am very satisfied with the services. Their team is very
                professional and efficient in completing our project on time and
                at a very affordable cost. The quality of their work is very
                good and I highly recommend this company for any construction
                project.
              </p>
              <p className="pb-1">Tom Delonge</p>
              <p className="text-xs">CEO, Lexmark</p>
            </div>

            <div>
              <div className="flex justify-center items-center gap-3 my-5">
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                  <span>
                    <FaAngleLeft />
                  </span>
                  <button className="text-sm">Prev</button>
                </div>
                <img
                  src="/Image/profile1.png"
                  alt="construction"
                  className="w-10 h-10 border opacity-35 rounded-full"
                />
                <img
                  src="/Image/profile.png"
                  alt="construction"
                  className="w-14 h-14 border-4 border-yellow-600 rounded-full"
                />
                <img
                  src="/Image/profile3.png" 
                  alt="construction"
                  className="w-10 h-10 border opacity-35 rounded-full"
                />
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                  <button className="text-sm">Next</button>{" "}
                  <span>
                    <FaAngleRight />
                  </span>
                </div>
              </div>
            </div>
            
            {/* left form code start form here */}
            <ClintEnquery/>
            {/* left form code  end form here */}
            <hr className="w-[95%] mx-auto mt-10" />
          </div>
        </div>
      </div>
      {/* what our client says code end */}
    </div>
  );
}

export default service;
