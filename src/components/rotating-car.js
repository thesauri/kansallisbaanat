import React, { useEffect, useState } from "react"
import "./rotating-car.css"

const RotatingCar = () => {
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    const updateRotation = setInterval(
      () => {
        setRotation(rotation - 360)
      },
      rotation === 0 ? 0 : 10000
    )
    return () => clearInterval(updateRotation)
  }, [rotation, setRotation])
  return (
    <div
      className="car-container"
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="car">🚗💨</div>
    </div>
  )
}

export default RotatingCar
