### Page Scanner.

Connect the plugin, specify the path with the extensions of the necessary files in the parameters, specify the template.

```javascript
const PagesScannerWebpackPlugin = require('pages-scanner');

module.exports = {
  plugins: [
    new PagesScannerWebpackPlugin({
      directoryGlob: 'src/pages/*.html',
      outputDirectory: '.pages-scanner',
      outputFileName: 'pagesList.js',
      template: {
        js: ['common.js'],
        scss: ['common.scss'],
      },
    }),
  ],
};
```

##### The script will go through the directory and write all the pages found according to the template:

.namesPages/pagesList.js

```javascript
module.exports = {
  'index.twig': {
    js: ['common.js'],
    scss: ['common.scss']
  },
  'detail.twig': {
    js: ['common.js'],
    scss: ['common.scss']
  }
};
```
