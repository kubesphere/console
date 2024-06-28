const fg = require('fast-glob');
const path = require('path');
const fs = require('fs-extra');
const Mustache = require('mustache');

function copyTpl(options = { path: '', context: {}, target: '' }) {
  const tpl = fs.readFileSync(options.path, 'utf8');
  const content = Mustache.render(tpl, options.context);
  fs.ensureDirSync(path.dirname(options.target));
  fs.writeFileSync(options.target, content, 'utf8');
}

function copyDirectory(options = { path: '', context: {}, target: '' }) {
  const files = fg.sync('**/*', {
    cwd: options.path,
    dot: true,
  });

  files.forEach(file => {
    const absFile = path.join(options.path, file);
    if (fs.statSync(absFile).isDirectory()) return;

    if (file.endsWith('tpl')) {
      copyTpl({
        path: absFile,
        context: options.context,
        target: path.join(options.target, file.replace('.tpl', '')),
      });
    } else {
      fs.copySync(absFile, path.join(options.target, file));
    }
  });
}

module.exports = copyDirectory;
