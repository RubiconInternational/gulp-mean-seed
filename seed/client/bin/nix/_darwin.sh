#!/usr/bin/env bash

echo '

runSimple("cd '$1' && gulp serve --env APP_ENV")

on runSimple(command)
  tell application "Terminal"
    activate
    set newTab to do script(command)
  end tell
  return newTab
end runSimple

' | osascript - "$@" > /dev/null