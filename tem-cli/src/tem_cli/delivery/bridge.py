import urllib.request

def send_to_vscode(markdown_payload: str) -> bool:
    """
    Sends the markdown payload to the local VS Code extension bridge.
    Returns True if successful, False if the connection was refused or timed out.
    """
    url = "http://127.0.0.1:54321/tem-error"
    data = markdown_payload.encode('utf-8')
    
    req = urllib.request.Request(url, data=data, method='POST')
    try:
        # Very short timeout so we fallback to clipboard immediately if VS Code is closed
        with urllib.request.urlopen(req, timeout=1.0) as response:
            if response.status == 200:
                return True
    except Exception:
        pass
        
    return False
