// src/components/AirDataDisplay/AirDataDisplay.jsx
import './AirDataDisplay.css';
import { useEffect, useState } from 'react';
import { API_URL, API_ENDPOINTS, apiCall } from '../../api/config';

function AirDataDisplay({ lat, lon, onDataUpdate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    // 요청 URL 생성
    const url = `${API_URL}${API_ENDPOINTS.AIR_QUALITY}?lat=${lat}&lon=${lon}`;

    // 같은 lat/lon으로 이미 요청한 경우 중복 요청 방지
    if (data?.lat === lat && data?.lon === lon) return;

    const fetchAirQuality = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall(url);

        // 요청에 사용된 좌표를 함께 저장 (중복 체크용)
        setData({ ...result, lat, lon });

        if (onDataUpdate && result) {
          onDataUpdate(result);
        }
      } catch (err) {
        console.error('대기질 데이터 조회 실패:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAirQuality();
  }, [lat, lon]);

  const getLevel = (value, type) => {
    const num = parseFloat(value);
    
    if (type === 'pm10') {
      if (num <= 30) return { level: '좋음', color: '#6ec9ff' };
      if (num <= 80) return { level: '보통', color: '#a0e17b' };
      if (num <= 150) return { level: '나쁨', color: '#f6c344' };
      return { level: '매우나쁨', color: '#f45b69' };
    }
    
    if (type === 'ozone') {
      if (num <= 0.03) return { level: '좋음', color: '#6ec9ff' };
      if (num <= 0.09) return { level: '보통', color: '#a0e17b' };
      if (num <= 0.15) return { level: '나쁨', color: '#f6c344' };
      return { level: '매우나쁨', color: '#f45b69' };
    }
    
    return { level: '알수없음', color: '#999' };
  };

  if (loading) {
    return <div className="air-box">⏳ 대기질 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="air-box error">❗ {error}</div>;
  }

  if (!data) return null;

  // PM2.5 제거, PM10과 오존만 표시
  const pm10 = getLevel(data.pm10, 'pm10');
  const o3 = getLevel(data.o3, 'ozone');

  return (
    <div className="air-box">
      {data.stationName && (
        <p className="station-name">📍 측정소: {data.stationName}</p>
      )}
      <p>
        오존: <span style={{ color: o3.color }}>{data.o3} ppm</span>
        <span className="level"> ({o3.level})</span>
      </p>
      <p>
        PM10: <span style={{ color: pm10.color }}>{data.pm10} µg/m³</span>
        <span className="level"> ({pm10.level})</span>
      </p>
      {data.dataTime && (
        <p className="data-time">측정시간: {data.dataTime}</p>
      )}
    </div>
  );
}

export default AirDataDisplay;