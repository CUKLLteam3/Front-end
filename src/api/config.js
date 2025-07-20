// src/api/config.js
// 환경별 API URL 설정
export const API_URL = process.env.NODE_ENV === 'production'
  ? '/api/proxy'  // Vercel 프로덕션: Vercel API Routes 사용
  : '';           // 로컬 개발: Vite 프록시 사용 (빈 문자열)

export const API_ENDPOINTS = {
  AIR_QUALITY: '/air-quality',
  CHAT_GUIDANCE: '/chat/json',
  AIR_ACTION: '/air-action' // 테스트용
};

// API 호출 헬퍼 함수
export const apiCall = async (url, options = {}) => {
  try {
    console.log('API 호출 URL:', url); // 디버깅용
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API 호출 실패:', error);
    throw error;
  }
};