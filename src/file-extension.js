export default (filePath) => {
  if (typeof filePath !== 'string') {
    throw new Error(`Expect string but got ${typeof filePath}.`);
  }

  const extIndex = filePath.lastIndexOf('.');

  if (extIndex === -1) {
    return '';
  }

  return filePath.slice(extIndex + 1).toLowerCase();
};
