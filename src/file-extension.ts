import path from 'path';

export default (filePath: string): string => path.extname(filePath).toLowerCase().slice(1);
