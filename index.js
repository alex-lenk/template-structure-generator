#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function scanPages(directoryGlob, outputDirectory, outputFileName, template) {
  const files = extractPages(directoryGlob);
  const pagesList = createPagesStructure(files, template);
  saveResults(pagesList, outputDirectory, outputFileName);
}

function extractPages(directoryGlob) {
  const directory = path.dirname(directoryGlob);

  if (!fs.existsSync(directory)) {
    console.error(`Directory ${ directory } does not exist!`);
    return [];
  }

  const allEntities = fs.readdirSync(directory).map(entity => path.join(directory, entity));

  const files = allEntities.filter(entity => fs.statSync(entity).isFile()).sort();

  if (!files.length) {
    console.error(`No files found with the pattern: ${ directoryGlob }`);
    return [];
  }

  return files;
}

function createPagesStructure(files, template) {
  const pagesList = {};

  files.forEach(file => {
    const fileName = path.basename(file);
    pagesList[fileName] = template;
  });

  return pagesList;
}

function objectToString(obj) {
  let str = '{\n';

  for (let key in obj) {
    str += `  '${ key }': {\n`;
    for (let innerKey in obj[key]) {
      str += `    ${ innerKey }: ${ arrayToString(obj[key][innerKey]) },\n`;
    }
    str += '  },\n';
  }

  str += '};\n';

  return str;
}

function arrayToString(arr) {
  return '[' + arr.map(item => `'${ item }'`).join(', ') + ']';
}

function saveResults(pagesList, outputDirectory, outputFileName) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const outputPath = path.join(outputDirectory, outputFileName);
  const outputContent = `module.exports = ${ objectToString(pagesList) }`;

  fs.writeFileSync(outputPath, outputContent, 'utf8');
  console.log(`Scanned and saved file data to ${ outputPath }`);
}

module.exports = { scanPages };
