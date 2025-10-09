// import React, { useEffect, useState } from "react";
// import { CiCirclePlus } from "react-icons/ci";
// import { ImCross } from "react-icons/im";
// import { RiBattery2ChargeLine } from "react-icons/ri";
// import { MdOutlinePendingActions } from "react-icons/md";
// import { HiClipboardList } from "react-icons/hi";
// import { HiChevronRight } from "react-icons/hi";
// import { MdOutlineDashboardCustomize } from "react-icons/md";
// import { PiFireTruckFill } from "react-icons/pi";
// import { useRouter } from "next/router";
// import ClintEnquery from "./clintEnquery";
// import { Api } from "@/services/service";
// import { duration } from "@mui/material";

// function Project(props) {
//   const [showForm, setShowForm] = useState(false);
//   const [showDashBoard, setShowDashBoard] = useState(false);
//   const [houshMaking, setHoushMaking] = useState(false);
//   const [projectData, setProjectData] = useState([]);
//   const [houshMakingTwo, setHoushMakingTwo] = useState(false);
//   const [createProject, setCreateProject] = useState({
//     name: "",
//     projectname: "",
//     location: "",
//     startdate: "",
//     duration: "",
//   });
//   const router = useRouter();

//   const handleOpenForm = () => setShowForm(true);
//   const handleCloseForm = () => setShowForm(false);

//   useEffect(() => {
//     getProjectData();
//   }, [createProject]);

//   // const userId = localStorage.getItem("_id")
//   // console.log(userId);

//   const submit = (e) => {
//     e.preventDefault();
//     const data = {
//       name: createProject.name,
//       projectname: createProject.projectname,
//       location: createProject.location,
//       duration: createProject.duration,
//       startdate: createProject.startdate,
//     };
//     props.loader(true);
//     Api("post", "createProject", data, router).then(
//       (res) => {
//         props.loader(false);
//         console.log("res==========> create project ::", res);
//         if (res?.status) {
//           handleCloseForm()
//           setCreateProject({
//             name: "",
//             projectname: "",
//             location: "",
//             duration: "",
//           });
//         } else {
//           props.toaster({ type: "error", message: res?.data?.message });
//         }
//       },
//       (error) => {
//         props.loader(false);
//         console.log(error);
//         props.toaster({ type: "error", message: error.message });
//       }
//     );
//   };

//   const getProjectData = () => {
//     props.loader(true);
//     Api("get", "getProjectbyuser", "", router).then(
//       (res) => {
//         console.log("res================> get project :", res);
//         props.loader(false);
//         setProjectData(res?.data);
//       },
//       (error) => {
//         props.loader(false);
//         console.log(error);
//         props.toaster({ type: "error", message: error?.data?.message });
//       }
//     );
//   };

//   return (
//     <div>
//       <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
//         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
//         <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
//           <p className="text-center font-semibold text-4xl md:text-5xl lg:text-6xl text-white">
//             Project
//           </p>
//         </div>
//       </div>

//       <div className="bg-custom-black p-5 px-28">
//         <div className="flex justify-between items-center mb-4">
//           <p className="text-white text-2xl">Projects</p>
//         </div>
//       </div>

//       <div className="bg-custom-black py-10">
//         <div className="flex justify-center flex-col md:flex-row items-center gap-3">
//           <div className="md:w-[22%] w-full cursor-pointer px-16 md:px-0">
//             <div onClick={() => setShowDashBoard(true)}>
//               <img
//                 width="100%"
//                 height="100%"
//                 src="/Image/constructionProject.png"
//                 alt="construction project"
//               />
//             </div>
//             {projectData?.map((item, id) => (
//               <div key={id}>
//                 <p className="text-center pt-2">{item.name}</p>
//                 <p className="text-center">{item?.projectname}</p>
//                 <p className="text-center">
//                    {item?.location}
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="md:w-[22%] w-full px-16 cursor-pointer md:px-0">
//             <div onClick={() => setHoushMaking(true)}>
//               <img
//                 width="100%"
//                 height="100%"
//                 src="/Image/constructionProject.png"
//                 alt="construction project"
//               />
//             </div>
//             <p className="text-center pt-2">Rohan</p>
//             <p className="text-center">House Making</p>
//             <p className="text-center">
//               TX- 254 colony main road new delhi 110059
//             </p>
//           </div>
//           <div className="md:w-[22%] w-full cursor-pointer px-16 md:px-0">
//             <div onClick={() => setHoushMakingTwo(true)}>
//               <img
//                 width="100%"
//                 height="100%"
//                 src="/Image/constructionProject.png"
//                 alt="construction project"
//               />
//             </div>
//             <p className="text-center pt-2">Rohan</p>
//             <p className="text-center">House Making</p>
//             <p className="text-center">
//               TX- 254 colony main road new delhi 110059
//             </p>
//           </div>

