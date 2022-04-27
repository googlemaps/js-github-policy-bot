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

import { Validator as Validator_ } from "directory-schema-validator";
import type { ErrorObject, Options as AJVOPtions } from "ajv";
import ajv from "ajv";
import type { Options } from "../types";

// TODO pass options to AJV
class Validator extends Validator_ {
  constructor(options: AJVOPtions) {
    super();
    this.ajv = new ajv(options);
  }
}

export const check = (
  directory: string,
  options: Options
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ErrorObject<string, Record<string, any>, unknown>[] | null | undefined => {
  const schema = options.config.files;
  const validator = new Validator({ allErrors: true });

  validator.validate(schema, directory);

  // TODO update validate to take DirectoryTreeMap so parse can be called once
  return validator.errors;
};
