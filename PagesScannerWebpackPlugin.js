const { scanPages } = require('./index.js');

class PagesScannerWebpackPlugin {
  constructor(options = {}) {
    this.options = {
      outputDirectory: '.pages-scanner',
      outputFileName: 'pagesList.js',
      template: {
        js: ['common.js'],
        scss: ['common.scss'],
      },
      ...options,
    };

    if (!this.options.directoryGlob) {
      throw new Error('PagesScannerWebpackPlugin requires a `directoryGlob` option.');
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('PagesScannerWebpackPlugin', (compilation, callback) => {
      scanPages(this.options.directoryGlob, this.options.outputDirectory, this.options.outputFileName, this.options.template);
      callback();
    });
  }
}

module.exports = PagesScannerWebpackPlugin;
