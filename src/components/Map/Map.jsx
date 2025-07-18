import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Leaflet 기본 마커 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// 지도 중심을 변경하는 컴포넌트
const ChangeMapView = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center[0] && center[1]) {
      map.setView(center, 15);
    }
  }, [center, map]);
  
  return null;
};

const Map = ({ location, onLocationSend }) => {
  const mapRef = useRef(null);
  const mapCenter = location.lat && location.lng 
    ? [location.lat, location.lng] 
    : [37.5665, 126.9780]; // 서울 기본 좌표

  return (
    <div className="map-container">
      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={15}
        style={{ width: '100%', height: '400px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ChangeMapView center={mapCenter} />
        {location.lat && location.lng && (
          <Marker position={[location.lat, location.lng]}>
            <Popup>
              <div className="popup-content">
                <p><strong>현재 위치</strong></p>
                <p>위도: {location.lat.toFixed(6)}</p>
                <p>경도: {location.lng.toFixed(6)}</p>
                <button
                  onClick={() => onLocationSend(location.lat, location.lng)}
                  className="send-button"
                >
                  위치 전송
                </button>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;