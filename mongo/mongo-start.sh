#!/bin/bash

mkdir -p ./db/db-1
mkdir -p ./db/db-2
mkdir -p ./db/db-3
mkdir -p ./db/db-4

mongod --config ./mongodb-1.config
mongod --config ./mongodb-2.config
mongod --config ./mongodb-3.config
mongod --config ./mongodb-4.config
