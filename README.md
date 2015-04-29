# gulp-mean-seed
Gulp generator for MEAN stack apps.

## Dependencies
    
### Global

* `nodejs`
* `npm`
* `mongodb`

#### Windows

* Most of the shell commands are windows friendly. However it is recommended that you install `git-bash` or something
  so that certain *Nix utilities are in your PATH.

#### Mac
* The mongodb package uses a C compiler that requires `x-code`

## Install
Make sure to install globally.
`npm install -g gulp-mean-seed`

## Usage
`$ gulp-mean-seed APP_NAME`

In the directory of your choosing, issue the preceding command. Obviously, change `APP_NAME` to the desired name of your app.

An example workflow is as follows:

    $~ npm install -g gulp-mean-seed
    $ cd ~/Sites
    $ gulp-mean-seed meanSeedApp
    $ cd meanSeedApp
    $ gulp systems.up

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

`gulp systems.build` - TBD
   This will build all available systems according to the provided configurations.

`gulp systems.deploy` - TBD
    This will deploy all available systems to their mandated locations.

****

#### API - MONGO

`gulp mongo.seed` -
    This command has to be executed inside of `./platform`. GULP-MEAN-SEED does not want to assume that it is creating a DB
    from scratch and therefor will not just throw random shit into it. The seed app comes packaged with a full-stack stub of a
   `users` module. Therefore, if you wish to see some end-to-end data transfer, feel free to seed the DB with the mock users we provide.

## Configuration

### MongoDB

On Windows machines, the mongo install does not add the binaries to your PATH. There for in the seed artificat, please update the paths to match where your shell and daemon binaries are located.

I recommend using `C:\mongodb` as your install site.

On Macintosh systems, I recommend `homebrew` to install b/c it's just easyy. In any case, you MUST ensure that both `mongod` and `mongo` are in your PATH.

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
