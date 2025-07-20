// sendLocation.js
const BASE_URL = process.env.REACT_APP_API_URL || '';

const sendLocation = async (latitude, longitude) => {
  try {
    const response = await fetch(`${BASE_URL}/api/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('위치 전송 실패:', error);
    return { success: false, error: error.message };
  }
};

export default sendLocation;