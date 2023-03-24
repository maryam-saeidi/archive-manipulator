# Archive manipulator

Scripts for adjusting archives

## How to use

In order to change a field in an archive, you need to
- Copy the archive into `src/data/input.json`
- Add a processor in `src/processors` directory
- Use that processor in `src/process.js` (marked by `PROCESSOR` comment)
- Run this command: `npm run process`
- Check the output in `src/data/output.json`