//           <div className="md:w-[22%] w-full px-20 md:px-0 flex flex-col items-center">
//             <div className="relative w-full md:h-[450px] h-80 rounded-lg bg-gray-600 flex items-center justify-center">
//               {/* Plus icon only click handler */}
//               <div
//                 onClick={handleOpenForm}
//                 className="flex items-center justify-center text-black bg-white rounded-full py-3 px-3 cursor-pointer"
//               >
//                 <CiCirclePlus className="text-3xl" />
//               </div>
//             </div>
//             <p className="pt-2">Add new Project</p>
//           </div>
//         </div>
//       </div>

//       {/* client enquery code start */}
//       {/* left form code start form here */}
//       <ClintEnquery />
//       {/* left form code start form here */}
//       <hr className="w-[95%] mx-auto mt-10" />
//       {/* client enquery code end */}

//       {/* Popup form */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
//           <div className="bg-custom-black md:mt-48 sm:mt-20 w-full md:w-[450px] p-8 rounded-lg mx-4 md:mx-0">
//             <div onClick={handleCloseForm} className="flex justify-end">
//               <ImCross className="cursor-pointer text-yellow-600" />
//             </div>
//             <h2 className="text-2xl text-center font-semibold mb-4">
//               Add New Project
//             </h2>

//             <form onSubmit={submit}>
//               <div className="mb-4">
//                 <label className="block mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border text-black border-gray-300 rounded"
//                   placeholder="Enter full name"
//                   value={createProject.name}
//                   onChange={(e) => {
//                     setCreateProject({
//                       ...createProject,
//                       name: e.target.value,
//                     });
//                   }}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Project Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border text-black border-gray-300 rounded"
//                   placeholder="Enter project name"
//                   value={createProject.projectname}
//                   onChange={(e) => {
//                     setCreateProject({
//                       ...createProject,
//                       projectname: e.target.value,
//                     });
//                   }}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Location</label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border text-black border-gray-300 rounded"
//                   placeholder="Enter location"
//                   value={createProject.location}
//                   onChange={(e) => {
//                     setCreateProject({
//                       ...createProject,
//                       location: e.target.value,
//                     });
//                   }}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Upload Image</label>
//                 <input
//                   type="file"
//                   className="w-full px-3 py-2 border border-gray-300 rounded"
//                   // required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Start Date</label>
//                 <input
//                   type="date"
//                   className="w-full px-3 py-2 border text-custom-black border-gray-300 rounded"
//                   placeholder="dd/mm/yy"
//                   value={createProject.startdate}
//                   onChange={(e) => {
//                     setCreateProject({
//                       ...createProject,
//                       startdate: e.target.value,
//                     });
//                   }}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block mb-2">Duration of Project</label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border text-black border-gray-300 rounded"
//                   placeholder="Enter project duration"
//                   value={createProject.duration}
//                   onChange={(e) => {
//                     setCreateProject({
//                       ...createProject,
//                       duration: e.target.value,
//                     });
//                   }}
//                   required
//                 />
//               </div>
//               <div className="flex justify-center gap-4">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-yellow-600 w-full mt-5 mb-5 text-white rounded"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Dashboard Popup */}
//       {showDashBoard && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
//           <div className="bg-custom-black w-full md:w-[450px] px-8 py-4 rounded-lg mx-4 md:mx-0">
//             <div
//               onClick={() => setShowDashBoard(false)}
//               className="flex justify-end "
//             >
//               <ImCross className="cursor-pointer  text-center text-white" />
//             </div>
//             <h2 className="text-2xl text-center font-semibold mb-4">
//               Dashboard
//             </h2>

