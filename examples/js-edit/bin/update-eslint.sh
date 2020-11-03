#!/bin/bash

set -eux

BASEDIR=$(cd $(dirname $0)/..; pwd)

cd $BASEDIR;
git clone https://github.com/eslint/eslint.git
cd eslint
npm install
npm run webpack
cp build/eslint.js $BASEDIR/vendor/eslint.js
cd -
rm -rf eslint
