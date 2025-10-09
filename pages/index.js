import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import ClintEnquery from "./clintEnquery";
import Link from "next/link";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home(props) {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [projects, setProjects] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(false);


const router = useRouter();


  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleFilterClick = () => {
    setIsFilterVisible(false);
  };

const getProjectData = async (page = 1) => {
  setLoading(true);
  try {
    // Minimum 500ms loading time for smooth UX
    const [response] = await Promise.all([
      Api("get", `getProject?page=${page}&limit=3`, "", router),
      new Promise(resolve => setTimeout(resolve, 500))
    ]);
    
    console.log("res================> get project :", response);
    setProjects(response?.data?.data || []);
    setCurrentPage(response?.data?.page || 1);
    setTotalPages(response?.data?.totalPages || 1);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
    // props.toaster({ type: "error", message: error?.data?.message });
  }
};

useEffect(() => {
  getProjectData(1);
}, []);

const projectImages = [
  "/Image/img.png",
  "/Image/img1.png", 
  "/Image/img3.png"
];

  return (
    <>
      {/* Add top padding to account for fixed navbar */}
     <div 
  className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full pt-20" 
  style={{ zIndex: 1 }}
>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent">
          <div className="relative z-10 flex flex-col px-5 md:px-20 justify-start items-start h-full top-48 text-white">
            <p className="text-4xl pb-2 font-semibold mx-6 md:mx-0">We Prepare</p>
            <p className="text-4xl font-semibold  ml-6 md:ml-0">
              For The <span className="text-custom-yellow">Future</span>
            </p>
            <p className="mt-5 ml-6 md:ml-0">
              We provide the best architectural design, construction, and
            </p>
            <p className="ml-6 md:ml-0">building maintenance services for you.</p>

            {/* Input and button */}
            <div className="mt-8 flex flex-col gap-2 w-full  md:flex-row md:gap-4">
              <input
                type="text"
                className="px-5 py-2 rounded text-black w-[89%] mx-5 md:mx-0 md:w-auto"
                placeholder="Enter pin code"
              />
              <button className="px-4 py-2 mx-5 md:mx-0 rounded bg-yellow-600 w-[89%] md:w-auto">
                Search here
              </button>
            </div>

            {/* Right Side Content */}
            <div className="absolute md:right-10 top-72 w-[90%] md:w-[40%] p-5 md:p-10">
              <div className="bg-yellow-600 w-full px-5 py-5 mt-2 rounded">
                <div className="flex gap-2 items-center py-2">
                  <FaCheckCircle />
                  <p>Quality Control System, 100% Satisfaction Guarantee</p>
                </div>
                <div className="flex gap-2 items-center">
                  <FaCheckCircle />
                  <p>Highly Professional Staff, Accurate Testing Processes</p>
                </div>
                <div className="flex gap-2 items-center py-2">
                  <FaCheckCircle />
                  <p>Unrivalled Workmanship, Professional and Qualified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-custom-black">
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

        {/* Left Image and Right Text Section */}
        <div className="bg-custom-white py-16 px-5 md:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left side - Image */}
            <div className="w-full md:w-[50%] lg:w-[60%] mb-6 md:mt-8">
              <img
                src="/Image/projectDscussion.png"
                alt="Construction"
                className="object-cover w-full h-auto"
              />
            </div>

            {/* Right side - Text */}
            <div className="w-full md:w-1/2 pb-10 px-4">
              <p className="text-4xl sf-heading  text-yellow-500">25 Years</p>
              <p className="text-3xl sf-heading font-semibold">of experience!</p>
              <p className="mt-4 text-lg text-white">
                We have a team of experienced professionals who have been in the
                industry for over 25 years. Our contractors have a wealth of
                knowledge and skills that they have acquired over the years,
                making them experts in their field.
              </p>
              <p className="mt-4 text-lg">
                With 25 years of experience, our contractors have a deep
                understanding of industry standards and regulations. We ensure
                that all our projects comply with the latest safety and building
                codes, and that the final product meets or exceeds our client's
                expectations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-yellow-600">
        <div className="hidden md:block">
        <div className="h-full flex justify-between items-center px-5 md:px-28 py-5">
          <div className="text-center mb-4 sm:mb-0">
            <p>Evaluation And Signing</p>
            <p className="text-center text-sm">of The Contract</p>
            <p className="text-center text-xs">step 1</p>
          </div>
          <div className="text-center mb-4 text-white sm:mb-0">
            <p>Preparation Of The</p>
            <p className="text-center text-sm">Work Plan</p>
            <p className="text-center text-xs">step 2</p>
          </div>
          <div className="text-center mb-4 sm:mb-0">
            <p>Implementation Of</p>
            <p className="text-center text-sm">Quality Works</p>
            <p className="text-center text-xs">step 3</p>
          </div>
          <div className="text-center">
            <p>Delivering The Project</p>
            <p className="text-center text-sm">To The Customer</p>
            <p className="text-center text-xs">step 4</p>
          </div>
        </div>
        {/* <hr className="w-[90%] mx-auto py-2" /> */}
        <Image  src="/Image/g1.png"  width={1380}
        height={100} />
         </div>

    
        <div className="flex justify-between px-5 md:px-16 pt-5">
          <p className="text-3xl sf-heading text-custom-black font-semibold">
            Featured Project
          </p>

          {/* Mobile dropdown filter */}
          <button
            onClick={() => toggleFilter(false)}
            className="sm:hidden px-5 py-2 bg-yellow-600 text-white rounded"
          >
            Filter
          </button>

          <div className="hidden sm:flex">
            <ul className="flex gap-5 sf-heading font-semibold ">
              <li className="hover:text-custom-black text-custom-black">
                All Works
              </li>
              <li className="hover:text-custom-black">Construction</li>
              <li className="hover:text-custom-black">Architecture</li>
              <li className="hover:text-custom-black">Building</li>
              <li className="hover:text-custom-black">Renovation</li>
              <li className="hover:text-custom-black">Interior</li>
            </ul>
          </div>
        </div>

        {/* Mobile Filter Dropdown */}
        {isFilterVisible && (
          <div className="sm:hidden bg-custom-black p-5">
            <ul className="flex flex-col gap-3 font-semibold">
              <li
                onClick={handleFilterClick}
                className="hover:text-custom-black"
              >
                All Works
              </li>
              <li
                onClick={handleFilterClick}
                className="hover:text-custom-black"
              >
                Construction
              </li>
              <li
                onClick={handleFilterClick}
                className="hover:text-custom-black"
              >
                Architecture
              </li>
              <li
                onClick={handleFilterClick}
                className="hover:text-custom-black"
              >
                Building
              </li>
              <li
                onClick={handleFilterClick}
                className="hover:text-custom-black"
              >
                Renovation
              </li>
              <li
                onClick={handleFilterClick}
                className="hover:text-custom-black"
              >
                Interior
              </li>
            </ul>
          </div>
        )}
      </div>

      <div>
<div 
  className="px-5 md:px-16 bg-yellow-600 py-12 relative" 
  style={{ zIndex: 1 }}
>
  {/* Simple Loader Overlay */}
  {loading && (
    <div className="absolute inset-0 bg-yellow-600 flex justify-center items-center z-[5]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  )}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
   {projects.slice(0, 3).map((project, index) => (
  <div key={project._id || index}>
    <div className="w-full h-64 overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={project.image}
        alt={project.title || `Project ${index + 1}`}
      />
    </div>
    <div className="mt-2">
      <h3 className="text-lg font-semibold text-black">
        {project.name || `Project ${index + 1}`}
      </h3>
      <p className="text-sm text-gray-800 mt-1">
        {project.projectname?.substring(0, 80) || "Project description"}...
      </p>
    </div>
  </div>
))}
  </div>
  
  {/* Pagination with Numbers and Arrows */}
  <div className="flex justify-center items-center gap-4 mt-6">
    {/* Previous Arrow */}
    <div
      onClick={() => currentPage > 1 && getProjectData(currentPage - 1)}
      className={`cursor-pointer ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
    >
      <FaAngleLeft size={20} />
    </div>
    
    {/* Page Numbers */}
    <div className="flex gap-2">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => getProjectData(pageNumber)}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              currentPage === pageNumber
                ? 'bg-black text-yellow-600'
                : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
    
    {/* Next Arrow */}
    <div
      onClick={() => currentPage < totalPages && getProjectData(currentPage + 1)}
      className={`cursor-pointer ${currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:text-black'}`}
    >
      <FaAngleRight size={20} />
    </div>
  </div>
  
  <div className="flex justify-end pt-4 px-5 text-custom-black font-semibold gap-2 items-center">
    <Link href="/project">
      <p className="cursor-pointer text-white hover:text-yellow-500 transition-all">Explore all projects</p>
    </Link>
    <Link href="/project">
      <FaCircleArrowRight className="cursor-pointer" />
    </Link>
  </div>
</div>
      </div>

      <div className="bg-custom-black pb-10">
        <div className="text-center py-5 px-4 md:px-0">
          <p className="text-yellow-500 text-lg sf-heading  py-4">
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
        {/* left form code start form here */}
      </div>
    </>
  );
}