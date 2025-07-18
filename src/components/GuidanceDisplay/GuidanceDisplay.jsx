import { useEffect, useState } from 'react';

function GuidanceDisplay({ pm10, pm25, o3, stationName }) {
  const [guidance, setGuidance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGuidance = async () => {
      setLoading(true);
      setError('');

      try {
        const message = JSON.stringify({ pm10, pm25, o3, stationName });
        const res = await fetch(
          `/chat/json?message=${encodeURIComponent(message)}`
        );
        const data = await res.json();
        setGuidance(data.reply);
      } catch (err) {
        setError('행동 지침을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, [pm10, pm25, o3, stationName]);

  const boldText = (text) => {
    const keywords = ['KF94', '마스크', '착용', '외출', '자제', '주의'];
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
    <div>
      <h2>Guidance</h2>
      {loading && <p>행동 지침 불러오는 중...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && guidance && <p>{boldText(guidance)}</p>}
    </div>
  );
}

export default GuidanceDisplay;