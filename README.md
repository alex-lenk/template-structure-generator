# Template Structure Generator

Easily scan your project directories to generate a structured list of your templates and their associated assets.

## Installation

```bash
npm install template-structure-generator --save-dev
```


## Usage

Simply integrate the plugin into your Webpack configuration. Specify the directory with the required file extensions and provide a template structure for the output.

```javascript
const TemplateStructureGeneratorPlugin = require('template-structure-generator');

module.exports = {
  plugins: [
    new TemplateStructureGeneratorPlugin({
      directoryGlob: 'src/pages/*.html',
      outputDirectory: '.template-structure',
      outputFileName: 'templateList.js',
      template: {
        js: ['common.js'],
        scss: ['common.scss'],
      },
    }),
  ],
};
```


## How it works

Upon execution, the script will traverse the specified directory and generate an output of all discovered templates, adhering to the provided structure:

Output example **(./.template-structure/templateList.js)**:

```javascript
module.exports = {
  'index.html': {
    js: ['common.js'],
    scss: ['common.scss'],
  },
  'detail.html': {
    js: ['common.js'],
    scss: ['common.scss'],
  },
};
```


## Contribution

Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.


