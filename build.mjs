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

import { build } from "esbuild";
import pkg  from "esbuild-plugin-fileloc";
const {filelocPlugin} = pkg;

build({
  entryPoints: [`src/cli.ts`],
  bundle: true,
  platform: "node",
  outfile: `dist/cli.mjs`,
  loader: { ".yml": "file" },
  format: "esm",
  external: ["./node_modules/*"],
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from "module";\n const require = topLevelCreateRequire(import.meta.url);',
  },
  plugins: [filelocPlugin()],
}).catch(() => process.exit(1));
