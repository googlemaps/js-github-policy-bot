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

import type { JSONSchemaDefinition } from "directory-schema-validator";
import type { ErrorObject } from "ajv";

export enum Kind {
  js = "js",
  none = "none",
}

export enum Language {
  cpp = "cpp",
  csharp = "csharp",
  go = "go",
  java = "java",
  javascript = "javascript",
  python = "python",
}

export enum KindLanguage {
  js = "javascript",
  none = "",
}

export interface Config {
  files?: JSONSchemaDefinition;
}

export interface Options {
  overwrite?: boolean;
  debug?: boolean;
  config?: Config;
  kind: Kind;
}

export interface InitOptions extends Options {
  repository: string;
  language: Language;
}

export type Errors = (ErrorObject | string)[];
