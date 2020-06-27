import React, { useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "./map.css"
import routes from "../routes/routes"

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhlc2F1cmkiLCJhIjoiY2tieGgzMWRwMGk3bDJxbGpya3B0ZjJ0MSJ9.675WOKVjzYQypCJLa0TFrQ"
const CENTER_OF_FINLAND = [25, 65.3]
const ROUTE_COLOR = "rebeccapurple"

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
    })

    map.on("load", () => addRoutes(map))
  }, [])
  return <div ref={setupMap} className="map-container"></div>
}

const addRoutes = map => {
  const routeData = routes[0].routes[0]
  const route = routeData.geometry.coordinates
  map.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
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
}

export default Map
