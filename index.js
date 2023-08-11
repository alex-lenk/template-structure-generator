#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

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

  const files = glob.sync(directoryGlob).sort();

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

function saveResults(pagesList, outputDirectory, outputFileName) {
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const outputPath = path.join(outputDirectory, outputFileName);
  const outputContent = `module.exports = ${ JSON.stringify(pagesList, null, 2)
    .replace(/"/g, '\'')
    .replace(/(\[\s+'[^']+'\s+\])/g, (match, p1) => p1.replace(/\s+/g, ''))
    .replace(/}\s*$/, '}')
  };\n`;

  fs.writeFileSync(outputPath, outputContent, 'utf8');
  console.log(`Scanned and saved file data to ${ outputPath }`);
}

module.exports = { scanPages };
