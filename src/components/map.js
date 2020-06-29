import React, { useCallback } from "react"
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
  }, [])
  return <div ref={setupMap} className="map-container"></div>
}

const addRoutes = map => {
  routes.forEach(route => {
    const routeData = route.routes[0]
    const routeCoordinates = routeData.geometry.coordinates
    map.addLayer({
      id: `route-${route.uuid}`,
      type: "line",
      source: {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
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
  })
}

export default Map
