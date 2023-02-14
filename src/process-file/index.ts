import jpg from './jpg';

import { EXTENSION, EXTENSIONS } from '../constants';
import fileExtention from '../file-extension';

export default async (filePath:string, fileTypes:string) => {
  console.log(`process-file/index: (filePath="${filePath}", fileTypes="${fileTypes}")`);
  const ext = fileExtention(filePath);

  let info = null;
  if (fileTypes.includes(EXTENSION.JPG) && EXTENSIONS.JPG.includes(ext)) {
    try {
      info = await jpg(filePath, EXTENSION.JPG);
    } catch {
      console.log(`process-file/index:     need to quarantine filePath="${filePath}".`)
    }
  }
  console.log(`process-file/index: info=`, info);
  return info;
};
