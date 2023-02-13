import argParser from './arg-parser';

export default () => {
  const args = argParser.parseArgs();

  if (args.limit === 0 || args.limit < -1 || args.limit === 0) {
    throw new Error(`Invalid value for --limit=${args.limit}. Must be -1 or positive integer.`);
  }

  return args;
};
