#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import * as glob from 'glob';

function scanPages(directoryGlob) {
  const directory = path.dirname(directoryGlob);

  if (!fs.existsSync(directory)) {
    console.error(`Directory ${ directory } does not exist!`);
    return;
  }

  const files = glob.sync(directoryGlob).sort();

  if (!files.length) {
    console.error(`No files found with the pattern: ${ directoryGlob }`);
    return;
  }

  const pagesList = {};

  files.forEach(file => {
    const fileName = path.basename(file);
    pagesList[fileName] = {
      js: ['common.js'],
      scss: ['common.scss'],
    };
  });

  const outputDirectory = path.join('.', '.namesPages');
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  const outputPath = path.join(outputDirectory, 'pagesList.js');
  const outputContent = `const pagesList = ${JSON.stringify(pagesList, null, 2)
    .replace(/"/g, "'")
    .replace(/(\[\s+'[^']+'\s+\])/g, (match, p1) => p1.replace(/\s+/g, ''))
  };\nexport default pagesList;`;

  fs.writeFileSync(outputPath, outputContent, 'utf8');
  console.log(`Scanned and saved file data to ${ outputPath }`);
}

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Please provide the path as an argument.');
}

scanPages(inputPath);
