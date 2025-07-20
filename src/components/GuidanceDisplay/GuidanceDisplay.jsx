// src/components/GuidanceDisplay/GuidanceDisplay.jsx
import { useEffect, useState } from 'react';
import { API_URL, API_ENDPOINTS, apiCall } from '../../api/config';

function GuidanceDisplay({ pm10, o3, stationName }) {
  const [guidance, setGuidance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // props가 없으면 실행하지 않음
    if (pm10 == null || o3 == null) {
      return;
    }

    const fetchGuidance = async () => {
      setLoading(true);
      setError('');

      try {
        const message = JSON.stringify({ 
          pm10,
          o3, 
          stationName: stationName || "현재 위치" 
        });
        
        const url = `${API_URL}${API_ENDPOINTS.CHAT_GUIDANCE}?message=${encodeURIComponent(message)}`;
        const data = await apiCall(url);
        
        setGuidance(data.reply || '행동 지침을 생성할 수 없습니다.');
      } catch (err) {
        console.error('행동 지침 조회 실패:', err);
        setError('행동 지침을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance(); // 함수 호출!
  }, [pm10, o3, stationName]);

  const boldText = (text) => {
    const keywords = ['KF94', '마스크', '착용', '외출', '자제', '주의', '물', '휴식'];
    const parts = text.split(new RegExp(`(${keywords.join('|')})`, 'gi'));

    return parts.map((part, idx) =>
      keywords.some((kw) => kw.toLowerCase() === part.toLowerCase()) ? (
        <strong key={idx}>{part}</strong>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div className="guidance-container">
      <h2>🌟 행동 지침</h2>
      <div className="guidance-text">
        {loading && <p className="loading">행동 지침을 생성하는 중...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && guidance && boldText(guidance)}
      </div>
    </div>
  );
}

export default GuidanceDisplay;