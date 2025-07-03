import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// 🔑 VWorld API 키
const VWORLD_KEY = '2C432B0A-177E-319F-B4CD-ABBCEC8A9C9D';

// 🗺️ VWorld 타일 URL - 일반(base), 위성(satellite) 지도
const TILE_URLS = {
  base: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Base/{z}/{y}/{x}.png`,
  satellite: `https://api.vworld.kr/req/wmts/1.0.0/${VWORLD_KEY}/Satellite/{z}/{y}/{x}.jpeg`,
};

// ℹ️ 지도 하단에 표시될 저작권 정보
const ATTRIBUTION = '© VWorld';

// 📍 대한민국 지도 확대/이동 범위 제한
const KOREA_BOUNDS = [
  [33.0, 124.0], // 남서쪽
  [39.5, 132.0], // 북동쪽
];

// 📌 MainMap 컴포넌트 정의
const MainMap = ({ mapStyle = 'base', darkMode = false, searchQuery }) => {
  const [markerPosition, setMarkerPosition] = useState(null); // 현재 마커 위치 상태
  const [mapInstance, setMapInstance] = useState(null); // Leaflet map 객체 저장

  // 🌙 다크모드일 때 body 배경색 및 글자색 설정
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#222' : '#fff';
    document.body.style.color = darkMode ? '#fff' : '#000';
  }, [darkMode]);

  // 🔍 검색어가 변경되었을 때 위치를 가져와 지도 중심 이동
  useEffect(() => {
    if (!searchQuery) return;

    const fetchCoords = async () => {
      try {
        const res = await fetch(
          `https://api.vworld.kr/req/search?service=search&request=search&version=2.0&crs=EPSG:4326&size=1&page=1&query=${encodeURIComponent(
            searchQuery
          )}&type=place&format=json&errorformat=json&key=${VWORLD_KEY}`
        );

        const data = await res.json();
        const item = data?.response?.result?.items?.[0];

        if (item) {
          // 🧭 좌표 변환 및 지도 이동
          const lat = parseFloat(item.point.y);
          const lng = parseFloat(item.point.x);
          setMarkerPosition([lat, lng]);
          mapInstance?.setView([lat, lng], 13); // 지도 중심을 검색 위치로 이동
        } else {
          alert('검색 결과가 없습니다.');
        }
      } catch (error) {
        console.error('검색 오류:', error);
        alert('검색 중 문제가 발생했습니다.');
      }
    };

    fetchCoords();
  }, [searchQuery, mapInstance]);

  // 선택된 지도 스타일의 타일 URL 결정
  const tileUrl = TILE_URLS[mapStyle] || TILE_URLS.base;

  return (
    <MapContainer
      center={[36.5, 127.5]}          // 🗺️ 기본 중심 좌표 (대한민국 중심)
      zoom={7}                        // 🔍 초기 줌 레벨
      minZoom={6}                     // 🔒 최소 줌
      maxZoom={17}                    // 🔒 최대 줌
      maxBounds={KOREA_BOUNDS}        // 🧱 대한민국 바운드로 지도 이동 제한
      maxBoundsViscosity={1.0}        // 💡 바운드 벗어날 수 없도록 강제
      scrollWheelZoom={true}          // 🖱️ 마우스 휠 확대/축소 허용
      dragging={true}                 // 🖐️ 지도 드래그 허용
      zoomControl={true}              // ➕➖ 확대/축소 컨트롤 허용
      worldCopyJump={false}           // 🌎 세계 복사 점프 비활성화
      whenCreated={setMapInstance}    // 🧠 map 인스턴스 저장
      style={{ width: '100%', height: '100%' }} // 📐 전체 화면 꽉 채우기
    >
      {/* 🗺️ 실제 지도 타일 레이어 */}
      <TileLayer
        url={tileUrl}
        attribution={ATTRIBUTION}
        noWrap={true} // 지도 가장자리 회색 경계 숨김
      />
    </MapContainer>
  );
};

export default MainMap;