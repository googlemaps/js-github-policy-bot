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

import { check } from "./checks";
import { init } from "./init";
import { Command, Option } from "commander";
import { Config, Options } from "./types";
import chalk from "chalk";
import fs from "fs";
import packageJSON from "../package.json";
import { shorthandToJSONSchema } from "directory-schema-validator";

const program = new Command();

program
  .name(packageJSON.name)
  .description(packageJSON.description)
  .version(packageJSON.version);

// check
program
  .command("check")
  .argument("<string>", "Path to the repository")
  .option("-c, --config <string>", "Configuration file")
  .action((directory, options) => {
    console.log(
      chalk.yellowBright(
        `Performing checks with ${packageJSON.name}@${packageJSON.version}\n`
      )
    );

    let config: Config;

    if (options.config) {
      config = JSON.parse(fs.readFileSync(options.config, "utf8"));
    } else {
      config = {
        files: shorthandToJSONSchema([
          ".github/blunderbuss.yml",
          ".github/CODEOWNERS",
          ".github/dependabot.yml",
          ".github/workflows/release.yml",
          ".gitignore",
          ".releaserc",
          "LICENSE",
        ]),
      };
    }

    // coerce type
    options = options as Options;
    options.config = config;

    // perform checks
    const errors = check(directory, options);

    if (errors.length) {
      console.log(chalk.redBright("\nPolicy check failed!\n"));
      console.log(chalk.redBright(JSON.stringify(errors, null, 2)));

      process.exit(1);
    } else {
      console.log(chalk.greenBright("\nPolicy check success!\n"));
    }
  });

// init
program
  .command("init")
  .argument("<string>", "Path to the repository")
  .option("-u, --users <string...>", "GitHub user")
  .option("-t, --team <string>", "GitHub team")
  .option("-r, --repo <string>", "Repository name")
  .option("--no-overwrite", "Do not overwrite existing files")
  .action(init);

// shared options
program.commands.forEach((cmd) => {
  cmd
    .option("-d, --debug", "Debug mode", false)
    .addOption(
      new Option(
        "-k, --kind <string>",
        "The primary Language or framework. Not all options change behavior at this time."
      ).choices([
        "js",
        "none",
      ])
    );
});

program.configureHelp({
  sortSubcommands: true,
  sortOptions: true,
});

program.parse();
