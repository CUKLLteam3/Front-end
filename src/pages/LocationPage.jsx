import React, { useState, useEffect } from 'react';
import Map from '../components/Map/Map';
import useCurrentLocation from '../hooks/useCurrentLocation';
import sendLocation from '../utils/sendLocation';
import './LocationPage.css';

const LocationPage = () => {
  const { location, loading, error } = useCurrentLocation();
  const [sendStatus, setSendStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleLocationSend = async (lat, lng) => {
    setIsSending(true);
    setSendStatus(null);
    
    const result = await sendLocation(lat, lng);
    
    if (result.success) {
      setSendStatus({ type: 'success', message: '위치가 성공적으로 전송되었습니다!' });
    } else {
      setSendStatus({ type: 'error', message: `전송 실패: ${result.error}` });
    }
    
    setIsSending(false);
    
    // 3초 후 상태 메시지 제거
    setTimeout(() => setSendStatus(null), 3000);
  };

  return (
    <div className="location-page">
      <h2>지도와 현재 위치</h2>
      
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
          </div>
        )}
        
        {sendStatus && (
          <div className={`status ${sendStatus.type}`}>
            {sendStatus.type === 'success' ? '✅' : '❌'} {sendStatus.message}
          </div>
        )}
      </div>

      {/* 현재 위치 정보 */}
      {location.lat && location.lng && (
        <div className="location-info">
          <h3>현재 위치 정보</h3>
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
          <button
            onClick={() => handleLocationSend(location.lat, location.lng)}
            disabled={isSending}
            className={`send-location-button ${isSending ? 'sending' : ''}`}
          >
            {isSending ? '찾는 중...' : '내 위치 찾기'}
          </button>
        </div>
      )}

      {/* 지도 */}
      <div className="map-section">
        <h3>지도</h3>
        <Map location={location} onLocationSend={handleLocationSend} />
      </div>
    </div>
  );
};

export default LocationPage;