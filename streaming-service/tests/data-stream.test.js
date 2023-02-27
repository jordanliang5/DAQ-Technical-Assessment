const functions = require('../src/server');

test('Data not out of range', async () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.checkValueInRange(50, 1000);
  functions.checkValueInRange(50, 2000);
  functions.checkValueInRange(50, 3000);
  functions.checkValueInRange(50, 4000);
  await expect(consoleSpy).not.toHaveBeenCalledWith('Exceeded range more than 3 times in 5 seconds! Writing to report...');
  consoleSpy.mockRestore();
  functions.shutDownServer();
});

test('Data out of range 4 times in a row, less than 5 seconds', async () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.checkValueInRange(2, 1000);
  functions.checkValueInRange(2, 2000);
  functions.checkValueInRange(2, 3000);
  functions.checkValueInRange(2, 4000);
  await expect(consoleSpy).toHaveBeenCalledWith('Exceeded range more than 3 times in 5 seconds! Writing to report...');
  consoleSpy.mockRestore();
  functions.shutDownServer();
});

test('Data out of range 4 times with valid results, less than 5 seconds', async () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.checkValueInRange(2, 500);
  functions.checkValueInRange(50, 800);
  functions.checkValueInRange(2, 1000);
  functions.checkValueInRange(50, 1200);
  functions.checkValueInRange(2, 1500);
  functions.checkValueInRange(50, 1800);
  functions.checkValueInRange(2, 2000);
  await expect(consoleSpy).toHaveBeenCalledWith('Exceeded range more than 3 times in 5 seconds! Writing to report...');
  consoleSpy.mockRestore();
  functions.shutDownServer();
});

test('Data out of range 4 times but more than 5 seconds', async () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.checkValueInRange(2, 1000);
  functions.checkValueInRange(2, 3000);
  functions.checkValueInRange(2, 4000);
  functions.checkValueInRange(2, 7000);
  await expect(consoleSpy).not.toHaveBeenCalledWith('Exceeded range more than 3 times in 5 seconds! Writing to report...');
  consoleSpy.mockRestore();
  functions.shutDownServer();
});

test('Check interval is set correctly to catch next out of range interval', async () => {
  const consoleSpy = jest.spyOn(console, 'log');
  functions.checkValueInRange(2, 1000);
  functions.checkValueInRange(2, 3000);
  functions.checkValueInRange(2, 4000);
  functions.checkValueInRange(2, 7000);
  functions.checkValueInRange(2, 8000);
  functions.checkValueInRange(2, 9000);
  functions.checkValueInRange(2, 10000);
  await expect(consoleSpy).toHaveBeenCalledWith('Exceeded range more than 3 times in 5 seconds! Writing to report...');
  consoleSpy.mockRestore();
  functions.shutDownServer();
});



