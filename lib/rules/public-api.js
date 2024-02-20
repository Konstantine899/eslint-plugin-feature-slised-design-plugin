"use strict";
const { isPathRelative } = require("../helpers/isPathRelative");
const { layers } = require("../helpers/for-pablic-api/layers");
const path = require("path");
const micromatch = require("micromatch");

module.exports = {
  meta: {
    type: null,
    docs: {
      description: "description",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: "object",
        properties: { alias: { type: "string" }, testFiles: { type: "array" } },
      },
    ],
  },

  create(context) {
    const { alias = "", testFiles = [] } = context.options[0] ?? {};
    return {
      ImportDeclaration(node) {
        try {
          const value = node.source.value;
          const importToFile = alias ? value.replace(`${alias}/`, "") : value;

          if (isPathRelative(importToFile)) {
            return;
          }

          const pathSegments = importToFile.split("/");
          const layer = pathSegments[0];

          if (!layers[layer]) {
            return;
          }

          const isImportNotFromPublicApi = pathSegments.length > 2;

          // testing public api testing.ts
          const isTestingPublicApi =
            pathSegments[2] === "testing" && pathSegments.length < 4;

          if (isImportNotFromPublicApi && !isTestingPublicApi) {
            context.report(
              node,
              "Абсолютный import разрешен только из index.ts"
            );
          }

          if (isTestingPublicApi) {
            const pathCurrentFile = context.getFilename();
            const normalizedPath = path.toNamespacedPath(pathCurrentFile);
            const isCurrentFileTesting = testFiles.some((pattern) => {
              return micromatch.isMatch(normalizedPath, pattern);
            });
            if (!isCurrentFileTesting) {
              context.report(
                node,
                "Тестовые данные необходимо импортировать из testing.ts"
              );
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
};
