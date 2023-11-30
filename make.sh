#!/bin/sh

WORK_DIR=$(pwd)
PROJECT=webdevelop-pro
SERVICE=ui-kit

case $1 in

install)
  yarn install
  ;;

lint)
  yarn lint
  ;;

test)
  yarn test
  ;;

run-dev)
  yarn storybook
  ;;

audit)
  yarn audit:check
  ;;

build)
  yarn build
  ;;


help)
  cat make.sh | grep "^[a-z-]*)"
  ;;


*)
  echo "unknown $1, try help"
  ;;

esac
