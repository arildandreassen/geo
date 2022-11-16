import * as fs from "fs";
const env = process.argv[2];

fs.renameSync(`./src/env/${env}.config.ts`, "./src/env/config.ts");
