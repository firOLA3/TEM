# TEM (Terminal Event Monitor)

Terminal Event Monitor (TEM) is a Windows-first developer tool designed to make terminal error handling effortless. When an error appears in the terminal, TEM automatically detects it, extracts the surrounding source code context, formats it into Markdown, and pipes it directly into your VS Code Copilot Chat (or your clipboard).

## Architecture

TEM consists of two components:
1. **The TEM Daemon (Python):** A Windows System Tray app that runs in the background. It listens for a global hotkey (`Win+Alt+E`). When pressed, it scrapes your active Windows Terminal, parses the error, grabs the source file snippet, and sends it to the VS Code bridge.
2. **The VS Code Extension (TypeScript):** A lightweight extension that runs a local server to receive payloads from the daemon and instantly pop open Copilot Chat with the error pre-loaded.

## Installation

### 1. The TEM Daemon (Windows System Tray App)

You can run the daemon directly from source, or build it into a standalone `.exe`.

**From Source:**
```powershell
# Install dependencies
pip install -e .

# Start the tray app
tem tray
```

**Build Standalone Executable:**
```powershell
pip install pyinstaller
python build.py
```
This will generate `dist/tem.exe`. You can place this executable in your startup folder so TEM is always running.

### 2. The VS Code Extension Bridge

```powershell
cd vscode-extension
npm install
npm run compile
```
*Note: You can package this extension into a `.vsix` file using `vsce` to install it permanently in VS Code.*

## Usage

1. Ensure the **TEM Daemon** (or `tem.exe`) is running. You will see a red icon in your System Tray.
2. Ensure the **VS Code Extension** is active.
3. When a script crashes in your Windows Terminal, simply press **`Win+Alt+E`**.
4. Copilot Chat will instantly slide open with the exact error and code context ready for analysis!

### Smart Filter
By right-clicking the TEM System Tray icon, you can toggle the **Smart Filter**:
- **Enabled (Default):** TEM intelligently parses the error, drops the noise, and appends 7 lines of code context from your disk.
- **Disabled:** TEM bypasses the parsers and simply copies your *entire* visible terminal buffer.

### Fallback Mode
If VS Code is closed or the extension isn't installed, TEM gracefully falls back to copying the formatted error directly to your Windows Clipboard and sends a Windows Toast Notification to let you know it's ready to paste!
