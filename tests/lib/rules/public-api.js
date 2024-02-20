/**
 * @fileoverview description
 * @author konstantine899
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

const aliasOptions = [{ alias: "@" }];
const testingOptions = [
  {
    alias: "@",
    testFiles: ["**/*.test.*", "**/*.stories.*", "**/StoreDecorator.tsx"],
  },
];

ruleTester.run("public-api", rule, {
  valid: [
    {
      code: "import { BrandActions } from '../../model/slices/BrandSlice'",
      errors: [],
    },
    {
      code: "import { BrandActions } from '@/entities/Brand'",
      errors: [],
      options: aliasOptions,
    },
  ],

  invalid: [
    {
      code: "import { BrandActions } from '@/entities/Brand/model/slices/BrandSlice'",
      errors: [{ message: "Абсолютный import разрешен только из index.ts" }],
      options: aliasOptions,
    },
  ],
});
