#!/usr/bin/env bash
echo $1
mongodump --db APP_NAME -o $1