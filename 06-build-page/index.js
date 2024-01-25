const fs = require('fs');
const path = require('path');

const projectFolder = path.join(__dirname, 'project-dist');
const assetsProjectFolder = path.join(projectFolder, 'assets');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');

function createFolder() {
  fs.mkdir(projectFolder, { recursive: true }, (err) => {
    if (err) throw err;
  });
}

function mergeStyles() {
  const writeFile = fs.createWriteStream(path.join(projectFolder, 'style.css'));
  fs.readdir(
    stylesFolder,
    {
      withFileTypes: true,
      recursive: true,
    },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file.isFile()) {
          if (path.extname(file.name) === '.css') {
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
}

function generateHTML() {
  fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8').on(
    'data',
    (html) => {
      fs.readdir(componentsFolder, { withFileTypes: true }, (error, files) => {
        if (error) throw error;
        files.forEach((file) => {
          if (file.isFile() && path.extname(file.name) === '.html') {
            const readFile = fs.createReadStream(
              path.join(file.path, file.name),
              'utf-8',
            );

            readFile.on('data', (read) => {
              html = html.replaceAll(`{{${path.parse(file.name).name}}}`, read);
            });
            readFile.on('end', () => {
              fs.createWriteStream(
                path.join(projectFolder, 'index.html'),
              ).write(html);
            });
          }
        });
      });
    },
  );
}

function copyDir(pathName, folderName) {
  fs.mkdir(
    path.join(assetsProjectFolder, folderName),
    { recursive: true },
    (err) => {
      if (err) throw err;
    },
  );

  fs.readdir(
    pathName,
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file.isDirectory() && file.name.length) {
          copyDir(path.join(file.path, file.name), file.name);
        }

        if (file.isFile()) {
          fs.copyFile(
            path.join(file.path, file.name),
            path.join(file.path.replace(__dirname, projectFolder), file.name),
            (err) => {
              if (err) throw err;
            },
          );
        }
      });
    },
  );
}

function init() {
  createFolder();
  mergeStyles();
  copyDir(assetsFolder, '');
  generateHTML();
}

init();
