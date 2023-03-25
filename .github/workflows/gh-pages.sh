#!/usr/bin/env bash

DIR=$1

[ -e content/wiki/_Sidebar.md ] && rm content/wiki/_Sidebar.md

[ -d build/$DIR ] && git -C build/ rm -r $DIR/

. .github/workflows/build.sh

sed -i "s/jmespath\.site\/demo/jmespath\.site\/${DIR}\/demo/g" build/$DIR/index.html 
sed -i "s/jmespath\.site\/main\.min/jmespath\.site\/main\/${DIR}\.min/g" build/$DIR/index.html 