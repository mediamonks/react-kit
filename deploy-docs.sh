#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run storybook:build

# navigate into the build output directory
cd .docs

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init -b main
git config user.name github-actions
git config user.email github-actions@github.com
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:mediamonks/react-hooks.git main:gh-pages

cd -
