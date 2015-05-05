#!/usr/bin/env bash

echo '

runSimple("mongod")
runSimple("mongo")
runSimple("node '$1' --env APP_ENV")

on runSimple(command)
  tell application "Terminal"
    activate
    set newTab to do script(command)
  end tell
  return newTab
end runSimple

' | osascript - "$@" > /dev/null