export default class Config {
  extension!: string;
  limit!: number;
  quarantine!: string;
  source!: string;
  target!: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(args: any) {
    this.extension = args.ext;
    this.limit = args.limit;
    this.quarantine = args.quarantine;
    this.source = args.source;
    this.target = args.target;
  }
}

// return [{
//     id: `${exifData.Make?.description}.${exifData.Model?.description}`,
//     ext,
//     filePath,
//     date: new Date(exifDateTime),
//   }];
