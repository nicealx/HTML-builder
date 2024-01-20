const fs = require('fs');
const path = require('path');

const folderName = 'files';

function copyDir(folder) {
  const folderCopyName = `${folder}-copy`;
  fs.mkdir(path.join(__dirname, folderCopyName), { recursive: true }, (err) => {
    if (err) throw err.message;
  });

  fs.readdir(
    path.join(__dirname, folderCopyName),
    {
      withFileTypes: true,
      recursive: true,
    },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        fs.unlink(path.join(file.path, file.name), (err) => {
          if (err) throw err;
        });
      });
    },
  );

  fs.readdir(
    path.join(__dirname, folder),
    {
      withFileTypes: true,
      recursive: true,
    },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        fs.copyFile(
          path.join(file.path, file.name),
          path.join(__dirname, folderCopyName, file.name),
          (err) => {
            if (err) throw err;
          },
        );
      });
    },
  );
}

copyDir(folderName);
