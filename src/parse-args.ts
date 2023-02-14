import argParser from './arg-parser';

export default async () => {
  const args = await argParser();

  if (args.limit === 0 || args.limit < -1) {
    throw new Error(`Invalid value for --limit=${args.limit}. Must be -1 or positive integer.`);
  }

  return args;
};
