#!/bin/bash


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

function start_local_jmespath_server(){
  port=$1

  error="Ncat: Connection refused."
  pattern=`echo ${error/\./\\\\.}`
  refused=`ncat -z -v -w5 localhost $port 2>&1 | grep "$pattern"`

  if [[ "${refused}" ]]; then
    echo "Running local JMESPath HTTP server on ::8000…"
    ncat -lk -p $port -e ".github/workflows/jp_service.sh" &
  else
    echo -e "\e[4;33mLocal JMESPath HTTP server already running. Ignoring.\e[0m"
  fi
}

function start_local_hugo_server(){
  port=$1

  if [[ -z "${CODESPACE_NAME}" ]]; then
    hugo server --port $port --watch=false
  else
    hugo server --port $port --watch=false --appendPort=false --baseUrl="https://$CODESPACE_NAME-$port.$GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN"
  fi
}

function serve(){
  start_local_jmespath_server 8000
  start_local_hugo_server 1313
}
