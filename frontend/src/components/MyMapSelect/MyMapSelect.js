import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import "../../pages/Home/Home.css"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const styles = {
  height: "9em",
  width: "40em",
  borderRadius: "10px",
  position: "relative"
};

export default function MyMapSelect({onLocationSelect}) {
  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapContainer = useRef(null);
  var startLocation = [0, 0];

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( function(position) {
        startLocation = [position.coords.longitude, position.coords.latitude];               
    });
  }

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: startLocation,
        zoom: 12
      });

      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      );

      map.on("load", () => {
        setMap(map);
        map.resize();
      });

      map.on('click', (e) => {
        const { lngLat } = e;
        setSelectedLocation(lngLat);
        console.log(lngLat);
        onLocationSelect(lngLat);
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (map && selectedLocation) {
        const marker = new mapboxgl.Marker().setLngLat(selectedLocation).addTo(map);
    }
  }, [map, selectedLocation]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
}