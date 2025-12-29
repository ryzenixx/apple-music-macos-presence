<div align="center">

#  Apple Music Presence

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com)
[![Apple Music](https://img.shields.io/badge/Apple_Music-FA243C?style=for-the-badge&logo=apple-music&logoColor=white)](https://music.apple.com)

**The ultimate Discord Rich Presence integration for Apple Music on macOS.**

<p>
  <a href="#-features">Features</a> •
  <a href="#%EF%B8%8F-prerequisites">Prerequisites</a> •
  <a href="#%EF%B8%8F-installation">Installation</a> •
  <a href="#%EF%B8%8F-background-service-auto-start">Auto-Start</a> •
  <a href="#%EF%B8%8F-configuration">Configuration</a>
</p>

</div>

---

## ✨ Features

- **Real-Time Synchronization**: Instantly updates your Discord status with what's playing.
- **Official MusicKit API**: Uses Apple's official API for 100% accurate, high-resolution album artwork.
- **Smart Status**: 
  - Shows "Listening to **Track Name**" using Discord's specialized activity type.
  - Automatically clears status when music is paused or stopped to keep your profile clean.
- **Privacy Focused**: No data collection, runs entirely locally on your machine.
- **Lightweight**: Written in optimized TypeScript with minimal dependencies.

## ⚠️ Prerequisites

Before you begin, ensure you have the following:

- **macOS**: This application relies on AppleScript/JXA automation which is unique to macOS.
- **Node.js**: Version 16 or higher.
- **Apple Developer Account** (Required for API Access):
  > 🔒 **Important**: To use the official high-quality artwork fetching, you must provide your own Apple Developer Credentials (`Team ID`, `Key ID`, `.p8` Key). This requires a paid Apple Developer Program membership.

## 🛠️ Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/ryzenixx/apple-music-macos-presence.git
    cd apple-music-macos-presence
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

## ⚙️ Configuration

1.  **Setup Environment Variables**
    Copy the example credentials file:
    ```bash
    cp .env.example .env
    ```

2.  **Add your Apple Developer Credentials**
    Open `.env` and fill in your details:
    ```env
    APPLE_TEAM_ID=XXXXXXXXXX
    APPLE_KEY_ID=XXXXXXXXXX
    APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhki...\n-----END PRIVATE KEY-----"
    ```
    > *Need help finding these? Check the [Apple Developer Documentation](https://developer.apple.com/documentation/musickit).*

## 🚀 Usage

Start the application in production mode:

```bash
npm start
```

The application will launch and immediately connect to your local Apple Music instance and Discord client.

## 📦 Background Service (Auto-Start)

To have the application start automatically when you log in and run in the background (hidden):

1.  **Install the Service**:
    ```bash
    ./scripts/install-service.sh
    ```
    *This will create a macOS LaunchAgent and start the service immediately. The app will restart automatically if it crashes.*

2.  **Uninstall the Service**:
    ```bash
    ./scripts/uninstall-service.sh
    ```

## 🔧 Development

Run the project with hot-reloading for development:

```bash
npm run dev
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by ryzenixx. Not affiliated with Apple Inc.</sub>
</div>
