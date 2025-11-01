import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [source, setSource] = useState(null); 

  useEffect(() => {
    const saved = localStorage.getItem("userLocation");
    if (saved) {
      const parsed = JSON.parse(saved);
      setLocation(parsed.location);
      setSource(parsed.source);
    }
  }, []);


  useEffect(() => {
    if (location && source) {
      localStorage.setItem("userLocation", JSON.stringify({ location, source }));
    }
  }, [location, source]);


  const fetchCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject("Geolocation not supported");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const current = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(current);
          setSource("current");
          resolve(current);
        },
        (err) => reject(err)
      );
    });
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
        setProfileLocation,
        fetchCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
