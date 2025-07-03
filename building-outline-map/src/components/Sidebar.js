import React, { useState } from 'react';

const Sidebar = ({
  showEmoji, setShowEmoji,
  mapStyle, setMapStyle,
  language, setLanguage,
  setGeoData,
  darkMode, setDarkMode,
  user, setUser,
  searchQuery, setSearchQuery // 검색 관련 props 추가
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    setSearchQuery(inputValue);
  };

  return (
    <div className="sidebar">
      <h2>🛠️ 기능 메뉴</h2>

      {/* 🔍 검색창 추가 */}
      <h3>위치 검색</h3>
      <input
        type="text"
        placeholder="예: 서울시청"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: '100%', marginBottom: '5px' }}
      />
      <button onClick={handleSearch} style={{ width: '100%' }}>🔍 검색</button>

      <hr />

      <button onClick={() => setShowEmoji(!showEmoji)}>
        {showEmoji ? '🏢 마커 숨기기' : '🏢 마커 보이기'}
      </button>

      <h3>지도 스타일</h3>
      <button onClick={() => setMapStyle('osm')}>일반 지도</button>
      <button onClick={() => setMapStyle('satellite')}>위성 지도</button>

      <h3>언어</h3>
      <button onClick={() => setLanguage('ko')}>한국어</button>
      <button onClick={() => setLanguage('en')}>영어</button>

      <h3>다크 모드</h3>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '💡 라이트 모드' : '🌙 다크 모드'}
      </button>

      <h3>GeoJSON</h3>
      <input
        type="file"
        accept=".geojson,application/json"
        onChange={e => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = () => setGeoData(JSON.parse(reader.result));
          reader.readAsText(file);
        }}
      />

      <h3>로그인</h3>
      {user 
        ? <button onClick={() => setUser(null)}>로그아웃</button>
        : <button onClick={() => setUser({ name: '테스트 사용자' })}>로그인</button>
      }

      <button onClick={() => window.location.reload()}>🔄 초기화</button>
    </div>
  );
};

export default Sidebar;