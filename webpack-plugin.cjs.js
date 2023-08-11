"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagesScannerWebpackPlugin = void 0;
var _index = require("./index.js");
class PagesScannerWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
    if (!this.options.directoryGlob) {
      throw new Error('PagesScannerWebpackPlugin requires a `directoryGlob` option.');
    }
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('PagesScannerWebpackPlugin', (compilation, callback) => {
      (0, _index.scanPages)(this.options.directoryGlob);
      callback();
    });
  }
}

exports.PagesScannerWebpackPlugin = PagesScannerWebpackPlugin;
