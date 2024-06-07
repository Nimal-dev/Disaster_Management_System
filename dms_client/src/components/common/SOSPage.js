import React, { useState, useEffect } from 'react';

function SOSPage() {
  const [sosMessages, setSosMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/sos")
      .then((res) => res.json())
      .then((data) => {
        setSosMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching SOS messages:", error);
      });
  }, []);

  useEffect(() => {
    // Initialize Google Maps once the component mounts
    initMap();
  }, [sosMessages]); // Re-render the map when sosMessages state changes

  const initMap = () => {
    // Initialize map centered on a specific location (e.g., your default location)
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 0, lng: 0 },
      zoom: 2, // Adjust zoom level as needed
    });

    // Add markers for each SOS message
    sosMessages.forEach((message) => {
      const marker = new window.google.maps.Marker({
        position: { lat: message.location.latitude, lng: message.location.longitude },
        map: map,
        title: message.message,
      });

      // Add info window for each marker
      const infowindow = new window.google.maps.InfoWindow({
        content: `<div><strong>${message.userId}</strong>: ${message.message}</div>`,
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });
    });
  };

  return (
    <div className="container">
      <h1>SOS Alerts</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
}

export default SOSPage;
