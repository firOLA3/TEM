# Workspace Rules

## Node.js Error Parsing Invariants
When parsing or analyzing Node.js terminal output, you MUST explicitly handle both standard runtime stack traces (e.g., `TypeError: ... at <frame>`) AND npm package manager errors (e.g., `npm ERR! code ...`). npm errors do not contain stack frames and must be matched via prefix.

## Windows Terminal UI Automation (UIA) Constraints
When building automated tools that need to read text from Windows Terminal, do not rely solely on UI Automation (UIA). You must implement a fallback that simulates `Ctrl+A` -> `Ctrl+C` to copy the terminal buffer to the clipboard, reads the clipboard, and cleanly restores the original clipboard state.
