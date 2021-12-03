import fs from 'fs';
import _ from 'lodash';

const getkeysMerged = (object1, object2) => {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const keysMerged = Array.from(new Set([...keys1, ...keys2]));
    const keysSorted = _.sortBy(keysMerged);
    return keysSorted;
};
const genDiff = (objFile1, objFile2) => {
    const keys = getkeysMerged(objFile1, objFile2);

    let result = '';
    for (let i = 0; i < keys.length; i += 1) {
        if ((_.has(objFile1, keys[i])) && (_.has(objFile2, keys[i]))) {
            if (objFile1[keys[i]] === objFile2[keys[i]]) {
                result += '    ' + keys[i] + ': ' + objFile1[keys[i]] + '\n';
            } else {
                result += '  ' + '- ' + keys[i] + ': ' + objFile1[keys[i]] + '\n'; 
                result += '  ' + '+ ' + keys[i] + ': ' + objFile2[keys[i]] + '\n'; 
            }
        }
        if ((_.has(objFile1, keys[i])) && (!_.has(objFile2, keys[i]))) {
            result += '  ' + '- ' + keys[i] + ': ' + objFile1[keys[i]] + '\n';
        }
        if (!(_.has(objFile1, keys[i])) && (_.has(objFile2, keys[i]))) {
            result += '  ' + '+ ' + keys[i] + ': ' + objFile2[keys[i]] + '\n'; 
        }
    }
    result = '{\n' + result + '}';

    return result;
};

export const action = (file1, file2) => {
    const indexOfExtension1 = file1.indexOf('.') + 1;
    const indexOfExtension2 = file2.indexOf('.') + 1;
    const typeFile1 = file1.slice(indexOfExtension1 - file1.length).toLowerCase();
    const typeFile2 = file2.slice(indexOfExtension2 - file2.length).toLowerCase();
    let obj1 = {};
    let obj2 = {};
    if (typeFile1 === 'json') {
        const fileJson1 = fs.readFileSync(file1, 'utf-8');   
        obj1 = JSON.parse(fileJson1); 
    }
    if (typeFile2 === 'json') {
        const fileJson2 = fs.readFileSync(file2, 'utf-8');
        obj2 = JSON.parse(fileJson2);
    }
    console.log(genDiff(obj1, obj2));
};
