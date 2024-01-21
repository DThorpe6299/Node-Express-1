const fs = require('fs');
const http = require('http');
const https = require('https');
const urlModule = require('url');

if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const filename = process.argv[2];

try {
  const data = fs.readFileSync(filename, 'utf-8');
  const urls = data.split('\n').filter(Boolean);

  urls.forEach((url) => {
    const parsedUrl = urlModule.parse(url);
    const hostname = parsedUrl.hostname;
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    protocol.get(url, (res) => {
      let html = '';

      res.on('data', (chunk) => {
        html += chunk;
      });

      res.on('end', () => {
        fs.writeFileSync(hostname, html);
        console.log(`Wrote to ${hostname}`);
      });
    }).on('error', (err) => {
      console.error(`Couldn't download ${url}`);
    });
  });
} catch (err) {
  console.error(`Error reading ${filename}: ${err.message}`);
  process.exit(1);
}
