"use strict";
const { isPathRelative } = require("../helpers/isPathRelative");
const { layers } = require("../helpers/for-layer-imports/layers");
const {
  availableLayers,
} = require("../helpers/for-layer-imports/availableLayers");
const micromatch = require("micromatch");
const path = require("path");

/** @type {import('eslint').Rule.RuleModule} */
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
        properties: {
          alias: { type: "string" },
          ignoreImport: { type: "array" },
        },
      },
    ],
  },

  create(context) {
    const { alias = "", ignoreImport = [] } = context.options[0] ?? {};

    const getCurrentLayer = () => {
      const currentPathFile = context.getFilename();
      const normalizedPath = path.toNamespacedPath(currentPathFile);
      const projectPath = normalizedPath?.split("src")[1];
      const pathSegments = projectPath?.split("\\");
      return pathSegments?.[1];
    };

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, "") : "";
      const pathSegments = importPath?.split("/");
      return pathSegments?.[0];
    };

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        const currentLayer = getCurrentLayer();
        const importLayer = getImportLayer(importPath);

        if (isPathRelative(importPath)) {
          return;
        }
        if (!availableLayers[importLayer] || !availableLayers[currentLayer]) {
          return;
        }

        const isIgnoredImport = ignoreImport.some((pattern) => {
          return micromatch.isMatch(importPath, pattern);
        });

        if (isIgnoredImport) {
          return;
        }
        if (!layers[currentLayer]?.includes(importLayer)) {
          context.report(
            node,
            "Слой может импортировать в себя только нижележащие слои: shared, entities, features, widgets, pages, app"
          );
        }
      },
    };
  },
};
