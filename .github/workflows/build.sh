#!/usr/bin/env bash

export SRCDIR="$(dirname $(realpath "$0"))"

curl -L https://github.com/jmespath-community/jp/releases/download/v1.1.0/jp-linux-amd64 --output jp
chmod +x jp

# Start JMESPath service so that hugo can pre-execute example queries
ncat -lk -p 8000 -e "$SRCDIR/jp_service.sh" &
srv=$!

hugo --minify -d "$OUTPUTDIR"

kill ${srv}
