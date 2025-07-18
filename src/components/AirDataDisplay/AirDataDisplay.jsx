// src/components/AirDataDisplay.jsx

import './AirDataDisplay.css';
import { useEffect, useState } from 'react';

function AirDataDisplay({ lat, lon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    setLoading(true);
    fetch(`http://localhost:8080/air-quality?lat=${lat}&lon=${lon}`)
      .then((res) => {
        if (!res.ok) throw new Error('서버 응답 실패');
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, [lat, lon]);

  const getLevel = (value, type) => {
    const num = parseFloat(value);
    if (type === 'pm10') {
      if (num <= 30) return { level: '좋음', color: '#6ec9ff' };
      if (num <= 80) return { level: '보통', color: '#a0e17b' };
      if (num <= 150) return { level: '나쁨', color: '#f6c344' };
      return { level: '매우나쁨', color: '#f45b69' };
    }
    if (type === 'pm25') {
      if (num <= 15) return { level: '좋음', color: '#6ec9ff' };
      if (num <= 35) return { level: '보통', color: '#a0e17b' };
      if (num <= 75) return { level: '나쁨', color: '#f6c344' };
      return { level: '매우나쁨', color: '#f45b69' };
    }
    if (type === 'ozone') {
      if (num <= 0.03) return { level: '좋음', color: '#6ec9ff' };
      if (num <= 0.09) return { level: '보통', color: '#a0e17b' };
      if (num <= 0.15) return { level: '나쁨', color: '#f6c344' };
      return { level: '매우나쁨', color: '#f45b69' };
    }
  };

  if (loading) {
    return <div className="air-box">⏳ 대기질 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="air-box error">❗ {error}</div>;
  }

  if (!data) return null;

  const pm10 = getLevel(data.pm10, 'pm10');
  const pm25 = getLevel(data.pm25, 'pm25');
  const o3 = getLevel(data.o3, 'ozone');

  return (
    <div className="air-box">
      <p>
        오존: <span style={{ color: o3.color }}>{data.o3} ppm</span>
      </p>
      <p>
        PM10: <span style={{ color: pm10.color }}>{data.pm10} µg/m³</span>
        &nbsp;&nbsp;
        PM2.5: <span style={{ color: pm25.color }}>{data.pm25} µg/m³</span>
      </p>
    </div>
  );
}

export default AirDataDisplay;