import React, { useRef, useEffect } from "react"
import mapboxgl from "mapbox-gl"
import "./map.css"

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlc2F1cmkiLCJhIjoiY2tieGgzMWRwMGk3bDJxbGpya3B0ZjJ0MSJ9.675WOKVjzYQypCJLa0TFrQ"

const Map = () => {
  const mapElement = useRef(null)
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapElement.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 2,
    })
  }, [])
  return <div ref={mapElement} className="map-container"></div>
}

export default Map
