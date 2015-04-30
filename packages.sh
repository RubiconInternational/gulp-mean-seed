#!/usr/bin/env bash

SKIP=$1

echo $SKIP

if [ $SKIP = --skip-dependencies ]
then
    exit 0
fi

#stop gap until i figure out why ./bin cant find any modules.
npm install -g chalk
npm install -g ascii-art
npm install -g gulp
npm install -g gulp-replace
npm install -g gulp-run
npm install -g minimist@1.1.1
npm install -g run-sequence@^1.0.2
npm install -g v8flags@^2.0.3
npm install -g bower