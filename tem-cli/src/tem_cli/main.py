import argparse
import sys
from .runner import run_command
from .parsers import parse_output
from .context import enrich_payload, format_markdown
from .delivery.bridge import send_to_vscode
from .delivery.clipboard import copy_to_clipboard
from .delivery.toast import show_toast
from .capture.scraper import scrape_terminal
from .capture.hotkey import start_hotkey_listener
from .config import is_smart_filter_enabled

def handle_capture():
    """Callback fired when the hotkey is pressed."""
    lines = scrape_terminal()
    if not lines:
        print("No terminal output captured.")
        return
        
    if is_smart_filter_enabled():
        error_payload = parse_output(lines)
        if error_payload:
            enriched = enrich_payload(error_payload)
            md = format_markdown(enriched)
        else:
            print("No recognized errors found in the current terminal output.")
            return
    else:
        # Just use the raw lines if Smart Filter is disabled
        md = "I encountered an issue:\n```\n" + "\n".join(lines) + "\n```"
        
    if not send_to_vscode(md):
        copy_to_clipboard(md)
        show_toast("Error Detected", "The error block was copied to your clipboard.")
    print("Error successfully captured and delivered!")

def main():
    parser = argparse.ArgumentParser(
        prog="tem",
        description="Terminal Event Monitor - Capture and deliver terminal errors."
    )
    
    subparsers = parser.add_subparsers(dest="command")
    
    run_parser = subparsers.add_parser(
        "run", 
        help="Run a command and monitor its output for errors."
    )
    
    run_parser.add_argument(
        "target_command", 
        nargs=argparse.REMAINDER,
        help="The command to run, e.g., 'python script.py'"
    )
    
    daemon_parser = subparsers.add_parser(
        "daemon",
        help="Start the background daemon to listen for Win+Alt+E"
    )
    
    tray_parser = subparsers.add_parser(
        "tray",
        help="Start the background daemon with a System Tray GUI"
    )
    
    args = parser.parse_args()
    
    # If no subcommand is provided (e.g. double-clicking the .exe), default to tray app
    if args.command is None:
        args.command = "tray"
        
    if args.command == "run":
        if not args.target_command:
            print("Please provide a command to run. Example: tem run python script.py")
            sys.exit(1)
            
        target = args.target_command
        if target and target[0] == "--":
            target = target[1:]
            
        sys.exit(run_command(target))
    elif args.command == "daemon":
        start_hotkey_listener(handle_capture)
    elif args.command == "tray":
        from .tray import start_tray_app
        start_tray_app()
    else:
        parser.print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()
