const path = require('path');
const { stdout } = require('process');
const fs = require('fs');

function readFilesForFolder() {
  fs.readdir(
    path.join(__dirname, 'secret-folder'),
    {
      withFileTypes: true,
    },
    (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        if (file.isFile()) {
          const fileName = path.parse(file.name).name;
          const fileExt = path.extname(file.name).slice(1);
          fs.stat(path.join(file.path, file.name), (err, stats) => {
            if (err) throw err;
            stdout.write(
              `${fileName} - ${fileExt} - ${(stats.size / 1024).toFixed(
                2,
              )}kb\n`,
            );
          });
        }
      });
    },
  );
}

readFilesForFolder();
