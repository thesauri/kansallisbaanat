import React, { useCallback, useState } from "react"
import mapboxgl from "mapbox-gl"
import "./map.css"
import routes from "../routes/routes"

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlc2F1cmkiLCJhIjoiY2tieGgzMWRwMGk3bDJxbGpya3B0ZjJ0MSJ9.675WOKVjzYQypCJLa0TFrQ"
const CENTER_OF_FINLAND = [25, 65.3]
const ROUTE_COLOR = "rebeccapurple"
const SOUTHWEST_BOUNDS = [0, 55]
const NORTHEAST_BOUNDS = [50, 71.001109]
const MAP_BOUNDS = [SOUTHWEST_BOUNDS, NORTHEAST_BOUNDS]

const Map = () => {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const setupMap = useCallback(mapElement => {
    if (mapElement === null) {
      return
    }
    const map = new mapboxgl.Map({
      container: mapElement,
      style: "mapbox://styles/mapbox/streets-v11",
      center: CENTER_OF_FINLAND,
      zoom: 4,
      maxBounds: MAP_BOUNDS,
    })

    map.on("load", () => addRoutes(map))
    map.on("click", "routes", event => {
      const selectedRoute = event.features[0].properties.name
      setSelectedRoute(selectedRoute)
    })
  }, [])
  return (
    <>
      <div ref={setupMap} className="map-container"></div>
      <div
        className="map-card"
        style={{
          transform: `translateY(${selectedRoute ? -128 : 0}px)`,
        }}
      >
        <h3>{selectedRoute}</h3>
      </div>
    </>
  )
}

const addRoutes = map => {
  const features = routes.map(route => ({
    type: "Feature",
    properties: {
      name: route.name,
    },
    geometry: {
      type: "LineString",
      coordinates: route.routes[0].geometry.coordinates,
    },
  }))
  map.addLayer({
    id: "routes",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features,
      },
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": ROUTE_COLOR,
      "line-width": 5,
      "line-opacity": 0.75,
    },
  })
}

export default Map
