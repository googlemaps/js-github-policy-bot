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

import path from "path";
import fs from "fs";
import isGitDirty from "is-git-dirty";

export const isOnMainBranch = (directory: string): boolean => {
  const head = path.join(directory, ".git", "HEAD");

  return (
    fs.existsSync(head) &&
    /refs\/heads\/main/.test(fs.readFileSync(head, "utf8"))
  );
};

export const check = (directory: string): string[] | undefined => {
  const errors: string[] = [];

  if (isGitDirty(directory)) {
    errors.push("must commit or stash changes");
  }

  if (!isOnMainBranch(directory)) {
    errors.push("must use main as default branch");
  }

  if (errors.length) {
    return errors;
  }
};