//             <form>
//               <div className="mb-4 relative  ">
//                 <RiBattery2ChargeLine className="absolute text-2xl text-yellow-500 top-4 left-3" />
//                 <p
//                    className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
//                 >  
//                   Total order 5
//                 </p>
//               </div>
//               <div className="mb-4 relative">
//                 <HiClipboardList className="absolute text-2xl text-yellow-500 top-3 left-3" />
//                 <p
//                    className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
//                 >  
//                   Order approved 11
//                 </p>
//               </div>
//               <div className="mb-4 relative">
//                 <MdOutlinePendingActions className="absolute text-2xl text-yellow-500 top-3 left-3" />
//                 <p
//                    className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
//                 >  
//                  Order pending 10
//                 </p>
//               </div>

//               <div className="flex justify-center gap-4 mt-14">
//                 <button
//                    onClick={() => setShowDashBoard(false)}
//                   // type="submit"
//                   className="px-4 py-2 bg-yellow-600 w-full mt-5 mb-5 text-white rounded"
//                 >
//                   Back
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//       {/* Dashboard Popup */}

//       {/* Housh Making popup */}
//       {houshMaking && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
//           <div className="bg-custom-black mt-10 w-full max-w-lg px-6 py-4 rounded-lg mx-auto md:mx-0">
//             <div
//               onClick={() => setHoushMaking(false)}
//               className="flex justify-end"
//             >
//               <ImCross className="cursor-pointer text-center text-white" />
//             </div>
//             <h2 className="text-2xl text-center font-semibold mb-4">
//               House Making
//             </h2>

//             <div className="mb-4 relative mt-5">
//               <div className="w-full bg-white py-3 mb-5 rounded flex justify-between pl-8 px-2">
//                 <div>
//                   <MdOutlineDashboardCustomize className="absolute text-2xl text-yellow-500 top-3 left-3" />
//                   <p className="px-5 text-custom-black">Dashboard</p>
//                 </div>
//                 <HiChevronRight className="text-yellow-500 text-xl" />
//               </div>

               
//               <div className="grid grid-cols-2 gap-4 md:gap-7">
//                 <div className=" bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Order</p>
//                   <p className="text-black">Concrete</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Ballast</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Sand</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Bill of</p>
//                   <p className="text-black">Quantities</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Exhauster</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Book</p>
//                   <p className="text-black">Inspection</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {/* Housh Making popup */}

//       {/* Housh Making popup 2 */}
//       {houshMakingTwo && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
//           <div className="bg-custom-black mt-10 w-full max-w-lg px-6 py-4 rounded-lg mx-auto md:mx-0">
//             <div
//               onClick={() => setHoushMakingTwo(false)}
//               className="flex justify-end"
//             >
//               <ImCross className="cursor-pointer text-center text-white" />
//             </div>
//             <h2 className="text-2xl text-center font-semibold mb-4">
//               House Making
//             </h2>

//             <div className="mb-4 relative mt-5">
//               <div className="w-full bg-white py-3 mb-5 rounded flex justify-between pl-8 px-2">
//                 <div>
//                   <MdOutlineDashboardCustomize className="absolute text-2xl text-yellow-500 top-3 left-3" />
//                   <p className="px-5 text-custom-black">Dashboard</p>
//                 </div>
//                 <HiChevronRight className="text-yellow-500 text-xl" />
//               </div>

              
//               <div className="grid grid-cols-2 gap-4 md:gap-7">
//                 <div
//                   onClick={() => router.push("/Order/orderConcrete")}
//                   className="bg-yellow-600 cursor-pointer text-center border rounded-md border-gray-400 py-4"
//                 >
//                   <PiFireTruckFill className="text-white text-3xl mx-auto" />
//                   <p className="text-black">Order</p>
//                   <p className="text-black">Concrete</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Ballast</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Sand</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Bill of</p>
//                   <p className="text-black">Quantities</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Exhauster</p>
//                 </div>

