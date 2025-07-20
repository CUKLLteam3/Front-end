// api/proxy.js
export default async function handler(req, res) {
  // 정확한 백엔드 주소 (포트 없음)
  const baseUrl = process.env.TARGET_API_URL || 'http://158.180.65.104';
  const targetPath = req.url.replace(/^\/api\/proxy/, '');
  const targetUrl = `${baseUrl}${targetPath}`;

  console.log(`Proxying request to: ${targetUrl}`); // 디버깅용

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Vercel-Proxy/1.0',
      },
      // POST 요청 등의 body 처리
      body: ['POST', 'PUT', 'PATCH'].includes(req.method) ? JSON.stringify(req.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    res.status(response.status).json(data);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ 
      error: 'API 호출 실패', 
      details: err.message,
      targetUrl: targetUrl // 디버깅용
    });
  }
}