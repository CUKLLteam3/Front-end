import Map from './components/Map/Map';
import AirDataDisplay from './components/AirDataDisplay/AirDataDisplay';
import GuidanceDisplay from './components/GuidanceDisplay/GuidanceDisplay';
import './App.css';
import React from 'react';
import LocationPage from './pages/LocationPage';

function App() {
  return (
    <div className="App">
      <h1>AirAction Frontend</h1>
      <section className="component-section">
        <LocationPage />
      </section>
      {/* 기존 Map 컴포넌트는 LocationPage 안에 포함되어 있으므로 주석 처리
      <section className="component-section">
        <Map />
      </section>
      */}
      <section className="component-section">
        <AirDataDisplay />
      </section>
      <section className="component-section">
        <GuidanceDisplay />
      </section>
    </div>
  );
}

export default App;