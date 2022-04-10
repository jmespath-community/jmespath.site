#!/usr/bin/env bash

# Consume HTTP header
while read line; do
  [[ -z ${line//$'\r'} ]] && break
done

read query
echo -e "HTTP/1.0 200 OK\r\ncontent-type: text/plain; charset=utf-8\r\n\r\n"
./jp "$query" | tee /dev/stderr
