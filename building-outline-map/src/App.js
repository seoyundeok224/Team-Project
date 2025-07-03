import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainMap from './components/MainMap';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [mapStyle, setMapStyle] = useState('osm');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ko');
  const [showEmoji, setShowEmoji] = useState(true);
  const [geoData, setGeoData] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App">
      <Navbar />
      <div className="main-layout">
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
        <div className="map-container">
          <MainMap
            mapStyle={mapStyle}
            language={language}
            darkMode={darkMode}
            searchQuery={searchQuery}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;