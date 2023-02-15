# photo-timeline


## Usage {#usage}

Before using, build the system:
```
npm run build
```

To run:
```
npm start -- --ext=jpg --target=/some/destination/folder \
    --source=/some/folder --limit=30 --quarantine=/some/quarantine/folder
```

Will process JPG files from `/some/folder` and subfolders and create a folder
structure under `/some/destination/folder`. The folder structure will
represent the locale time:

```
  YYYY/
    YYYY-MM/
      YYYY-MM-DD/
        yyyymmdd-hhmmss.ext
```

The management of conflicted file names is still undefined.

If a file does not contain EXIF data, the file will be moved under the
quarantine folder. The original file structure would be kept.

You can add `--debug` to show debugging messages.
