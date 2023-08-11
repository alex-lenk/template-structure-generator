### Сканер страниц.

Подключаем плагин, указываем в параметрах путь с расширениями нужных файлов.

```javascript
const PagesScannerWebpackPlugin = require('pages-scanner');

module.exports = {
  plugins: [
    new PagesScannerWebpackPlugin({ directoryGlob: 'src/pages/*.twig' }),
  ],
};
```

##### Скрипт пройдется по директории и запишет все найденные страницы по шаблону:

```javascript
const pagesList = {
  'index.twig': {
    js: ['common.js'],
    scss: ['common.scss'],
  },
  'detail.twig': {
    js: ['common.js'],
    scss: ['common.scss'],
  },
};
```
