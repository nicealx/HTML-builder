const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

let data = '';
const readFile = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

readFile.on('data', (chunk) => {
  data += chunk;
});

readFile.on('end', () => {
  stdout.write(data);
});
