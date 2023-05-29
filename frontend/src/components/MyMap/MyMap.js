import React, { useState, useRef, useEffect } from 'react';
import Map, {ReactMapGl, GeolocateControl} from 'react-map-gl'
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import Pin from "../../assets/icons/pin.svg";

import "../../pages/Home/Home.css"

mapboxgl.accessToken = ''

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

export default function MyMap() {
  // const [viewport, setViewport] = useState({
  //   width: '100vw',
  //   height: '100vh',
  //   latitude: 40.78343,
  //   longitude: -73.96625,
  //   zoom: 11
  // });

  // return (
  //   <div>
  //     <Map
  //       mapboxAccessToken={mapboxToken}
  //       initialViewState={{
  //         longitude: -100,
  //         latitude: 40,
  //         zoom: 3.5,
  //       }}
  //       mapStyle="mapbox://styles/mapbox/streets-v11"
  //     >
  //       <GeolocateControl
  //         positionOptions={{ enableHighAccuracy: true }}
  //         trackUserLocation={true}
  //       />
  //     </Map>
  //   </div>
  // );
  // const [map, setMap] = useState(null);
  // const mapContainer = useRef(null);

  // useEffect(() => {
  //   mapboxgl.accessToken = mapboxToken;
  //   const initializeMap = ({ setMap, mapContainer }) => {
  //     const map = new mapboxgl.Map({
  //       container: mapContainer.current,
  //       style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
  //       center: [0, 0],
  //       zoom: 5
  //     });

  //     map.on("load", () => {
  //       setMap(map);
  //       map.resize();
  //     });
  //   };

  //   if (!map) initializeMap({ setMap, mapContainer });
  // }, [map]);

  // return <div ref={el => (mapContainer.current = el)} style={styles} />;


  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}