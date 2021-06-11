const recomendEslintRule = require('eslint/conf/eslint-recommended.js');
const cybozuBaseRules = require('@cybozu/eslint-config/lib/base.js');
const globalKintone = require('@cybozu/eslint-config/globals/kintone.js');
Object.assign(cybozuBaseRules.rules, {...recomendEslintRule.rules, ...cybozuBaseRules.rules});
Object.assign(cybozuBaseRules, {...globalKintone});


export default cybozuBaseRules;
