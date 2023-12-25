#!/bin/sh -xe

WORK_DIR=$(pwd)
PROJECT=webdevelop-pro
SERVICE=ui-kit

case $1 in

install)
  yarn set version stable
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
  yarn build-storybook
  ;;

deploy-dev)
  ./make.sh install
  ./make.sh build
  gsutil -m cp -r storybook-static/** gs://ui-kit-webdevelop/
  # какая-то проблема с gsutils
  # он перестал нормально определять тип файлов
  gsutil -m setmeta -h "Content-Type:text/html" gs://ui-kit-webdevelop/**.html
  gsutil -m setmeta -h "Content-Type:text/javascript" gs://ui-kit-webdevelop/**.js
  gsutil -m setmeta -h "Content-Type:application/json" gs://ui-kit-webdevelop/**.json
  gsutil -m setmeta -h "Content-Type:application/json" gs://ui-kit-webdevelop/**.js.map
  gsutil -m setmeta -h "Content-Type:text/html" gs://ui-kit-webdevelop/**.html
  gsutil -m setmeta -h "Content-Type:image/svg+xml" gs://ui-kit-webdevelop/**.svg
  gsutil -m setmeta -h "Content-Type:image/jpeg" gs://ui-kit-webdevelop/**.jpg
  gsutil -m setmeta -h "Content-Type:image/jpeg" gs://ui-kit-webdevelop/**.jpeg
  gsutil -m setmeta -h "Content-Type:image/png" gs://ui-kit-webdevelop/**.png
  gsutil -m setmeta -h "Content-Type:text/css" gs://ui-kit-webdevelop/**.css
  gsutil -m setmeta -h "Content-Type:application/vnd.ms-opentype" gs://ui-kit-webdevelop/**.ttf
  ;;


help)
  cat make.sh | grep "^[a-z-]*)"
  ;;


*)
  echo "unknown $1, try help"
  ;;

esac
