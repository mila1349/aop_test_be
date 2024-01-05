#!/bin/bash

echo "> INSTALL PACKAGE"
yarn install

echo "> RUN MIGRATION"
./run_migration.sh

echo "==== Running automatically ===="
yarn start