//                 <div className="bg-white text-center border rounded-md border-gray-400 py-4">
//                   <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
//                   <p className="text-black">Book</p>
//                   <p className="text-black">Inspection</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

      
//     </div>
//   );
// }

// export default Project;

















import React, { useEffect, useRef, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { RiBattery2ChargeLine } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiClipboardList } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiFireTruckFill } from "react-icons/pi";
import { useRouter } from "next/router";
import ClintEnquery from "./clintEnquery";
import { Api, ApiFormData } from "@/services/service";
import { duration } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

function Project(props) {
  const [showForm, setShowForm] = useState(false);
  const [showDashBoard, setShowDashBoard] = useState(false);
  const [houshMaking, setHoushMaking] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [houshMakingTwo, setHoushMakingTwo] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
const [editingProjectId, setEditingProjectId] = useState(null);
const [selectedImages, setSelectedImages] = useState([]);
const [selectedDocuments, setSelectedDocuments] = useState([])


  const [createProject, setCreateProject] = useState({
    name: "",
    projectname: "",
    location: "",
    startdate: "",
    duration: "",
     image: [],
     documents: []
  });
  const router = useRouter();

  const handleOpenForm = () => setShowForm(true);
 const handleCloseForm = () => {
  setShowForm(false);
  setIsEditMode(false);
  setEditingProjectId(null);
   setSelectedDocuments([]);
   setSelectedImages([]);
  setCreateProject({
    name: "",
    projectname: "",
    location: "",
    startdate: "",
    duration: "",
     image: [],
      documents: []
  });
};



const handleDocumentChange = (e) => {
  const files = Array.from(e.target.files);
  
  // Validate PDF files only
  const validFiles = files.filter(file => {
    const isValidType = file.type === 'application/pdf';
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
    
    if (!isValidType) {
      props.toaster({ type: "error", message: `Invalid file type: ${file.name}. Only PDF files allowed.` });
      return false;
    }
    if (!isValidSize) {
      props.toaster({ type: "error", message: `File too large: ${file.name}` });
      return false;
    }
    return true;
  });
  
  if (validFiles.length === 0) {
    return;
  }
  
  setSelectedDocuments(validFiles);
};
  const hasCheckedAuth = useRef(false);
useEffect(() => {
  const checkAuth = async () => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      props.toaster({ 
        type: "error", 
        message: "Please login to access project" 
      });
      
      setTimeout(() => {
        router.replace('/auth/signIn');
      }, 1500);
      return;
    }

    getProjectData();
    getCurrentLocation();
  };

  checkAuth();
}, []);


const handleEdit = (project) => {
  setIsEditMode(true);
  setEditingProjectId(project._id);
  setCreateProject({
    name: project.name,
    projectname: project.projectname,
    location: project.location,
    startdate: project.startdate,
    duration: project.duration,
    image: project.image || [],
    documents: project.documents || [] 
  });
  setSelectedImages([]);
  setSelectedDocuments([]); 
  setShowForm(true);
};

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  
  // Validate file types and sizes
  const validFiles = files.filter(file => {
    const isValidType = file.type.startsWith('image/');
    const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
    
    if (!isValidType) {
      props.toaster({ type: "error", message: `Invalid file type: ${file.name}` });
      return false;
    }
    if (!isValidSize) {
      props.toaster({ type: "error", message: `File too large: ${file.name}` });
      return false;
    }
    return true;
  });
  
  if (validFiles.length === 0) {
    return;
  }
  
  setSelectedImages(validFiles);
};

