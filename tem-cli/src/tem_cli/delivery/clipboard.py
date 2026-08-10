import pyperclip

def copy_to_clipboard(text: str):
    """
    Copies the provided text to the system clipboard.
    """
    pyperclip.copy(text)
