import debug from '../debug';

export default (info: string | string[]) => debug([__dirname].concat(info));
