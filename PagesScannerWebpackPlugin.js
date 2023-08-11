const { scanPages } = require('./index.js');

class PagesScannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;

    if (!this.options.directoryGlob) {
      throw new Error('PagesScannerWebpackPlugin requires a `directoryGlob` option.');
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('PagesScannerWebpackPlugin', (compilation, callback) => {
      scanPages(this.options.directoryGlob);
      callback();
    });
  }
}

module.exports = PagesScannerWebpackPlugin;
