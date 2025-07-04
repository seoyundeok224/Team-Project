import axios from 'axios';

/**
 * 프록시 서버를 통해 건물 외곽 GeoJSON을 받아오는 함수
 * bbox: 'minX,minY,maxX,maxY' 형태
 */
export async function fetchBuildingGeoJSON(bbox) {
  try {
    const response = await axios.get('http://localhost:5000/vworld/getfeature', {
      params: { bbox }
    });
    return response.data;
  } catch (error) {
    console.error('프록시 서버 호출 실패:', error);
    throw error;
  }
}