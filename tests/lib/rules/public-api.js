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
    {
      filename: "E:\\git\\online-store-frontend\\src\\entities\\file.test.ts",
      code: "import { BrandActions } from '@/entities/Brand/testing'",
      errors: [],
      options: testingOptions,
    },
    {
      filename:
        "E:\\git\\online-store-frontend\\src\\entities\\StoreDecorator.tsx",
      code: "import { BrandActions } from '@/entities/Brand/testing'",
      errors: [],
      options: testingOptions,
    },
  ],

  invalid: [
    {
      code: "import { BrandActions } from '@/entities/Brand/model/slices/BrandSlice'",
      errors: [{ message: "Абсолютный import разрешен только из index.ts" }],
      options: aliasOptions,
    },
    {
      filename:
        "E:\\git\\online-store-frontend\\src\\entities\\StoreDecorator.tsx",
      code: "import { BrandActions } from '@/entities/Brand/example.tsx'",
      errors: [{ message: "Абсолютный import разрешен только из index.ts" }],
      options: testingOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\entities\\example.tsx",
      code: "import { BrandActions } from '@/entities/Brand/testing'",
      errors: [
        { message: "Тестовые данные необходимо импортировать из testing.ts" },
      ],
      options: testingOptions,
    },
  ],
});
