import http from 'http';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log('\n=== SECURITY HEADERS CHECK ===\n');
  
  const headersToCheck = [
    'content-security-policy',
    'x-frame-options',
    'x-content-type-options',
    'strict-transport-security',
    'x-dns-prefetch-control',
    'referrer-policy'
  ];
  
  headersToCheck.forEach(header => {
    const value = res.headers[header];
    const status = value ? '✓' : '✗';
    console.log(`${status} ${header}: ${value || 'NOT SET'}`);
  });
  
  console.log('\n=== ALL HEADERS ===\n');
  console.log(res.headers);
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
