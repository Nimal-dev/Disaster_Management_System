import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function SOSPage() {
  const [sosMessages, setSosMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/auth/getsos")
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
    if (window.google) {
      initMap();
    }
  }, [sosMessages]); // Re-render the map when sosMessages state changes

  const initMap = () => {
    // Initialize map centered on a specific location (e.g., your default location)
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat:15.1632, lng: 76.6413 },
      zoom: 3.9, // Adjust zoom level as needed
    });

    // Add markers and circles for each SOS message
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

      // Add a glowing circle around the marker
      const circle = new window.google.maps.Circle({
        map: map,
        center: { lat: message.location.latitude, lng: message.location.longitude },
        radius: 500, // Adjust radius as needed
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });
    });
  };

  return (
    <>
      <Sidebar/>
    <div className="content">
    <Navbar/>
    <div class="col-sm-12 col-xl-12 mt-4">
    <div class="bg-secondary rounded h-100 p-4">
      <h1>SOS Alerts</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
    </div>
    </div>

</>
  );
}
export default SOSPage;
