#!/bin/bash

apt update

curl -sL https://deb.nodesource.com/setup_18.x -o ./nodesource_setup.sh

bash ./nodesource_setup.sh

apt install -y nodejs

apt update

npm install -g npm
