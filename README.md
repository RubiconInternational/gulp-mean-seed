# gulp-mean-seed
Gulp generator for MEAN stack apps.

## Install
Make sure to install globally.
`npm install -g gulp-mean-seed`

## Usage
`$ gulp-mean-seed APP_NAME`

In the directory of your choosing, issue the preceding command. Obviously, change `APP_NAME` to the desired name of your app.

An example workflow is as follows:

    $~ npm install -g gulp-mean-seed
    $ cd ~/Sites
    $ gulp-mean-seed angularSeedApp
    $ cd angularSeedApp
    $ gulp serve

## Context
This project was originally built for my co-workers who wanted to see how I structure a full-stack JS application.
It is fairly opinionated and contains things like `dependency injection namespaceing` that will probably be confusing without an explanation.

## What's next

in the following release I aim to include test framework integrations as well as
some tests that leverage them.

The next release will include an abstraction between `/client` and `/server`. Included in `/server` will exist some simple Node API stubs and some tests that flex them.

The install script will also set up MongoDB requirements.

## Known Issues
Please see the issues tab. Likewise, please submit issues as you come across them!
