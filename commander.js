import fs from 'fs';
import _ from 'lodash';

const getFileExtension = (file) => {
  const indexOfExtension = file.indexOf('.') + 1;
  const fileExtension = file.slice(indexOfExtension - file.length).toLowerCase();
  return fileExtension;
};
const readFileToObject = (file, typeFile) => {
  let obj = {};
  if (typeFile === 'json') {
    const fileJson = fs.readFileSync(file, 'utf-8');
    obj = JSON.parse(fileJson);
  }
  return obj;
};
const getkeysMerged = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keysMerged = Array.from(new Set([...keys1, ...keys2]));
  const keysSorted = _.sortBy(keysMerged);
  return keysSorted;
};
export const genDiff = (filepath1, filepath2) => {
  const typeFile1 = getFileExtension(filepath1);
  const typeFile2 = getFileExtension(filepath2);
  const objFile1 = readFileToObject(filepath1, typeFile1);
  const objFile2 = readFileToObject(filepath2, typeFile2);
  const keys = getkeysMerged(objFile1, objFile2);

  let result = '';
  for (let i = 0; i < keys.length; i += 1) {
    if ((_.has(objFile1, keys[i])) && (_.has(objFile2, keys[i]))) {
      if (objFile1[keys[i]] === objFile2[keys[i]]) {
        result += `    ${keys[i]}: ${objFile1[keys[i]]}\n`;
      } else {
        result += `${'  - '}${keys[i]}: ${objFile1[keys[i]]}\n`;
        result += `${'  + '}${keys[i]}: ${objFile2[keys[i]]}\n`;
      }
    }
    if ((_.has(objFile1, keys[i])) && (!_.has(objFile2, keys[i]))) {
      result += `${'  - '}${keys[i]}: ${objFile1[keys[i]]}\n`;
    }
    if (!(_.has(objFile1, keys[i])) && (_.has(objFile2, keys[i]))) {
      result += `${'  + '}${keys[i]}: ${objFile2[keys[i]]}\n`;
    }
  }
  result = `{\n${result}}`;

  return result;
};
const action = (file1, file2) => {
  console.log(genDiff(file1, file2));
};

export default action;
