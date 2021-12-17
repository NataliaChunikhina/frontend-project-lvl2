import fs from 'fs';
import yaml from 'js-yaml';

const readFileToObject = (file, typeFile) => {
  let obj = {};
  let parse;
  const data = fs.readFileSync(file, 'utf-8');
  if (typeFile === '.json') {
    parse = JSON.parse;
  } else if ((typeFile === '.yml') || (typeFile === '.yaml')) {
    parse = yaml.load;
  }
  obj = parse(data);
  return obj;
};

export default readFileToObject;
