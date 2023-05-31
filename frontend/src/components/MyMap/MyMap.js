import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import "../../pages/Home/Home.css"

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const styles = {
  height: "17em",
  width: "72.5em",
  borderRadius: "10px",
  position: "absolute"
};

export default function MyMap({locations, startLocation}) {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);

  if ( navigator.geolocation && !startLocation) {
    navigator.geolocation.getCurrentPosition( function(position) {
        startLocation = [position.coords.longitude, position.coords.latitude];               
    });
  }

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
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
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (map && locations) {
      locations.forEach((location) => {
        const marker = new mapboxgl.Marker().setLngLat([location.longitude, location.latitude]).addTo(map);
        marker.getElement().addEventListener('click', () => {
          window.location.href = `/announcement/${location.id}`;
        });
      });
    }
  }, [map, locations]);

  return <div ref={el => (mapContainer.current = el)} style={styles} />;
}