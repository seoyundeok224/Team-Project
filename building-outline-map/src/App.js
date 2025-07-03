import React, { useEffect } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
    
      {/* 지도 컨테이너 */}
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100%' }}
        worldCopyJump={false}  // 🌍 지도 복제 방지
      >
        {/* 지도 타일 */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true} // 💡 타일 반복 방지
        />
        {/* 마커 예시 */}
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A sample building.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;