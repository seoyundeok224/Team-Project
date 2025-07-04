import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { fetchBuildingGeoJSON } from '../api/fetchVWorld';

export default function MapView() {
  const [geoData, setGeoData] = useState(null);

  const center = [37.5665, 126.9780];  // 서울 시청
  const zoom = 16;

  useEffect(() => {
    const bbox = '126.97,37.56,127.00,37.58';

    fetchBuildingGeoJSON(bbox)
      .then((result) => {
        console.log('브이월드 응답:', result);

        // 브이월드 응답 구조에서 featureMember 배열 추출
        const members = result?.response?.result?.featureCollection?.featureMember;

        if (members && Array.isArray(members)) {
          // 표준 GeoJSON FeatureCollection으로 변환
          const features = members.map((m) => m.feature);
          const geojson = {
            type: 'FeatureCollection',
            features: features
          };

          console.log('변환된 GeoJSON:', geojson);
          setGeoData(geojson);
        } else {
          console.warn('GeoJSON FeatureCollection이 없음 또는 형식 오류', result);
        }
      })
      .catch((error) => {
        console.error('브이월드 호출 실패:', error);
      });
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://map.vworld.kr">VWorld</a>'
        url={`https://xdworld.vworld.kr/2d/Base/service/{z}/{x}/{y}.png?key=2C432B0A-177E-319F-B4CD-ABBCEC8A9C9D`}
      />

      {geoData && (
        <GeoJSON
          data={geoData}
          style={{
            color: 'red',
            weight: 2,
            fillOpacity: 0.2
          }}
          onEachFeature={(feature, layer) => {
            if (feature.properties) {
              layer.bindPopup(`
                <b>건물 ID:</b> ${feature.id || '-'}
              `);
            }
          }}
        />
      )}
    </MapContainer>
  );
}