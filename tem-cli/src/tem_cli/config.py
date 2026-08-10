import os
import json

CONFIG_DIR = os.path.expandvars(r'%LOCALAPPDATA%\TEM')
CONFIG_FILE = os.path.join(CONFIG_DIR, 'config.json')

def load_config() -> dict:
    if not os.path.exists(CONFIG_FILE):
        return {"smart_filter_enabled": True}
        
    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return {"smart_filter_enabled": True}

def save_config(config_data: dict):
    os.makedirs(CONFIG_DIR, exist_ok=True)
    try:
        with open(CONFIG_FILE, 'w') as f:
            json.dump(config_data, f, indent=4)
    except Exception as e:
        print(f"Failed to save config: {e}")

def is_smart_filter_enabled() -> bool:
    return load_config().get("smart_filter_enabled", True)

def toggle_smart_filter():
    config = load_config()
    config["smart_filter_enabled"] = not config.get("smart_filter_enabled", True)
    save_config(config)
