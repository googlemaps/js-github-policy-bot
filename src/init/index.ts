/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { InitOptions} from "../types";
import fs from "fs/promises";
import nunjucks from "nunjucks";
import path from "path";
import chalk from "chalk";
import prettier from "prettier";
import { kindToLanguage, fileExists } from "../util";

const shared = [
  "README.md",
  "SECURITY.md",
  ".github/blunderbuss.yml",
  ".github/CODEOWNERS",
  ".github/workflows/codeql.yml",
  ".github/workflows/test.yml",
];

const files = {
  none: [...shared, ".github/workflows/release.yml"],
  js: [...shared, ".github/workflows/release.js.yml"],
};

const write = async (directory: string, options: InitOptions, file: string) => {
  const source = path.join(__dirname, "templates", file);
  const dest = path.join(directory, file.replace(`.${options.kind}.`, "."));

  if (!options.overwrite && await fileExists(dest)) {
    console.log(chalk.green(`- Skipng existing file: ${dest}`));
    return;
  }

  console.log(chalk.green(`- Writing file: ${dest}`));

  let output = nunjucks.render(source, options);

  switch (path.extname(dest)) {
    case ".yml":
      output = output.replace(/^\s*\n/gm, "");
      output = prettier.format(output, { parser: "yaml" });
      break;
    case ".md":
      output = prettier.format(output, { parser: "markdown" });
      break;
  }

  return fs.writeFile(dest, output);
};

export const init = async (directory: string, options: InitOptions) => {
  options.language = kindToLanguage(options.kind);

  await Promise.all(
    files[options.kind].map((file) => write(directory, options, file))
  );
};
