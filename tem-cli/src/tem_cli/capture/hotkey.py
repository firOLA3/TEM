import keyboard
import time

def start_hotkey_listener(callback):
    """
    Blocks and listens for the global hotkey (Win+Alt+E).
    When pressed, invokes the callback.
    """
    print("TEM Daemon is running in the background. Press Win+Alt+E to capture an error.")
    print("Press Ctrl+C here to stop the daemon.")
    
    # We use a debounce to prevent multiple rapid triggers
    last_trigger = 0
    
    def on_hotkey():
        nonlocal last_trigger
        now = time.time()
        if now - last_trigger > 1.0: # 1 second debounce
            last_trigger = now
            print("\nHotkey pressed! Capturing terminal...")
            callback()
            
    keyboard.add_hotkey('windows+alt+e', on_hotkey)
    
    # Block forever
    keyboard.wait()
