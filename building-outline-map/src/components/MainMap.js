import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const MainMap = ({ mapStyle, language, darkMode }) => {
  const [tileUrl, setTileUrl] = useState('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  const [attribution, setAttribution] = useState('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');
  const [markerPosition, setMarkerPosition] = useState([37.5665, 126.978]); // 서울

  useEffect(() => {
    if (mapStyle === 'satellite') {
      setTileUrl('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
    } else {
      setTileUrl('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    }
  }, [mapStyle]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#333' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#000';
  }, [darkMode]);

  const handleMapCreated = (map) => {
    if (!L.Control.Geocoder) {
      console.error('Geocoder 플러그인이 로드되지 않았습니다.');
      return;
    }

    const geocoder = L.Control.Geocoder.nominatim();

    const searchControl = L.Control.geocoder({
      geocoder: geocoder,
      collapsed: false,
      placeholder: '위치를 검색하세요...',
      position: 'topright',
    }).addTo(map);

    searchControl.on('markgeocode', (e) => {
      const { center } = e.geocode;
      setMarkerPosition([center.lat, center.lng]);
      map.setView(center, 13);
    });
  };

  return (
    <MapContainer
      center={markerPosition}
      zoom={13}
      minZoom={5}
      maxZoom={18}
      maxBounds={[[85, -180], [-85, 180]]} // 전 세계 범위 제한
      maxBoundsViscosity={1.0}
      worldCopyJump={false} // 좌우 무한 반복 방지
      style={{ height: '100%', width: '100%' }}
      whenCreated={handleMapCreated}
    >
      <TileLayer
        url={tileUrl}
        attribution={attribution}
      />
      <Marker position={markerPosition}>
        <Popup>선택된 위치</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MainMap;