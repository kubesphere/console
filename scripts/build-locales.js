import path from 'path';
import fs from 'fs-extra';

async function buildLocales() {
  const localesPath = path.join(__dirname, '../locales');
  const dirs = fs.readdirSync(localesPath);
  dirs.forEach(dir => {
    if (dir !== 'package.json' && dir !== 'dist') {
      const localeFiles = fs.readdirSync(path.join(localesPath, dir));
      const distPath = path.join(__dirname, '../locales/dist/', dir);
      fs.ensureDirSync(distPath);
      localeFiles.forEach(file => {
        if (file.endsWith('.js')) {
          try {
            const localeContent = require(path.join(localesPath, dir, file));
            const filename = `${file.replace('.js', '')}.json`;
            fs.writeJsonSync(path.join(distPath, filename), localeContent);
          } catch (e) {}
        }
      });
    }
  });
}

buildLocales();
