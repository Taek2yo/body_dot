import React, { useState, useEffect } from "react";
import styled from "styled-components";
import frontBody from "../assets/frontBody.png";

const BodyWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  top: 70px;
  width: 208px;
  height: 502px;
  background: url(${frontBody}) no-repeat center/contain;
`;

const Box = styled.div<{ x: number; y: number; width: number; height: number }>`
  position: absolute;
  border: 1px solid red;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const Marker = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: blue;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

const boundingBoxes = [
  { name: "Head", x: 68, y: 5, width: 60, height: 75 },
  { name: "Chest", x: 57, y: 80, width: 87, height: 60 },
  { name: "Abdomen", x: 60, y: 140, width: 85, height: 120 },
  { name: "Left Arm", x: 4, y: 80, width: 50, height: 210 },
  { name: "Right Arm", x: 147, y: 80, width: 55, height: 210 },
  { name: "Left Leg", x: 55, y: 260, width: 40, height: 230 },
  { name: "Right Leg", x: 104, y: 260, width: 40, height: 230 },
];

const GetMarkers: React.FC = () => {
  const [markers, setMarkers] = useState<
    {
      markers: { name: string; x: number; y: number };
      name: string;
      x: number;
      y: number;
    }[]
  >([]);

  const fetchMarkers = async () => {
    try {
      const response = await fetch("http://localhost:4000/markers");
      if (!response.ok) {
        throw new Error("Failed to fetch markers");
      }
      const data = await response.json();
      setMarkers(data || []);
    } catch (error) {
      console.error("Error fetching markers:", error);
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const getRelativeMarkerPosition = (marker: {
    name: string;
    x: number;
    y: number;
  }) => {
    const box = boundingBoxes.find((box) => box.name === marker.name);
    if (box) {
      return {
        x: marker.x - box.x,
        y: marker.y - box.y,
      };
    }
    return { x: marker.x, y: marker.y };
  };

  return (
    <BodyWrapper>
      {boundingBoxes.map((box) => (
        <Box
          key={box.name}
          x={box.x}
          y={box.y}
          width={box.width}
          height={box.height}
        />
      ))}
      {markers.map((marker, index) => {
        console.log(marker);
        const relativePos = getRelativeMarkerPosition(marker);
        // console.log(relativePos);
        return <Marker key={index} x={relativePos.x} y={relativePos.y} />;
      })}
    </BodyWrapper>
  );
};

export default GetMarkers;
