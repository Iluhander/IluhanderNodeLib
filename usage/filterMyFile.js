const index_1 = require("../build/index");
const { resolve } = require('path');

index_1.filterFields(
  resolve(__dirname, process.argv[2]),
  process.argv.slice(4),
  resolve(__dirname, process.argv[3])
);
