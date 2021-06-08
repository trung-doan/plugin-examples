const recomendEslintRule = require('eslint/conf/eslint-recommended.js');
const cybozuEs5Rules = require('@cybozu/eslint-config/lib/es5.js');

Object.assign(cybozuEs5Rules.rules, {...recomendEslintRule.rules, ...cybozuEs5Rules.rules});

export default cybozuEs5Rules;
