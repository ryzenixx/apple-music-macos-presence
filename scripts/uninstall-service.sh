#!/bin/bash

APP_NAME="com.ryzenixx.applemusicpresence"
PLIST_PATH="$HOME/Library/LaunchAgents/$APP_NAME.plist"

echo "🗑️ Removing Apple Music Presence background service..."

# Unload
launchctl bootout gui/$(id -u) "$PLIST_PATH" 2>/dev/null

# Remove file
rm "$PLIST_PATH" 2>/dev/null

echo "✅ Service removed. The application will no longer start automatically."
