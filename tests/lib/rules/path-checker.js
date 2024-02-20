/**
 * @fileoverview feature sliced relative path checker
 * @author konstantine899
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 6, sourceType: "module"}});
ruleTester.run("path-checker", rule, {
    valid: [
        {
            filename: "E:\\git\\online-store-frontend\\src\\entities\\Brand",
            code: "import { BrandActions } from '../../model/slices/BrandSlice'",
            errors: [],
        },
    ],

    invalid: [
        {
            filename: "E:\\git\\online-store-frontend\\src\\entities\\Brand",
            code: "import { BrandActions } from 'entities/Brand/model/slices/BrandSlice'",
            errors: [{message: "Этот import должен быть относительным"}],
        },
        {
            filename: "E:\\git\\online-store-frontend\\src\\entities\\Brand",
            code: "import { BrandActions } from '@/entities/Brand/model/slices/BrandSlice'",
            errors: [{message: "Этот import должен быть относительным"}],
            options: [{alias: '@'}]
        },
    ],
});
