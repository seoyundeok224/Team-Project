import React, { useState } from 'react';
import Sidebar from './components/Sidebar';      // 사이드 메뉴 컴포넌트
import MainMap from './components/MainMap';      // 지도 컴포넌트
import Navbar from './components/Navbar';        // 상단 네비게이션 바
import Footer from './components/Footer';        // 하단 푸터
import './App.css';                              // 스타일 시트

function App() {
  // 상태 관리 훅들
  const [showEmoji, setShowEmoji] = useState(true);            // 마커(이모지) 표시 여부
  const [mapStyle, setMapStyle] = useState('base');            // 지도 스타일 (base, satellite 등)
  const [language, setLanguage] = useState('ko');              // 언어 설정 (ko 또는 en)
  const [geoData, setGeoData] = useState(null);                // GeoJSON 파일 데이터
  const [darkMode, setDarkMode] = useState(false);             // 다크 모드 여부
  const [user, setUser] = useState(null);                      // 로그인된 사용자 정보
  const [searchQuery, setSearchQuery] = useState('');          // 검색어 (위치 검색)

  return (
    // 전체 앱 컨테이너, 다크 모드일 경우 'dark' 클래스 포함
    <div className={`App ${darkMode ? 'dark' : ''}`}>

      {/* 상단 네비게이션 바 */}
      <Navbar darkMode={darkMode} />

      {/* 메인 콘텐츠 영역: 사이드바 + 지도 */}
      <div className="main-layout">
        
        {/* 사이드 메뉴 패널: 각종 설정 조작 */}
        <Sidebar
          showEmoji={showEmoji}
          setShowEmoji={setShowEmoji}
          mapStyle={mapStyle}
          setMapStyle={setMapStyle}
          language={language}
          setLanguage={setLanguage}
          setGeoData={setGeoData}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          setUser={setUser}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 지도 표시 영역 */}
        <div className="map-container">
          <MainMap
            mapStyle={mapStyle}
            darkMode={darkMode}
            searchQuery={searchQuery}
          />
        </div>
      </div>

      {/* 하단 푸터 */}
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;