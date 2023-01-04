#!/bin/bash

## This devcontainer is mounting the workspace
## in the /src folder which gets its original contents ignored.
## We need to recreate the symlink to /usr/local/bin/jp

if [[ ! -f "/src/jp" ]]; then
  ln -s /usr/local/bin/jp /src/jp
fi

## The static website pulls most of its contents
## from the jmespath.spec repository and corresponding wiki.
## Clone those repositories here as a courtesy

if [[ ! -d "/src/content/spec" ]]; then
  git clone --depth 1 https://github.com/jmespath-community/jmespath.spec.git /src/content/spec/
fi
if [[ ! -d "/src/content/wiki" ]]; then
  git clone --depth 1 https://github.com/jmespath-community/jmespath.spec.wiki.git /src/content/wiki/
fi

## This repository uses symlinks
## If you are starting this devcontainer from Windows
## we fix this transparently here

rm /src/data/functions
ln -s /src/content/spec/functions /src/data/functions
git update-index --assume-unchanged /src/data/functions

## Start local server to process JMESPath expressions
## This is required during static site generation and
## to power the live samples from the website.
## It can be called with a simple curl command:
## curl -X POST --location http://localhost:8000/json.txt  \
## -H 'Content-Type: text/plain' \
## --data-binary @- << EOF
## foo
## {"foo": "bar"}
## EOF
##

ncat -lk -p 8000 -e ".github/workflows/jp_service.sh" &

## Serve static web site

hugo server
