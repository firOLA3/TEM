import re
from typing import Optional
from .base import BaseParser
from ..models import ErrorPayload

class NodeParser(BaseParser):
    def detect(self, output_lines: list) -> Optional[ErrorPayload]:
        error_block = []
        in_error = False
        file_path = None
        line_number = None
        
        # Matches typical node stack frame: at Function (/path/file.js:10:5) or at /path/file.js:10:5
        stack_frame_regex = re.compile(r'at .*?(?:\(|^\s*)([^:()]+):(\d+):\d+\)?')
        
        for line in output_lines:
            if line.startswith("npm ERR!"):
                in_error = True
            elif "Error: Cannot find module" in line or "SyntaxError:" in line:
                in_error = True
            elif "TypeError:" in line or "ReferenceError:" in line or "UnhandledPromiseRejection" in line:
                in_error = True
            elif line.startswith("Error:"):
                in_error = True
            elif line.strip().startswith("at ") and ":" in line:
                in_error = True
                
            if in_error:
                error_block.append(line)
                
                # In Node, the first stack frame is usually the innermost, so only grab the first match
                if not file_path:
                    match = stack_frame_regex.search(line)
                    if match:
                        # Node sometimes reports internal modules (node:internal/...). Skip them if possible,
                        # but for MVP just grab the first valid-looking path.
                        potential_path = match.group(1)
                        if not potential_path.startswith("node:"):
                            file_path = potential_path
                            line_number = int(match.group(2))
                
        if error_block:
            return ErrorPayload(
                raw_text="".join(error_block),
                file_path=file_path,
                line_number=line_number
            )
            
        return None
