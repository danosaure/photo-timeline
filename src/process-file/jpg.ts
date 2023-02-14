import * as ExifReader from 'exifreader';

export default async (filePath:string, ext:string) => {
  console.log(`process-file/jpg: (filePath="${filePath}", ext="${ext}")`);
  try {
    const exifData = await ExifReader.load(filePath);
    const exifDateTime = exifData.DateTimeOriginal?.description;
    if (!exifDateTime) {
      throw new Error(`Cannot find exif for filePath="${filePath}".`);
    }

    return [{
      id: `${exifData.Make?.description}.${exifData.Model?.description}`,
      ext,
      filePath,
      date: new Date(exifDateTime),
    }];
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(`Error processing filePath='${filePath}': err=`, err);
    throw err;
  }
};
