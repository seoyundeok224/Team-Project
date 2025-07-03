import React, { useState } from 'react';

// Sidebar 컴포넌트 정의
const Sidebar = ({
  showEmoji, setShowEmoji,         // 마커 보이기/숨기기 상태 및 설정 함수
  mapStyle, setMapStyle,           // 지도 스타일 (일반/위성) 상태 및 설정 함수
  language, setLanguage,           // 언어 상태 및 설정 함수
  setGeoData,                      // 업로드된 GeoJSON 데이터 설정 함수
  darkMode, setDarkMode,           // 다크 모드 상태 및 설정 함수
  user, setUser,                   // 로그인 상태 및 설정 함수
  searchQuery, setSearchQuery      // 검색어 상태 및 설정 함수
}) => {
  const [inputValue, setInputValue] = useState(''); // 내부 검색어 입력 상태

  // ⌨️ 검색 버튼 클릭 또는 Enter 입력 시 호출되는 함수
  // 도시나 지역 이름을 입력하고 검색하면 지도 중심이 해당 위치로 이동합니다.
  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      setSearchQuery(inputValue);  // 검색어 상태 업데이트 (MainMap에서 처리)
    }
  };

  return (
    <div className={`sidebar ${darkMode ? 'dark' : ''}`}> {/* 다크 모드 적용 */}
      <h2>🛠️ 기능 메뉴</h2>

      {/* 🔍 위치 검색: 도시나 지역 이름을 입력하고 검색하면 지도 중심이 이동합니다 */}
      <h3>위치 검색</h3>
      <input
        type="text"
        className="search-input"
        placeholder="도시나 지역 이름을 입력하세요" // 예: 서울, 부산, 제주 등
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // 입력값 상태 업데이트
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Enter 시 검색 실행
      />
      <button className="search-button" onClick={handleSearch}>🔍 검색</button>

      <hr />

      {/* 🏢 마커 보이기/숨기기 */}
      <button onClick={() => setShowEmoji(!showEmoji)}>
        {showEmoji ? '🏢 마커 숨기기' : '🏢 마커 보이기'}
      </button>

      {/* 🗺️ 지도 스타일 변경 */}
      <h3>지도 스타일</h3>
      <button onClick={() => setMapStyle('base')}>일반 지도</button>
      <button onClick={() => setMapStyle('satellite')}>위성 지도</button>

      {/* 🌐 언어 선택 */}
      <h3>언어</h3>
      <button onClick={() => setLanguage('ko')}>한국어</button>
      <button onClick={() => setLanguage('en')}>영어</button>

      {/* 🌙 다크 모드 전환 */}
      <h3>다크 모드</h3>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '💡 라이트 모드' : '🌙 다크 모드'}
      </button>

      {/* 📁 GeoJSON 파일 업로드 */}
      <h3>GeoJSON</h3>
      <input
        type="file"
        accept=".geojson,application/json" // GeoJSON 파일만 허용
        onChange={e => {
          const file = e.target.files[0];  // 선택한 파일
          const reader = new FileReader(); // 파일 읽기 객체
          reader.onload = () => setGeoData(JSON.parse(reader.result)); // 읽은 결과를 JSON으로 파싱 후 저장
          reader.readAsText(file); // 텍스트로 읽기 시작
        }}
      />

      {/* 🔐 로그인/로그아웃 */}
      <h3>로그인</h3>
      {user
        ? <button onClick={() => setUser(null)}>로그아웃</button>
        : <button onClick={() => setUser({ name: '테스트 사용자' })}>로그인</button>
      }

      {/* 🔄 초기화 (전체 페이지 새로고침) */}
      <button onClick={() => window.location.reload()}>🔄 초기화</button>
    </div>
  );
};

export default Sidebar;