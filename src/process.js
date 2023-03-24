// import inputData from "./data/inputJson.json" assert { type: "json" };
import { add_time_range } from "./processors/alert_time_range.js";
import fs from "fs";

function logError(error) {
  if (error) {
    console.log("Error in writing file! ", error);
  }
}

function replacer(key, value) {
  return value instanceof Object && !(value instanceof Array)
    ? Object.keys(value)
        .sort()
        .reduce((sorted, key) => {
          sorted[key] = value[key];
          return sorted;
        }, {})
    : value;
}

const inputFile = "src/data/input.json";
const outputFile = "src/data/output.json";

export function processData() {
  fs.readFile(inputFile, "utf8", function (error, content) {
    if (error) {
      console.log("Error in reading file! ", error);
    }
    const inputData = [];
    const objects = content.split("\n\n");
    for (const object of objects) {
      inputData.push(JSON.parse(object));
    }

    const outputData = [];
    for (const item of inputData) {
      // PROCESSOR
      outputData.push(add_time_range(item));
    }

    fs.writeFile(outputFile, "", logError);
    for (let i = 0; i < outputData.length; i++) {
      const endOfLine = i === outputData.length - 1 ? "" : "\n\n";
      fs.appendFileSync(
        outputFile,
        JSON.stringify(outputData[i], replacer, "  ") + endOfLine,
        logError
      );
    }

    console.log("All done!");
  });
}
