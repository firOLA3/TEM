import re
from typing import Optional
from .base import BaseParser
from ..models import ErrorPayload

class RustParser(BaseParser):
    def detect(self, output_lines: list) -> Optional[ErrorPayload]:
        error_block = []
        in_error = False
        file_path = None
        line_number = None
        
        # Matches typical rust file path and line number, e.g. src/main.rs:10:5
        rust_file_regex = re.compile(r'([^ \n\'"]+\.rs):(\d+):\d+')
        
        for line in output_lines:
            if line.startswith("error[E") or line.startswith("error: "):
                in_error = True
            elif "thread" in line and "panicked at" in line:
                in_error = True
            elif "run with `RUST_BACKTRACE=1` environment variable to display a backtrace" in line:
                if not in_error:
                    in_error = True
                    error_block.append(line)
                    continue
                    
            if in_error:
                error_block.append(line)
                
                if not file_path:
                    match = rust_file_regex.search(line)
                    if match:
                        file_path = match.group(1)
                        line_number = int(match.group(2))
                
        if error_block:
            return ErrorPayload(
                raw_text="".join(error_block),
                file_path=file_path,
                line_number=line_number
            )
            
        return None
