#!/usr/bin/env sh

set -e

yarn build

cd ./dist

git init
git add -A
git commit -m 'feat: deploy'

git push -f git@github.com:dandanDQ/resume.git master:deploy