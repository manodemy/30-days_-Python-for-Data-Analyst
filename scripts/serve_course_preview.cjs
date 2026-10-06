/* Local public-asset preview for course QA. No build, copy or deployment side effects. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const root = path.resolve(__dirname, '../public');
const port = Number(process.argv[2] || 8083);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg' };
http.createServer((req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) || !['GET', 'HEAD'].includes(req.method)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (error, data) => {
      if (error) { res.writeHead(404); res.end('Not found'); return; }
      const type = types[path.extname(file)] || 'application/octet-stream';
      const compressed = /text|json/.test(type) && /gzip/.test(req.headers['accept-encoding'] || '');
      const body = compressed ? zlib.gzipSync(data) : data;
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': body.length, 'Cache-Control': 'no-store', 'Vary': 'Accept-Encoding', ...(compressed ? { 'Content-Encoding': 'gzip' } : {}) });
      res.end(req.method === 'HEAD' ? undefined : body);
    });
  } catch { res.writeHead(400); res.end('Invalid request'); }
}).listen(port, '127.0.0.1', () => console.log('Course preview: http://127.0.0.1:' + port + '/python/day03.html'));
