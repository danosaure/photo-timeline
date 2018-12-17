module.exports = (filePath) => filePath.slice((filePath.lastIndexOf('.') - 1 >>> 0) + 2).toLowerCase();
