import debug from 'debug';
import path from 'path';

const DEBUG_KEY = 'danosaure:photo-timeline';

const flattenInfo = (info) => {
  if (typeof info === 'string') {
    const filename = path.basename(info);
    const ext = path.extname(filename);
    if (ext) {
      return filename.slice(0, -ext.length);
    }
    return filename;
  }

  return path.join(path.basename(info[0]), flattenInfo(info[1]));
};

export default (info) => {
  const key = flattenInfo(['src', info]);

  const print = debug(`${DEBUG_KEY}:${key}`);

  print.enable = () => {
    debug.enable(`${DEBUG_KEY}:*`);
  };

  return print;
};
