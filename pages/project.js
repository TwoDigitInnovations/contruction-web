

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
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import LocationPicker from "@/Components/GetLocationButton";

function Project(props) {
  const [showForm, setShowForm] = useState(false);
  const [showDashBoard, setShowDashBoard] = useState(false);
  const [houshMaking, setHoushMaking] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [data, setData] = useState({})
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
      getCategory();
      getordercount();
    };

    checkAuth();
  }, []);

  const getCategory = async () => {
    props.loader(true);
    try {
      const res = await Api("get", "getCategory", "", router);
      props.loader(false);

      const formattedData = res.data.map((element) => ({
        ...element,
        value: element._id,
        label: element.name,
      }));

      setCategoryData(formattedData);
    } catch (err) {
      props.loader(false);
      console.log(err);
      props.toaster({ type: "error", message: err?.message });
    }
  };

  const getordercount = async () => {
    props.loader(true);
    try {
      const res = await Api("get", "getordercount", "", router);
      props.loader(false);
      setData(res.data)
    } catch (err) {
      props.loader(false);
      console.log(err);
      props.toaster({ type: "error", message: err?.message });
    }
  };



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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types and sizes (images or pdfs only)
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isPDF = file.type === 'application/pdf';
      const isValidType = isImage || isPDF;
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit

      if (!isValidType) {
        props.toaster({
          type: "error",
          message: `Invalid file type: ${file.name} (only images or PDFs allowed)`,
        });
        return false;
      }

      if (!isValidSize) {
        props.toaster({
          type: "error",
          message: `File too large: ${file.name} (max 10MB)`,
        });
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

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
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl p-6 w-[430px]",
        title: "text-lg font-semibold text-gray-800",
        confirmButton:
          "bg-yellow-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-yellow-700 transition",
        cancelButton:
          "bg-gray-300 text-gray-800 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-400 transition",
        actions: "flex justify-center gap-4 mt-4",
      },
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

  const handleProductClick = async (categoryId) => {
    router.push({
      pathname: "/Order/orderConcrete",
      query: {
        category: categoryId,
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!createProject.name || !createProject.projectname || !createProject.location) {
      props.toaster({ type: "error", message: "Please fill all required fields" });
      return;
    }

    const formData = new FormData();


    formData.append('name', createProject.name.trim());
    formData.append('projectname', createProject.projectname.trim());
    formData.append('duration', createProject.duration.trim() || '');
    formData.append('startdate', createProject.startdate || '');

    if (createProject.location) {
      formData.append('location', JSON.stringify(createProject.location));
    }

    if (createProject.address) {
      formData.append('address', createProject.address.trim());
    }


    if (selectedImages && selectedImages.length > 0) {
      selectedImages.forEach((image) => {
        formData.append('billOfQuentity', image);
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
        console.log("res================> get project :", res?.data);
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
    <div className="bg-custom-black">
      <div className="relative bg-[url('/Image/construction.jpg')] bg-cover bg-center h-[50vh] sm:h-[60vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
          <p className="text-center font-semibold  sf-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Project
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-0">
        <div className="py-5 flex justify-between items-center bg-custom-black rounded-t-lg  mb-8">
          <p className="text-white sf-heading text-2xl font-semibold tracking-wide">
            All Projects
          </p>

          <button
            onClick={handleOpenForm}
            className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-4 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <CiCirclePlus className="text-xl" />
            Add Project
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {projectData && projectData?.length && (

            <div className=" items-center gap-3 grid md:grid-cols-3 grid-cols-1">
              {projectData?.map((item, id) => (
                <div key={id} className="w-full cursor-pointer md:px-0 relative">
                  {/* Edit and Delete icons */}
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-800 text-white p-3.5 rounded-full transition-colors"
                    >
                      <FaEdit className="text-md" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="bg-yellow-600 hover:bg-yellow-800 text-white p-3.5 rounded-full transition-colors"
                    >
                      <FaTrash className="text-md" />
                    </button>
                  </div>

                  <div onClick={() => setHoushMaking(true)} className="relative">
                    <img
                      width="100%"
                      height="100%"
                      src={
                        item.image && item.image.length > 0
                          ? item.image[0] // First image from array
                          : "/Image/constructionProject.png" // Fallback to default image
                      }
                      alt="construction project"
                      className="w-full md:h-[450px] h-[400px] object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "/Image/constructionProject.png"; // Fallback if image fails to load
                      }}
                    />
                  </div>
                  <p className="text-center pt-2 text-white">{item.name}</p>
                  <p className="text-center text-white">{item?.projectname}</p>
                  <p className="text-center text-white">{item?.address}</p>
                </div>
              ))}
              <div className="w-full flex flex-col items-center">
                <div
                  onClick={handleOpenForm}
                  className="relative w-full md:h-[530px] h-[400px] rounded-2xl border-2 border-dashed border-gray-300 
               flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 
               hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 
               hover:shadow-lg cursor-pointer group"
                >
                  <div className="flex flex-col items-center justify-center text-gray-800 group-hover:text-yellow-700 transition-colors">
                    <div className="bg-white rounded-full p-4 shadow-md group-hover:scale-110 transition-transform">
                      <CiCirclePlus className="text-5xl" />
                    </div>
                    <p className="pt-3 text-lg md:text-2xl font-semibold">
                      Add New Project
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Click to start creating
                    </p>
                  </div>
                </div>
              </div>

            </div>

          )}
        </div>
      </div>
      <ClintEnquery />



      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6 overflow-y-auto">
          <div className="bg-custom-black md:mt-18 mt-28 sm:mt-20 w-full md:w-[800px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 md:p-8 transform transition-all duration-300 scale-100">

            <div onClick={handleCloseForm} className="flex justify-end">
              <ImCross className="cursor-pointer text-yellow-600" />
            </div>
            <h2 className="text-2xl text-center font-semibold mb-8">
              {isEditMode ? "Edit Project" : "Add New Project"}
            </h2>

            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter full name"
                  value={createProject.name}
                  onChange={(e) =>
                    setCreateProject({ ...createProject, name: e.target.value })
                  }
                  required
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-gray-300">Project Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter project name"
                  value={createProject.projectname}
                  onChange={(e) =>
                    setCreateProject({ ...createProject, projectname: e.target.value })
                  }
                  required
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-gray-300">Location</label>

                <LocationPicker
                  createProject={createProject}
                  setCreateProject={setCreateProject}
                />

              </div>


              <div>
                <label className="block mb-2 font-medium text-gray-300">Start Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border text-custom-black border-gray-300 rounded"
                  value={createProject.startdate}
                  onChange={(e) =>
                    setCreateProject({ ...createProject, startdate: e.target.value })
                  }
                  required
                />
              </div>


              <div>
                <label className="block mb-2 font-medium text-gray-300">Duration of Project</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded"
                  placeholder="Enter project duration"
                  value={createProject.duration}
                  onChange={(e) =>
                    setCreateProject({ ...createProject, duration: e.target.value })
                  }
                  required
                />
              </div>


              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-gray-300">Upload Bill of Quentity</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  onChange={handleFileChange}
                />

                {selectedImages.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{selectedImages.length} image(s) selected</p>
                    <div className="flex gap-2 flex-wrap mt-2">
                      {selectedImages.map((file, index) => (
                        <div key={index} className="text-xs text-gray-600">{file.name}</div>
                      ))}
                    </div>
                  </div>
                )}

                {isEditMode &&
                  createProject.image &&
                  createProject.image.length > 0 &&
                  selectedImages.length === 0 && (
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


              <div className="md:col-span-2 flex justify-center gap-4">

                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-3 bg-gray-200 w-full md:w-1/2 mt-6 text-black font-semibold rounded-lg  transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-600 w-full md:w-1/2 mt-6 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
                >
                  {isEditMode ? "Update Project" : "Submit"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {showDashBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black w-full md:w-[450px] px-8 py-4 rounded-lg mx-4 md:mx-0">
            <div
              onClick={() => {
                setHoushMaking(true)
                setShowDashBoard(false)
              }}
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
                  Total order {data?.totalOrderCount || "0"}
                </p>
              </div>
              <div className="mb-4 relative">
                <HiClipboardList className="absolute text-2xl text-yellow-500 top-3 left-3" />
                <p
                  className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
                >
                  Order approved {data?.totalDeliveredOrder || "0"}
                </p>
              </div>
              <div className="mb-4 relative">
                <MdOutlinePendingActions className="absolute text-2xl text-yellow-500 top-3 left-3" />
                <p
                  className="w-full bg-white text-black px-14 py-4 border border-gray-300 rounded placeholder:text-custom-black"
                >
                  Order pending {data?.totalPendingOrder || "0"}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-14">
                <button
                  onClick={() => {
                    setHoushMaking(true)
                    setShowDashBoard(false)
                  }}
                  className="px-4 py-2 bg-yellow-600 w-full mt-5 mb-5 text-white rounded"
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {houshMaking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50 backdrop-blur overflow-y-auto px-4 py-6 md:py-10">
          <div className="bg-custom-black md:mt-20 mt-10 w-full max-w-lg px-6 py-4 rounded-lg mx-auto md:mx-0">
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
              <div className="w-full bg-white py-3 mb-5 rounded flex justify-between pl-8 px-2"
                onClick={() => {
                  setHoushMaking(false)
                  setShowDashBoard(true)
                }}
              >
                <div>
                  <MdOutlineDashboardCustomize className="absolute text-2xl text-yellow-500 top-3 left-3" />
                  <p className="px-5 text-custom-black cursor-pointer">Dashboard</p>
                </div>
                <HiChevronRight className="text-yellow-500 text-xl" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-7">
                {categoryData?.map((category, index) => (
                  <div
                    key={index}
                    onClick={() => handleProductClick(category._id)}
                    className="bg-white text-center border rounded-md border-gray-400 py-8 cursor-pointer hover:bg-yellow-100 transition-colors shadow-sm hover:shadow-md"
                  >
                    <PiFireTruckFill className="text-yellow-500 text-4xl mx-auto mb-1" />
                    <p className="text-black font-medium">{category.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;