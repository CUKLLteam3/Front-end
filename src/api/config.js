// src/api/config.js
// 개발 환경에서는 프록시 사용
export const API_URL ='http://158.180.65.104';

export const API_ENDPOINTS = {
  AIR_QUALITY: '/air-quality',
  CHAT_GUIDANCE: '/chat/json',
  AIR_ACTION: '/air-action' // 테스트용
};

// API 호출 헬퍼 함수
export const apiCall = async (url, options = {}) => {
  try {
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