"use strict";
const { isPathRelative } = require("../helpers/isPathRelative");
const { layers } = require("../helpers/for-pablic-api/layers");

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
        properties: { alias: { type: "string" } },
      },
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || "";
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

          if (isImportNotFromPublicApi) {
            context.report(
              node,
              "Абсолютный import разрешен только из index.ts"
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    };
  },
};
