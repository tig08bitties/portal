'use client';

import { useEffect, useState } from 'react';

interface KeyMapOverlayProps {
  active: boolean;
}

export default function KeyMapOverlay({ active }: KeyMapOverlayProps) {
  const [decodedData, setDecodedData] = useState<any>(null);

  useEffect(() => {
    // Load the decoded coordinate data
    fetch('/key_map_decoded_pictures.json')
      .then(res => res.json())
      .then(data => setDecodedData(data))
      .catch(err => console.error('Failed to load coordinate data:', err));
  }, []);

  if (!active || !decodedData) return null;

  // Extract coordinate mappings
  const keyCoords = decodedData.key?.coords || [];
  const mapCoords = decodedData.map?.coords || [];
  const pathMapping = decodedData.decoded?.path_mapping || {};

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Draw lines connecting key and map coordinates */}
      <svg className="w-full h-full">
        {Object.entries(pathMapping).map(([keyPoint, mapPoint]: [string, any]) => {
          const keyCoord = keyCoords[parseInt(keyPoint)];
          const mapCoord = mapCoords[mapPoint];
          
          if (!keyCoord || !mapCoord) return null;

          return (
            <line
              key={`${keyPoint}-${mapPoint}`}
              x1={keyCoord[0]}
              y1={keyCoord[1]}
              x2={mapCoord[0] + 512} // Offset for map position
              y2={mapCoord[1]}
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="2"
              className="animate-pulse"
            />
          );
        })}
      </svg>

      {/* Highlight key points */}
      {keyCoords.map((coord: number[], index: number) => (
        <div
          key={`key-${index}`}
          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white animate-portal-pulse"
          style={{
            left: `${coord[0]}px`,
            top: `${coord[1]}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Highlight map points */}
      {mapCoords.map((coord: number[], index: number) => (
        <div
          key={`map-${index}`}
          className="absolute w-4 h-4 bg-purple-500 rounded-full border-2 border-white animate-portal-pulse"
          style={{
            left: `${coord[0] + 512}px`, // Offset for map position
            top: `${coord[1]}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}
