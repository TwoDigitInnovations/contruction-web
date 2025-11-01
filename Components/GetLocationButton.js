import React, { useState } from "react";

export default function LocationPicker({ createProject, setCreateProject }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = () => {
    setError(null);
    setLoading(true);

    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        let address = "";
        let city = "";
        let state = "";
        let country = "";
        let pincode = "";

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          address = data.display_name || "";

          // Extract optional fields safely
          const components = data.address || {};
          city = components.city || components.town || components.village || "";
          state = components.state || "";
          country = components.country || "";
          pincode = components.postcode || "";
        } catch (err) {
          console.warn("Address fetch failed:", err);
        }

        
        const updatedData = {
          ...createProject,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          address: address,
        };

        // ✅ Only set these fields if they exist in createProject
        if ("city" in createProject) updatedData.city = city;
        if ("state" in createProject) updatedData.state = state;
        if ("country" in createProject) updatedData.country = country;
        if ("pincode" in createProject) updatedData.pincode = pincode;

        setCreateProject(updatedData);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) setError("Permission denied.");
        else if (err.code === 2) setError("Position unavailable.");
        else if (err.code === 3) setError("Timeout getting position.");
        else setError("Error getting location.");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="w-full px-3 py-2 border text-black border-gray-300 rounded"
          placeholder="Auto-filled or enter manually"
          value={createProject?.address || ""}
          onChange={(e) =>
            setCreateProject({ ...createProject, address: e.target.value })
          }
        />
        <button
          type="button"
          onClick={getLocation}
          disabled={loading}
          className="px-4 py-2 bg-yellow-600 text-white rounded"
        >
          {loading ? "Getting Location..." : "Use My Current Location"}
        </button>
      </div>

      {createProject?.location?.coordinates?.length > 0 && (
        <p className="text-sm text-gray-400 mt-1">
          Lat: {createProject.location.coordinates[1].toFixed(6)}, Lon:{" "}
          {createProject.location.coordinates[0].toFixed(6)}
        </p>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
