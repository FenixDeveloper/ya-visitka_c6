const fs = require('fs');
const path = require('path');
const { DEFAULT_TEMP_DIR, DEFAULT_UPLOAD_DIR } = require('../constants');

const file = 'test';
const tempDir = path.resolve(DEFAULT_TEMP_DIR);

const { moveFileToUploads } = require('../utils');

beforeAll(() => {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  fs.writeFileSync(path.resolve(tempDir, file), 'test');
});

afterAll(() => {
  const tempFile = path.resolve(tempDir, file);
  const uploadFile = path.resolve(DEFAULT_UPLOAD_DIR, file);
  if (fs.existsSync(tempFile)) {
    fs.rmSync(tempFile);
  }

  if (fs.existsSync(uploadFile)) {
    fs.rmSync(uploadFile);
  }
});

describe('Перемещение файла в постоянное хранилище', () => {
  test('Передан null', () => {
    expect(moveFileToUploads(null)).toBe(null);
  });

  test('Файл не существует', () => {
    expect(moveFileToUploads('NotExist')).toBe(null);
  });

  test('Файл должен быть перемещен', () => {
    const newFile = moveFileToUploads(`${DEFAULT_TEMP_DIR}${file}`);
    expect(
      fs.existsSync(path.resolve(DEFAULT_UPLOAD_DIR, newFile)),
    ).toBeTruthy();
  });

  test('Файл не должен быть перемещен, если он уже в постоянном хранилище', () => {
    const newFile = moveFileToUploads(file);
    expect(newFile).toEqual(file);
  });
});
