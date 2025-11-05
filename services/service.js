import axios from "axios";
  //  const ConstantsUrl = "https://construction-backend-8wa6.onrender.com/v1/api/";

    //  const ConstantsUrl = "https://api.bodmass.com/v1/api/";
 const ConstantsUrl = "http://localhost:3004/v1/api/";
 

function Api(method, url, data, router) {
  return new Promise(function (resolve, reject) {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage?.getItem("token") || "";
    }
    console.log(token);
    axios({
      method,
      url: ConstantsUrl + url,
      data,
      headers: { Authorization: `jwt ${token}` },
    }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        console.log(err);
        if (err.response) {
          if (err?.response?.status === 401) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("userDetail");
              router.push("/auth/signIn");
            }
          }
          reject(err.response.data);
        } else {
          reject(err);
        }
      }
    );
  });
}

function ApiFormData(method, url, data, router) {
  return new Promise(function (resolve, reject) {
    let token = "";
    if (typeof window !== "undefined") {
      token = localStorage?.getItem("token") || "";
    }
    
    console.log("Sending FormData:", data);
    console.log("Token:", token);
    
    // Debug FormData contents
    if (data instanceof FormData) {
      console.log("FormData entries:");
      for (let [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }
    }
    
    axios({
      method,
      url: ConstantsUrl + url,
      data,
      headers: {
        Authorization: `jwt ${token}`,
        // Important: Don't set Content-Type manually for FormData
      },
      timeout: 60000, // Increase timeout to 60 seconds
      maxContentLength: Infinity, // Allow large files
      maxBodyLength: Infinity,    // Allow large request bodies
    }).then(
      (res) => {
        resolve(res.data);
      },
      (err) => {
        console.log("API Error:", err);
        if (err.response) {
          console.log("Error Response:", err.response.data);
          if (err?.response?.status === 401) {
            if (typeof window !== "undefined") {
              localStorage.removeItem("userDetail");
              router.push("/auth/signIn");
            }
          }
          reject(err.response.data);
        } else {
          reject(err);
        }
      }
    );
  });
}

// const timeSince = (date) => {
//   date = new Date(date);
//   const diff = new Date().valueOf() - date.valueOf();
//   const seconds = Math.floor(diff / 1000);
//   var interval = seconds / 31536000;

//   if (interval > 1) {
//     return Math.floor(interval) + " Years";
//   }
//   interval = seconds / 2592000;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       (Math.floor(interval) > 1 ? " Months" : " Month") +
//       " ago"
//     );
//   }
//   interval = seconds / 604800;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       (Math.floor(interval) > 1 ? " Weeks" : " Week") +
//       " ago"
//     );
//   }

//   interval = seconds / 86400;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       (Math.floor(interval) > 1 ? " Days" : " Day") +
//       " ago"
//     );
//   }
//   interval = seconds / 3600;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       (Math.floor(interval) > 1 ? " Hours" : " Hour") +
//       " ago"
//     );
//   }
//   interval = seconds / 60;
//   if (interval > 1) {
//     return (
//       Math.floor(interval) +
//       (Math.floor(interval) > 1 ? " Min" : " min") +
//       " ago"
//     );
//   }
//   return "Just now";
// };

export { Api, ApiFormData };
