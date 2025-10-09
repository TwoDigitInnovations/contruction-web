import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import ClintEnquery from "./clintEnquery";

function AboutUs() {
  return (
    <div className="">
      {/* Header Section */}
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center sf-heading font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
             About Us
          </p>
        </div>
      </div>

      {/* Image and Content Section */}
      <div className="bg-custom-black">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 justify-center items-center  sm:py-10 px-5 md:px-10">
          <div className="md:w-1/2 w-full">
            <img
              className="rounded-2xl w-full h-auto"
              src="/Image/MaskGroup.jpg"
              alt="construction"
            />
          </div>
          <div className="max-w-lg text-white">
            <p className="text-3xl px-5 md-px-0 sf-heading md:text-4xl font-semibold pt-5">
             Building Strong Foundations Together
            </p>
            <p className="py-5 px-4 md:px-1 text-base md:text-lg">
             Concrete is one of the most essential materials used in construction, known for its durability and strength. Whether you're working on a residential project or a large-scale commercial site, high-quality concrete ensures the foundation stands the test of time. 
            </p>
            <p className="pb-5 md:px-1 px-4 text-base md:text-lg">
             Ballast plays a key role in stabilizing foundations and providing drainage in construction projects. We offer graded ballast ideal for both domestic and commercial use, ensuring optimal performance in concrete mixes and sub-base layers. 


            </p>
            <p className="text-base md:px-1 px-4 md:text-lg">
             Sand is a fundamental ingredient in construction, often used in masonry work, plastering, and concrete mixes. Our fine and coarse sand options are sourced carefully to meet different construction standards, delivering a smooth finish and strong bond across various applications. 
            </p>
          </div>
        </div>
        
            {/* number of Experience */}
        <div className="hidden md:block">
        <div className="flex flex-col sm:flex-row px-5 md:px-20 gap-5 md:gap-28 pt-20 md:pt-8">
          <div className="flex justify-center gap-2">
            <p className="pt-2 text-yellow-500 font-semibold text-3xl">25+</p>
            <div>
              <p>Years of</p>
              <span> Experience</span>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <p className="pt-2 text-yellow-500 font-semibold text-3xl">378+</p>
            <div>
              <p>Project</p>
              <span> complete</span>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <p className="pt-2 text-yellow-500 font-semibold text-3xl">69+</p>
            <div>
              <p>Winning</p>
              <span> global awards</span>
            </div>
          </div>
        </div>
        </div>
         

        <div>
          <p className="text-2xl pt-10 sf-heading md:text-4xl text-center pb-5 font-semibold">
            Driven by Quality Service
          </p>
        </div>

        <div className="flex flex-col md:flex-row pt-12">
          <div className="flex-1">
            <p className="text-start max-w-2xl px-8 md:px-16 pt-5">
             Exhauster services are vital for waste removal, especially in areas lacking proper sewer connections. We provide efficient and timely exhauster services to keep your site clean and compliant with health standards.eliminating guesswork and enhancing decision-making from start to finish.
            </p>
            <p className="max-w-2xl px-8 md:px-16 pt-5 md:pt-96">
              Book your construction services with us for guaranteed quality, timely delivery, and professional support. Whether you're sourcing materials or need specialized services, our easy booking process ensures you're just a step away from getting what you need without hassle or delay.
            </p>
          </div>

          <div className="flex-none">
            <img
              className="hidden md:block"
              src="/Image/line.png"
              alt="Vertical Line"
            />
          </div>

          <div className="flex-1">
            <p className="max-w-2xl pr-4 md:pr-12 px-8 md:px-5 pt-5 md:pt-56">
              Inspection is a crucial part of every stage in a construction project. Our certified inspectors conduct thorough checks to ensure safety, compliance, and workmanship. From material inspection to site evaluations, we help you maintain quality and avoid costly rework down the line.
            </p>
            <p className="max-w-2xl pr-4 md:pr-12 px-8 md:px-5 pt-5 md:pt-96 pb-5">
             Comprehensive inspection services ensure your construction standards are never compromised. From verifying material specifications to monitoring work progress, we carry out inspections that cover structural, mechanical, and safety aspects. Our goal is to catch issues early, reduce risk, and ensure your project complies with all regulatory and quality benchmarks.
            </p>
          </div>
        </div>
        
        {/* client Inquery code */}
        <div>
        <div className="text-center py-5">
          <p className="text-yellow-500 sf-heading text-lg font-semibold py-4">
            What Our Client Says
          </p>
          <p className="max-w-3xl mx-auto pb-3 text-sm">
            I am very satisfied with the services. Their team is very
            professional and efficient in completing our project on time and at
            a very affordable cost. The quality of their work is very good and I
            highly recommend this company for any construction project.
          </p>
          <p className="pb-1">Tom Delonge</p>
          <p className="text-xs">CEO, Lexmark</p>
        </div>

        <div>
          <div className="flex justify-center items-center gap-3 my-5">
          <div className="flex justify-center items-center gap-2 cursor-pointer"><span><FaAngleLeft /></span><button className="text-sm">Prev</button></div>
            <img src="/Image/profile1.png" className="w-10 h-10 border opacity-35 rounded-full"/>
            <img src="/Image/profile.png" className="w-14 h-14 border-4 border-yellow-600 rounded-full"/>
            <img src="/Image/profile3.png" className="w-10 h-10 border opacity-35 rounded-full"/>
             <div className="flex justify-center items-center gap-2 cursor-pointer"><button className="text-sm">Next</button> <span><FaAngleRight /></span></div>
          </div>
        </div>
         <ClintEnquery/>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