const handleDelete = (projectId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      props.loader(true);
      Api("delete", `deleteProject/${projectId}`, "", router).then(
        (res) => {
          props.loader(false);
          if (res?.status) {
            Swal.fire(
              'Deleted!',
              'Project has been deleted successfully.',
              'success'
            );
            getProjectData(); // Refresh the project list
          } else {
            Swal.fire(
              'Error!',
              res?.data?.message || 'Something went wrong.',
              'error'
            );
          }
        },
        (error) => {
          props.loader(false);
          Swal.fire(
            'Error!',
            error.message || 'Something went wrong.',
            'error'
          );
        }
      );
    }
  });
};

 const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const defaultLocation = { lat: 28.6139, lng: 77.2090 };
      setUserLocation(defaultLocation);
      resolve(defaultLocation);
      return;
    }

    // High accuracy options
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0 // Don't use cached location
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("Current location found:", currentLoc, "Accuracy:", position.coords.accuracy);
        setUserLocation(currentLoc);
        resolve(currentLoc);
      },
      (error) => {
        console.log("High accuracy failed, trying with lower accuracy...", error);
        
        // Fallback with lower accuracy
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentLoc = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            console.log("Fallback location found:", currentLoc);
            setUserLocation(currentLoc);
            resolve(currentLoc);
          },
          (fallbackError) => {
            console.log("Location access denied or failed:", fallbackError);
            const defaultLocation = { lat: 28.6139, lng: 77.2090 };
            setUserLocation(defaultLocation);
            resolve(defaultLocation);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000 
          }
        );
      },
      options
    );
  });
};


  const categoryMapping = {
  "concrete": "676e733251be0c9e0ad7426b",        // Order Concrete
  "ballast": "676e75bc51be0c9e0ad7426f",         // Ballast
  "sand": "676e761151be0c9e0ad74274",           
  "bill-of-quantities": "676e763251be0c9e0ad74279",
  "exhauster": "676e733251be0c9e0ad7426b",     
  "book-inspection": "676e765d51be0c9e0ad7427e"  
};


const handleProductClick = async (categoryName) => {
  try {
    props.loader(true);
    
    // First ensure we have current location
    let currentUserLocation = userLocation;
    if (!currentUserLocation) {
      console.log("Getting fresh location...");
      currentUserLocation = await getCurrentLocation();
    }

    const categoryObjectId = categoryMapping[categoryName];
    
    if (!categoryObjectId) {
      props.toaster({ 
        type: "error", 
        message: "Category not found!" 
      });
      props.loader(false);
      return;
    }
    
    const requestData = {
      location: [currentUserLocation.lng, currentUserLocation.lat],
      categoryId: categoryObjectId
    };

    console.log('Sending request with location:', requestData);

    const response = await Api("post", "shopsnearme", requestData, router);
    
    props.loader(false);
    
    if (response?.status && response?.data?.rides?.length > 0) {
      // Navigate with proper location data
      router.push({
        pathname: "/Order/orderConcrete",
        query: {
          category: categoryName,
          userLat: currentUserLocation.lat,
          userLng: currentUserLocation.lng,
          shopsData: JSON.stringify(response.data.rides)
        }
      });
    } else {
      props.toaster({ 
        type: "info", 
        message: "No shops found nearby for this category." 
      });
    }
  } catch (error) {
    props.loader(false);
    console.log("Error fetching nearby shops:", error);
    props.toaster({ 
      type: "error", 
      message: "Error finding nearby shops. Please try again." 
    });
  }
};




