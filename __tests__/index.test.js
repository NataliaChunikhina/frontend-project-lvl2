import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { genDiff } from '../src/commander.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff json', () => {
  const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(genDiff(file1, file2)).toEqual(result);
});
test('genDiff yml', () => {
  const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(genDiff(file1, file2)).toEqual(result);
});
