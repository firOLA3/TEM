import os
import linecache
from ..models import ErrorPayload

def enrich_payload(payload: ErrorPayload) -> ErrorPayload:
    """
    Enriches the ErrorPayload with the code snippet around the target line.
    """
    if not payload.file_path or not payload.line_number:
        return payload
        
    file_path = payload.file_path
    if not os.path.exists(file_path):
        return payload
        
    padding = 3
    start_line = max(1, payload.line_number - padding)
    end_line = payload.line_number + padding
    
    snippet_lines = []
    for i in range(start_line, end_line + 1):
        line = linecache.getline(file_path, i)
        if line:
            prefix = "> " if i == payload.line_number else "  "
            snippet_lines.append(f"{i:4} | {prefix}{line.rstrip()}")
            
    if snippet_lines:
        payload.context_snippet = "\n".join(snippet_lines)
        
    return payload
