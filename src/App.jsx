// src/App.jsx
import { useState } from 'react';
import LocationPage from './pages/LocationPage';
import AirDataDisplay from './components/AirDataDisplay/AirDataDisplay';
import GuidanceDisplay from './components/GuidanceDisplay/GuidanceDisplay';
import './App.css';

function App() {
  // 상태 관리
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [airData, setAirData] = useState({ 
    pm10: null, 
    pm25: null, 
    o3: null,
    stationName: null 
  });

  // LocationPage에서 위치 정보 받기
  const handleLocationUpdate = (locationData) => {
    console.log('위치 업데이트:', locationData);
    setLocation({
      lat: locationData.lat,
      lon: locationData.lng || locationData.lon
    });
  };

  // AirDataDisplay에서 대기질 데이터 받기
  const handleAirDataUpdate = (data) => {
    console.log('대기질 데이터 업데이트:', data);
    setAirData({
      pm10: data.pm10,
      pm25: data.pm25 || data["pm2.5"], // API 응답 키 이름 대응
      o3: data.o3,
      stationName: data.stationName
    });
  };

  return (
    <div className="App">
      <h1>AirAction</h1>
      
      <section className="component-section">
        <GuidanceDisplay 
          pm10={airData.pm10}
          o3={airData.o3}
          stationName={airData.stationName || "현재 위치"}
        />
      </section>
      
      {/* 대기질 정보 섹션 - 위치가 있을 때만 표시 */}
      {location.lat && location.lon && (
        <section className="component-section">
          <h2>대기질 정보</h2>
          <AirDataDisplay 
            lat={location.lat} 
            lon={location.lon}
            onDataUpdate={handleAirDataUpdate}
          />
        </section>
      )}

      {/* 위치 정보 섹션 */}
      <section className="component-section">
        <LocationPage onLocationUpdate={handleLocationUpdate} />
      </section>
      
    </div>
  );
}

export default App;