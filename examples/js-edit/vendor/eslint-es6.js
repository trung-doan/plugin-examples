const recomendEslintRule = require('eslint/conf/eslint-recommended.js');
const cybozuBaseRules = require('@cybozu/eslint-config/lib/base.js');
Object.assign(cybozuBaseRules.rules, {...recomendEslintRule.rules, ...cybozuBaseRules.rules});

export default cybozuBaseRules;
