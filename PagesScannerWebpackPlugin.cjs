'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

exports.PagesScannerWebpackPlugin = void 0;
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
