import re
from typing import Optional
from .base import BaseParser
from ..models import ErrorPayload

class PythonParser(BaseParser):
    def detect(self, output_lines: list) -> Optional[ErrorPayload]:
        error_block = []
        in_error = False
        file_path = None
        line_number = None
        
        file_line_regex = re.compile(r'  File "([^"]+)", line (\d+)')
        
        for line in output_lines:
            if "Traceback (most recent call last):" in line:
                in_error = True
            elif '  File "' in line and '", line ' in line:
                in_error = True
                
            if in_error:
                error_block.append(line)
                match = file_line_regex.search(line)
                if match:
                    # In Python, the last frame printed is where the error occurred
                    # so we overwrite to get the innermost frame.
                    file_path = match.group(1)
                    line_number = int(match.group(2))
                
        if error_block:
            return ErrorPayload(
                raw_text="".join(error_block),
                file_path=file_path,
                line_number=line_number
            )
            
        return None
