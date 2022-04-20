#!/bin/bash

rm -rf public/
hugo
cp index.html public/
mv public/main*css public/main.min.7442432ac5e58bbb424630e93384feb8b415f58ee3406678a016476588e7ab84.css
mv public/demo*css public/demo.min.9a8314c8ba82c1fec46ad930f6cfe86547c0237ae0064c1ee53b829948fd408f.css
mv public/demo*js public/demo.8116da3b8bfb9827aff6793dc146d2909edaef4eb9ad0588771b03b91ae7a907.js