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

## gulp-mean-seed API

This API applies to the gulpfile WITHIN the generated seed app.

### Organization and Architecture

The idea is that the seed is a system that encapsulates subsystems.

At the current version, the subsystems are: `platform` and `client`.

#### Creating new Systems.

    More on this later.

****

### API

#### API - General

`gulp APP_NAME` -
    At any point you can type this and be shown a list of available tasks for the seed's gulp file.
    Be sure to replace `APP_NAME` with the name of your app.

#### API - Systems

`gulp systems` -
    This will show you the available systems within your app.

`gulp systems.[system name]` -
    This will show you the available tasks within that system. This is dynamic API, thusly, replace `system name` with the name of the system.

`gulp systems.[system name].[task name]` -
    Will execute a system's task. The idea is that you could manually run methods in your systems individual gulp file if need be.
    Ideally, you shouldn't have to via the system API's convenience methods.

`gulp systems.up` -
    This will launch all available systems.

`gulp systems.build` -
   This will build all available systems according to the provided configurations.

`gulp systems.deploy` -
    This will deploy all available systems to their mandated locations.

****

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
