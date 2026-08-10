import pystray
from pystray import MenuItem as item
from PIL import Image, ImageDraw
import threading
from .capture.hotkey import start_hotkey_listener
from .main import handle_capture
from .config import is_smart_filter_enabled, toggle_smart_filter

def create_image():
    image = Image.new('RGB', (64, 64), color=(30, 30, 30))
    dc = ImageDraw.Draw(image)
    dc.rectangle(
        (16, 16, 48, 48),
        fill=(200, 50, 50)
    )
    return image

def start_tray_app():
    daemon_thread = threading.Thread(target=start_hotkey_listener, args=(handle_capture,), daemon=True)
    daemon_thread.start()
    
    def on_toggle_filter(icon, item):
        toggle_smart_filter()
        
    def on_quit(icon, item):
        icon.stop()
        
    menu = pystray.Menu(
        item('Smart Filter', on_toggle_filter, checked=lambda item: is_smart_filter_enabled()),
        item('Quit TEM', on_quit)
    )
    
    icon = pystray.Icon("tem", create_image(), "Terminal Event Monitor", menu)
    icon.run()
