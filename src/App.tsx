import React, { useState } from 'react';
import styled from 'styled-components';
import frontBody from './assets/frontBody.png';

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
  cursor: pointer;
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
  cursor: pointer;
`;

const boundingBoxes = [
  { name: 'Head', x: 68, y: 5, width: 60, height: 75 },
  { name: 'Chest', x: 57, y: 80, width: 87, height: 60 },
  { name: 'Abdomen', x: 60, y: 140, width: 85, height: 120 },
  { name: 'Left Arm', x: 4, y: 80, width: 50, height: 210 },
  { name: 'Right Arm', x: 147, y: 80, width: 55, height: 210 },
  { name: 'Left Leg', x: 55, y: 260, width: 40, height: 230 },
  { name: 'Right Leg', x: 104, y: 260, width: 40, height: 230 },
];

const App: React.FC = () => {
  const [markers, setMarkers] = useState<{ name: string; x: number; y: number }[]>([]);
  console.log(markers)
  const handleBoxClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    boxName: string,
    boxX: number,
    boxY: number
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const markerIndex = markers.findIndex(
      (marker) => marker.name === boxName && Math.abs(marker.x - (boxX + x)) < 4 && Math.abs(marker.y - (boxY + y)) < 4
    );

    if (markerIndex >= 0) {
      const newMarkers = markers.filter((_, index) => index !== markerIndex);
      setMarkers(newMarkers);
    } else {
      setMarkers([...markers, { name: boxName, x: boxX + x, y: boxY + y }]);
    }
  };

  const handleMarkerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    e.stopPropagation();
    const newMarkers = [...markers];
    newMarkers.splice(index, 1);
    setMarkers(newMarkers);
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
          onClick={(e) => handleBoxClick(e, box.name, box.x, box.y)}
        />
      ))}
      {markers.map((marker, index) => (
        <Marker
          key={index}
          x={marker.x}
          y={marker.y}
          onClick={(e) => handleMarkerClick(e, index)}
        />
      ))}
    </BodyWrapper>
  );
};

export default App;
