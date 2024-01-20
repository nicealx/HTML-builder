const fs = require('fs');
const path = require('path');

const bundleCSS = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesFolder = path.join(__dirname, 'styles');

const writeFile = fs.createWriteStream(bundleCSS);

fs.readdir(
  stylesFolder,
  {
    withFileTypes: true,
  },
  (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isFile()) {
        if (path.parse(file.name).ext === '.css') {
          const readFile = fs.createReadStream(
            path.join(file.path, file.name),
            'utf-8',
          );
          readFile.on('data', (chunk) => writeFile.write(chunk));
        }
      }
    });
  },
);
