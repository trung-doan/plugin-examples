const recomendEslintRule = require('eslint/conf/eslint-recommended.js');
const cybozuEs5Rules = require('@cybozu/eslint-config/lib/es5.js');
const globalKintone = require('@cybozu/eslint-config/globals/kintone.js');
Object.assign(cybozuEs5Rules.rules, {...recomendEslintRule.rules, ...cybozuEs5Rules.rules});
Object.assign(cybozuEs5Rules, {...globalKintone});
export default cybozuEs5Rules;
