import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('브라우저가 위치 정보를 지원하지 않습니다.');
      setLoading(false);
      return;
    }

    const successHandler = (position) => {
      setLocation({
        lat: parseFloat(position.coords.latitude.toFixed(6)),
        lng: parseFloat(position.coords.longitude.toFixed(6))
      });
      setLoading(false);
    };

    const errorHandler = (error) => {
      let errorMessage = '위치 정보를 가져올 수 없습니다.';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = '위치 정보 권한이 거부되었습니다.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = '위치 정보를 사용할 수 없습니다.';
          break;
        case error.TIMEOUT:
          errorMessage = '위치 정보 요청 시간이 초과되었습니다.';
          break;
      }
      setError(errorMessage);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    });
  }, []);

  return { location, loading, error };
};

export default useCurrentLocation;