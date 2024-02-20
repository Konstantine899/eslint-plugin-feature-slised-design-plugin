"use strict";

const rule = require("../../../lib/rules/layer-imports"),
  RuleTester = require("eslint").RuleTester;

const aliasOptions = [
  {
    alias: "@",
  },
];

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: "E:\\git\\online-store-frontend\\src\\features\\Brand",
      code: "import { Button } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\features\\Brand",
      code: "import { Button } from '@/entities/Brand'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\app\\providers",
      code: "import { Button } from '@/widgets/Navbar'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\widgets\\pages",
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\app\\providers",
      code: "import { createSlice } from 'redux'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\index.tsx",
      code: "import { StoreProvider } from '@/app/providers/StoreProvider'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\entities\\Brand.tsx",
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: "@",
          ignoreImport: ["**/StoreProvider"],
        },
      ],
    },
  ],

  invalid: [
    {
      filename: "E:\\git\\online-store-frontend\\src\\entities\\Brand",
      code: "import { Brand } from '@/app/features/Brand'",
      errors: [
        {
          message:
            "Слой может импортировать в себя только нижележащие слои: shared, entities, features, widgets, pages, app",
        },
      ],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\features\\Brand",
      code: "import { Brand } from '@/widgets/Navbar'",
      errors: [
        {
          message:
            "Слой может импортировать в себя только нижележащие слои: shared, entities, features, widgets, pages, app",
        },
      ],
      options: aliasOptions,
    },
    {
      filename: "E:\\git\\online-store-frontend\\src\\entities\\Brand",
      code: "import { Brand } from '@/widgets/Navbar'",
      errors: [
        {
          message:
            "Слой может импортировать в себя только нижележащие слои: shared, entities, features, widgets, pages, app",
        },
      ],
      options: aliasOptions,
    },
  ],
});
