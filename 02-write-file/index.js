const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

const writeFile = fs.createWriteStream(
  path.join(__dirname, '02-write-file.txt'),
);

function exit() {
  output.write('You closed the program. Byu!');
  rl.close();
}

output.write('Enter your text:\n');

rl.on('line', (answer) => {
  if (answer === 'exit') return exit();
  writeFile.write(`${answer}\n`);
});

rl.on('SIGINT', () => {
  exit();
});
