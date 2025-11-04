import { createContext, useContext, useEffect, useState } from "react";
import { Api } from "@/services/service";

const LocationContext = createContext();
export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
     
      const profileFound = await fetchProfileData();
      if (profileFound) return;
    
      const saved = localStorage.getItem("userLocation");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.location?.lat && parsed?.location?.lng) {
          setLocation(parsed.location);
          setSource(parsed.source || "local");
          return; 
        }
      }


      await fetchCurrentLocation();
    })();
  }, []);

  // ✅ Step 2: Save whenever location changes
  useEffect(() => {
    if (location && source) {
      localStorage.setItem("userLocation", JSON.stringify({ location, source }));
    }
  }, [location, source]);

  // ✅ Fetch profile location from API
  const fetchProfileData = async () => {
    try {
      const response = await Api("get", "getProfile", {});
      if (response?.status && response?.data?.location?.coordinates) {
        const profileLoc = {
          lat: response.data.location.coordinates[1],
          lng: response.data.location.coordinates[0],
        };
        setLocation(profileLoc);
        setSource("profile");
        return true;
      }
      return false;
    } catch (error) {
      console.warn("Profile fetch error:", error);
      return false;
    }
  };


  const fetchCurrentLocation = async () => {
    setLoading(true);
    try {
      if (!("geolocation" in navigator)) {
        throw new Error("Geolocation not supported");
      }

      const permission = await navigator.permissions.query({ name: "geolocation" });
      if (permission.state === "denied") {
        throw new Error("Location permission denied");
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          }
        );
      });

      const current = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setLocation(current);
      setSource("current");
      return current;
    } catch (err) {
      console.warn("Location fetch error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  
  const setProfileLocation = (manualAddressObj) => {
    setLocation(manualAddressObj);
    setSource("profile");
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        source,
        loading,
        setProfileLocation,
        fetchCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
