#!/usr/bin/env sh

set -e

yarn run build

cd ./dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:code-ans/code-ans.github.io.git master

cd -
