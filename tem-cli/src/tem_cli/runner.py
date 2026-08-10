import subprocess
import sys
from .parsers import parse_output
from .context import enrich_payload, format_markdown
from .delivery.bridge import send_to_vscode
from .delivery.clipboard import copy_to_clipboard
from .delivery.toast import show_toast

def run_command(target_command: list) -> int:
    """
    Runs the target command, streaming stdout/stderr to the console,
    while capturing the output to detect errors.
    """
    output_lines = []
    
    try:
        cmd_str = subprocess.list2cmdline(target_command)
        
        process = subprocess.Popen(
            cmd_str,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT, # Merge stderr into stdout for easier sequential parsing
            text=True,
            bufsize=1 # Line buffered
        )
        
        while True:
            line = process.stdout.readline()
            if not line and process.poll() is not None:
                break
            if line:
                # Print to terminal in real time
                sys.stdout.write(line)
                sys.stdout.flush()
                # Store for parsing
                output_lines.append(line)
                
        return_code = process.poll()
        
        # Always run parsers to check for errors, regardless of exit code
        error_payload = parse_output(output_lines)
        if error_payload:
            enriched_payload = enrich_payload(error_payload)
            final_markdown = format_markdown(enriched_payload)
            
            # Try to send to VS Code extension directly
            success = send_to_vscode(final_markdown)
            
            if not success:
                # Fallback to clipboard
                copy_to_clipboard(final_markdown)
                show_toast("Error Detected", "The error block was copied to your clipboard. Paste it into your coding agent!")
                
        return return_code

    except Exception as e:
        print(f"TEM Failed to run command: {e}")
        return 1
