#!/bin/bash

# Configuration
APP_NAME="com.ryzenixx.applemusicpresence"
PLIST_PATH="$HOME/Library/LaunchAgents/$APP_NAME.plist"
WORKING_DIR="$(pwd)"
NODE_PATH="/opt/homebrew/bin/node"
TS_NODE_PATH="$WORKING_DIR/node_modules/.bin/ts-node"
ENTRY_FILE="src/main.ts"
LOG_DIR="$HOME/Library/Logs/AppleMusicPresence"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

echo "🚀 Setting up Apple Music Presence as a background service..."

# Create the plist file
cat > "$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>$APP_NAME</string>
    <key>ProgramArguments</key>
    <array>
        <string>$NODE_PATH</string>
        <string>$TS_NODE_PATH</string>
        <string>$ENTRY_FILE</string>
    </array>
    <key>WorkingDirectory</key>
    <string>$WORKING_DIR</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>$LOG_DIR/output.log</string>
    <key>StandardErrorPath</key>
    <string>$LOG_DIR/error.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/homebrew/bin</string>
    </dict>
</dict>
</plist>
EOF

# Set permissions
chmod 644 "$PLIST_PATH"

# Unload previous instance if exists
launchctl unload "$PLIST_PATH" 2>/dev/null

# Load the new plist
launchctl load "$PLIST_PATH"

echo "✅ Service installed and started!"
echo "📄 Logs are available at: $LOG_DIR/output.log"
echo "🔄 The app will now restart automatically if it crashes or on reboot."
