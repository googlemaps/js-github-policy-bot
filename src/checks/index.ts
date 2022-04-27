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

import { check as gitCheck } from "./git";
import { check as filesCheck } from "./files";
import type { Errors, Options } from "../types";

import ora from "ora";
const wrap = (
  name: string,
  errors: Errors,
  check: (directory: string, options: Options) => Errors
) => {
  const spinner = ora(` Checking ${name}`).start();

  return (directory: string, options: Options) => {
    const results = check(directory, options) ?? [];
    errors.push(...results);

    if (results.length) {
      spinner.fail();
    } else {
      spinner.succeed();
    }
  };
};

export const check = (directory: string, options: Options): Errors => {
  const errors: Errors = [];

  wrap("git", errors, gitCheck)(directory, options);
  wrap("required files", errors, filesCheck)(directory, options);

  return errors;
};
