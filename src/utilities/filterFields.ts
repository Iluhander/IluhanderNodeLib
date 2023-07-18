import { readFileSync, writeFileSync } from "fs";

/**
 * Removes redundant fields from js file, containing array of objects.
 * ! Each field should be on a new line !
 * @param inputFilePath - path to .js file, which needs to be filtered
 * @param fieldsToKeep - array of fields, which will remain after filtering.
 * @param outputFilePath (optional) - path to filtered .js. If not passed, sets to inputFilePath value.
 */
export default function filterFields(inputFilePath: string, fieldsToKeep: string[], outputFilePath?: string) {
  const fContent = readFileSync(inputFilePath, {encoding: 'utf-8'});
  const fLines = fContent.split('\n');

  const fieldsSet = new Set(fieldsToKeep);

  const fLinesFiltered = fLines.filter((line) => {
    const trimmed = line.trim();
    if (!~trimmed.indexOf(':')) {
      return true;
    }

    const fieldName = trimmed.split(':')[0];

    return fieldsSet.has(fieldName);
  });

  const fFilteredContent = fLinesFiltered.join('\n');

  outputFilePath = outputFilePath ?? inputFilePath;
  writeFileSync(outputFilePath, fFilteredContent);
}
