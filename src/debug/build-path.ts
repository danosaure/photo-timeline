import path from 'path';

export default (info: string[]): string => {
  const paths = info.map((filePath) => path.basename(filePath));
  const filePath = path.join(...paths);
  const fileParse = path.parse(filePath);
  return path.join(fileParse.dir, fileParse.name);
};
