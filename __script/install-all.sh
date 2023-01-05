#!/bin/bash

apt update

apt install -y curl

bash ./script/install-node-js.sh

#bash ./script/install-mongo-db.sh

bash ./script/install-nginx.sh
