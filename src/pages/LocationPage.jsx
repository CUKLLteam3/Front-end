// src/pages/LocationPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import Map from '../components/Map/Map';
import useCurrentLocation from '../hooks/useCurrentLocation';
import './LocationPage.css';

const LocationPage = ({ onLocationUpdate }) => {
  const { location, loading, error } = useCurrentLocation();
  const [showMap, setShowMap] = useState(false);

  // 위치가 업데이트되면 부모 컴포넌트에 전달 (같은 좌표 반복 호출 방지)
  const prevLocationRef = useRef(null);
  useEffect(() => {
    if (
      location.lat &&
      location.lng &&
      onLocationUpdate &&
      JSON.stringify(prevLocationRef.current) !== JSON.stringify(location)
    ) {
      onLocationUpdate(location);
      prevLocationRef.current = location;
      setShowMap(true);
    }
  }, [location, onLocationUpdate]);

  const [manualLocation, setManualLocation] = useState(null);

  const fetchManualLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setManualLocation(coords);
        if (
          onLocationUpdate &&
          JSON.stringify(prevLocationRef.current) !== JSON.stringify(coords)
        ) {
          onLocationUpdate(coords);
          prevLocationRef.current = coords;
          setShowMap(true);
        }
      },
      (err) => {
        alert('위치 정보를 가져오는 데 실패했습니다.');
        console.error(err);
      }
    );
  };

  const handleRefreshLocation = () => {
    window.location.reload();
  };

  return (
    <div className="location-page">
      
      {/* 상태 표시 */}
      <div className="status-container">
        {loading && (
          <div className="status loading">
            <span className="spinner">⌛</span> 위치 정보를 가져오는 중...
          </div>
        )}
        
        {error && (
          <div className="status error">
            ❌ {error}
            <button onClick={handleRefreshLocation} className="retry-button">
              다시 시도
            </button>
          </div>
        )}
      </div>

      <button onClick={fetchManualLocation} className="retry-button">
        📍 내 위치 찾기
      </button>

      {/* 현재 위치 정보
      {location.lat && location.lng && (
        <div className="location-info">
          <h3>위치 정보</h3>
          <div className="location-details">
            <div>
              <span className="label">위도:</span>
              <span className="value">{location.lat.toFixed(6)}</span>
            </div>
            <div>
              <span className="label">경도:</span>
              <span className="value">{location.lng.toFixed(6)}</span>
            </div>
          </div>
        </div>
      )} */}

      {/* 지도 */}
      {showMap && location.lat && location.lng && (
        <div className="map-section square">
          <Map location={location} />
        </div>
      )}
    </div>
  );
};

export default LocationPage;