"use strict";
const {shouldBeRelative} = require('../helpers/for-path-checker/shouldBeRelative');
module.exports = {
  meta: {
    type: null,
    docs: {
      description: "feature sliced relative path checker",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [{ type: "object", properties: { alias: { type: "string" } } }], // описываю что я ожидаю аргументом
  },

  create(context) {
    const alias = context.options[0]?.alias || "";
    return {
      ImportDeclaration(node){
        try {
          const value = node.source.value;
          const importToFile = alias ? value.replace(`${alias}/`, "") : value;
          const importFromFileName = context.getFilename();
          if(shouldBeRelative(importFromFileName, importToFile)){
            context.report(node, 'Этот import должен быть относительным');
          }
        }catch (error){
          console.log(error)
        }
      }
    };
  },
};

