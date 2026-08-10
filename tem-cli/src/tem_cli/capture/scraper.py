import time
import pyperclip
import keyboard
import uiautomation as auto

def get_terminal_text_uia() -> str:
    """Attempts to read text from Windows Terminal using UI Automation."""
    try:
        terminal = auto.WindowControl(ClassName='CASCADIA_HOSTING_WINDOW_CLASS', searchDepth=1)
        if not terminal.Exists(0, 0):
            return ""
            
        document = terminal.DocumentControl()
        if document.Exists(0, 0):
            # Try TextPattern first, common for rich text controls
            try:
                return document.GetTextPattern().DocumentRange.GetText(-1)
            except Exception:
                # Fallback to ValuePattern if applicable
                return document.GetValuePattern().Value
                
    except Exception as e:
        print(f"UIA Scrape Error: {e}")
        
    return ""

def get_terminal_text_fallback() -> str:
    """Uses Ctrl+A -> Ctrl+C to grab the buffer text via the clipboard."""
    original_clipboard = pyperclip.paste()
    
    keyboard.send('ctrl+shift+a') # some terminals use ctrl+shift+a for select all
    time.sleep(0.05)
    keyboard.send('ctrl+a')
    time.sleep(0.05)
    keyboard.send('ctrl+c')
    time.sleep(0.1)
    
    terminal_text = pyperclip.paste()
    
    pyperclip.copy(original_clipboard)
    
    keyboard.send('escape') # clear selection
    
    return terminal_text

def scrape_terminal() -> list:
    """
    Scrapes the terminal output. Tries UIA first, if it's empty or too short, uses Ctrl+A/C fallback.
    Returns the lines of text.
    """
    text = get_terminal_text_uia()
    
    # If UIA failed or returned very little text (cut off)
    if not text or len(text) < 100:
        fallback_text = get_terminal_text_fallback()
        if len(fallback_text) > len(text):
            text = fallback_text
            
    return text.splitlines() if text else []