const submit = (e) => {
  e.preventDefault();
  
  // Validate required fields
  if (!createProject.name || !createProject.projectname || !createProject.location) {
    props.toaster({ type: "error", message: "Please fill all required fields" });
    return;
  }
  
  const formData = new FormData();
  
  // Append text fields
  formData.append('name', createProject.name.trim());
  formData.append('projectname', createProject.projectname.trim());
  formData.append('location', createProject.location.trim());
  formData.append('duration', createProject.duration.trim() || '');
  formData.append('startdate', createProject.startdate || '');
  
  // Append images - only append if files are selected
  if (selectedImages && selectedImages.length > 0) {
    selectedImages.forEach((image) => {
      formData.append('image', image); // 'image' should match backend field name
    });
  }

  if (selectedDocuments && selectedDocuments.length > 0) {
  selectedDocuments.forEach((document) => {
    formData.append('documents', document);
  });
}
  
  props.loader(true);
  
  const apiEndpoint = isEditMode ? `updateProject/${editingProjectId}` : "createProject";
  const method = isEditMode ? "put" : "post";
  
  ApiFormData(method, apiEndpoint, formData, router).then(
    (res) => {
      props.loader(false);
      if (res?.status) {
        handleCloseForm();
        getProjectData();
        props.toaster({ 
          type: "success", 
          message: isEditMode ? "Project updated successfully" : "Project created successfully" 
        });
      } else {
        props.toaster({ type: "error", message: res?.data?.message || "Operation failed" });
      }
    },
    (error) => {
      props.loader(false);
      props.toaster({ 
        type: "error", 
        message: error?.message || "Something went wrong. Please try again." 
      });
    }
  );
};


  const getProjectData = () => {
    props.loader(true);
    Api("get", "getProjectbyuser", "", router).then(
      (res) => {
        console.log("res================> get project :", res);
        props.loader(false);
        setProjectData(res?.data);
      },
      (error) => {
        props.loader(false);
        console.log(error);
        props.toaster({ type: "error", message: error?.data?.message });
      }
    );
  };

  return (
    <div>
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold  sf-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Project
          </p>
        </div>
      </div>

      <div className="bg-custom-black p-5 px-28">
        <div className="flex justify-between items-center mb-4">
          <p className="text-white sf-heading text-2xl">Projects</p>
        </div>
      </div>

         <div className="bg-custom-black py-10">
        {/* First row with static projects and add new project button */}
        <div className="flex justify-center flex-col md:flex-row items-center gap-3 mb-8">
          <div className="md:w-[22%] w-full cursor-pointer px-16 md:px-0">
            <div onClick={() => setShowDashBoard(true)}>
              <img
                width="100%"
                height="100%"
                src="/Image/constructionProject.png"
                alt="construction project"
              />
            </div>
            <p className="text-center pt-2 text-white">Dashboard Project</p>
          </div>
          
          <div className="md:w-[22%] w-full px-16 cursor-pointer md:px-0">
            <div onClick={() => setHoushMaking(true)}>
              <img
                width="100%"
                height="100%"
                src="/Image/constructionProject.png"
                alt="construction project"
              />
            </div>
            <p className="text-center pt-2 text-white">Rohan</p>
            <p className="text-center text-white">House Making</p>
            <p className="text-center text-white">
              TX- 254 colony main road new delhi 110059
            </p>
          </div>
          
          <div className="md:w-[22%] w-full cursor-pointer px-16 md:px-0">
            <div onClick={() => setHoushMakingTwo(true)}>
              <img
                width="100%"
                height="100%"
                src="/Image/constructionProject.png"
                alt="construction project"
              />
            </div>
            <p className="text-center pt-2 text-white">Rohan</p>
            <p className="text-center text-white">House Making</p>
            <p className="text-center text-white">
              TX- 254 colony main road new delhi 110059
            </p>
          </div>

          {/* Add new project card - fixed position */}
          <div className="md:w-[22%] w-full px-20 md:px-0 flex flex-col items-center">
            <div className="relative w-full md:h-[450px] h-80 rounded-lg bg-gray-600 flex items-center justify-center">
              <div
                onClick={handleOpenForm}
                className="flex items-center justify-center text-black bg-white rounded-full py-3 px-3 cursor-pointer"
              >
                <CiCirclePlus className="text-3xl" />
              </div>
            </div>
            <p className="pt-2 text-white">Add new Project</p>
          </div>
        </div>

        {/* Dynamic project cards from API data - shown below */}
{projectData && projectData.length > 0 && (
  <div className="flex justify-center flex-wrap items-center gap-3">
    {projectData.map((item, id) => (
      <div key={id} className="md:w-[22%] w-full cursor-pointer px-16 md:px-0 relative">
        {/* Edit and Delete icons */}
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(item);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
          >
            <FaEdit className="text-sm" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item._id);
            }}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
          >
            <FaTrash className="text-sm" />
          </button>
        </div>
        
        <div onClick={() => setShowDashBoard(true)} className="relative">
          <img
            width="100%"
            height="100%"
            src={
              item.image && item.image.length > 0 
                ? item.image[0] // First image from array
                : "/Image/constructionProject.png" // Fallback to default image
            }
            alt="construction project"
            className="w-full md:h-[450px] h-80 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "/Image/constructionProject.png"; // Fallback if image fails to load
            }}
          />
        </div>
        <p className="text-center pt-2 text-white">{item.name}</p>
        <p className="text-center text-white">{item?.projectname}</p>
        <p className="text-center text-white">{item?.location}</p>
      </div>
    ))}
  </div>
)}
      </div>

      {/* client enquery code start */}
      <ClintEnquery />
      <hr className="w-[95%] mx-auto mt-10" />
      {/* client enquery code end */}

      {/* Popup form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black md:mt-48 sm:mt-20 w-full md:w-[450px] p-8 rounded-lg mx-4 md:mx-0">
            <div onClick={handleCloseForm} className="flex justify-end">
              <ImCross className="cursor-pointer text-yellow-600" />
            </div>
            <h2 className="text-2xl text-center font-semibold mb-4">
  {isEditMode ? "Edit Project" : "Add New Project"}
</h2>

            <form onSubmit={submit}>
              <div className="mb-4">
                <label className="block mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter full name"
                  value={createProject.name}
                  onChange={(e) => {
                    setCreateProject({
                      ...createProject,
                      name: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter project name"
                  value={createProject.projectname}
                  onChange={(e) => {
                    setCreateProject({
                      ...createProject,
                      projectname: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter location"
                  value={createProject.location}
                  onChange={(e) => {
                    setCreateProject({
                      ...createProject,
                      location: e.target.value,
                    });
                  }}
                  required
                />
              </div>



<div className="mb-4">
              <label className="block mb-2">Upload Image</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={handleImageChange}
              />
              {selectedImages.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    {selectedImages.length} image(s) selected
                  </p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {selectedImages.map((file, index) => (
                      <div key={index} className="text-xs text-gray-400">
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {isEditMode && createProject.image && createProject.image.length > 0 && selectedImages.length === 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-300 mb-2">Current images:</p>
                  <div className="flex gap-2 flex-wrap">
                    {createProject.image.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Project image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* YE NAYA PDF UPLOAD FIELD HAI - YAHAN ADD KARNA HAI */}
            <div className="mb-4">
              <label className="block mb-2">Upload Documents</label>
              <input
                type="file"
                multiple
                accept=".pdf"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={handleDocumentChange}
              />
              {selectedDocuments.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    {selectedDocuments.length} document(s) selected
                  </p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {selectedDocuments.map((file, index) => (
                      <div key={index} className="text-xs text-gray-400">
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {isEditMode && createProject.documents && createProject.documents.length > 0 && selectedDocuments.length === 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-300 mb-2">Current documents:</p>
                  <div className="flex gap-2 flex-wrap">
                    {createProject.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-sm"
                      >
                        Document {index + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-2">Start Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border text-custom-black border-gray-300 rounded"
                placeholder="dd/mm/yy"
                value={createProject.startdate}
                onChange={(e) => {
                  setCreateProject({
                    ...createProject,
                    startdate: e.target.value,
                  });
                }}
                required
              />
            </div>



              
              <div className="mb-4">
                <label className="block mb-2">Duration of Project</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter project duration"
                  value={createProject.duration}
                  onChange={(e) => {
                    setCreateProject({
                      ...createProject,
                      duration: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="flex justify-center gap-4">
               <button
  type="submit"
  className="px-4 py-2 bg-yellow-600 w-full mt-5 mb-5 text-white rounded"
>
  {isEditMode ? "Update Project" : "Submit"}
</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dashboard Popup */}
      {showDashBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black w-full md:w-[450px] px-8 py-4 rounded-lg mx-4 md:mx-0">
            <div
              onClick={() => setShowDashBoard(false)}
              className="flex justify-end "
            >
              <ImCross className="cursor-pointer  text-center text-white" />
            </div>
            <h2 className="text-2xl text-center font-semibold mb-4">
              Dashboard
            </h2>

            <form>
              <div className="mb-4 relative  ">
                <RiBattery2ChargeLine className="absolute text-2xl text-yellow-500 top-4 left-3" />
                <p
                   className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
                >  
                  Total order 5
                </p>
              </div>
              <div className="mb-4 relative">
                <HiClipboardList className="absolute text-2xl text-yellow-500 top-3 left-3" />
                <p
                   className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
                >  
                  Order approved 11
                </p>
              </div>
              <div className="mb-4 relative">
                <MdOutlinePendingActions className="absolute text-2xl text-yellow-500 top-3 left-3" />
                <p
                   className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
                >  
                 Order pending 10
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-14">
                <button
                   onClick={() => setShowDashBoard(false)}
                  className="px-4 py-2 bg-yellow-600 w-full mt-5 mb-5 text-white rounded"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Housh Making popup */}
      {houshMaking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black mt-10 w-full max-w-lg px-6 py-4 rounded-lg mx-auto md:mx-0">
            <div
              onClick={() => setHoushMaking(false)}
              className="flex justify-end"
            >
              <ImCross className="cursor-pointer text-center text-white" />
            </div>
            <h2 className="text-2xl text-center font-semibold mb-4">
              House Making
            </h2>

            <div className="mb-4 relative mt-5">
              <div className="w-full bg-white py-3 mb-5 rounded flex justify-between pl-8 px-2">
                <div>
                  <MdOutlineDashboardCustomize className="absolute text-2xl text-yellow-500 top-3 left-3" />
                  <p className="px-5 text-custom-black">Dashboard</p>
                </div>
                <HiChevronRight className="text-yellow-500 text-xl" />
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-7">
                <div 
                  onClick={() => handleProductClick("concrete")}
                  className=" bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Order</p>
                  <p className="text-black">Concrete</p>
                </div>

                <div 
                  onClick={() => handleProductClick("ballast")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Ballast</p>
                </div>

                <div 
                  onClick={() => handleProductClick("sand")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Sand</p>
                </div>

                <div 
                  onClick={() => handleProductClick("bill-of-quantities")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Bill of</p>
                  <p className="text-black">Quantities</p>
                </div>

                <div 
                  onClick={() => handleProductClick("exhauster")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Exhauster</p>
                </div>

                <div 
                  onClick={() => handleProductClick("book-inspection")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Book</p>
                  <p className="text-black">Inspection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Housh Making popup 2 */}
      {houshMakingTwo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black mt-10 w-full max-w-lg px-6 py-4 rounded-lg mx-auto md:mx-0">
            <div
              onClick={() => setHoushMakingTwo(false)}
              className="flex justify-end"
            >
              <ImCross className="cursor-pointer text-center text-white" />
            </div>
            <h2 className="text-2xl text-center font-semibold mb-4">
              House Making
            </h2>

            <div className="mb-4 relative mt-5">
              <div className="w-full bg-white py-3 mb-5 rounded flex justify-between pl-8 px-2">
                <div>
                  <MdOutlineDashboardCustomize className="absolute text-2xl text-yellow-500 top-3 left-3" />
                  <p className="px-5 text-custom-black">Dashboard</p>
                </div>
                <HiChevronRight className="text-yellow-500 text-xl" />
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-7">
                <div
                  onClick={() => handleProductClick("concrete")}
                  className="bg-yellow-600 cursor-pointer text-center border rounded-md border-gray-400 py-4 hover:bg-yellow-700 transition-colors"
                >
                  <PiFireTruckFill className="text-white text-3xl mx-auto" />
                  <p className="text-black">Order</p>
                  <p className="text-black">Concrete</p>
                </div>

                <div 
                  onClick={() => handleProductClick("ballast")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Ballast</p>
                </div>

                <div 
                  onClick={() => handleProductClick("sand")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Sand</p>
                </div>

                <div 
                  onClick={() => handleProductClick("bill-of-quantities")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Bill of</p>
                  <p className="text-black">Quantities</p>
                </div>

                <div 
                  onClick={() => handleProductClick("exhauster")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Exhauster</p>
                </div>

                <div 
                  onClick={() => handleProductClick("book-inspection")}
                  className="bg-white text-center border rounded-md border-gray-400 py-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                >
                  <PiFireTruckFill className="text-yellow-500 text-3xl mx-auto" />
                  <p className="text-black">Book</p>
                  <p className="text-black">Inspection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;