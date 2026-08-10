from typing import Optional
from .python import PythonParser
from .node import NodeParser
from .rust import RustParser
from ..models import ErrorPayload

# Order matters: first parser to return a non-empty string wins.
PARSERS = [
    PythonParser(),
    NodeParser(),
    RustParser(),
]

def parse_output(output_lines: list) -> Optional[ErrorPayload]:
    """
    Iterates through all registered parsers. 
    Returns the ErrorPayload from the first parser that detects an error.
    Returns None if no error is detected by any parser.
    """
    for parser in PARSERS:
        try:
            error_payload = parser.detect(output_lines)
            if error_payload:
                return error_payload
        except Exception as e:
            # Prevent one faulty parser from breaking the whole chain
            print(f"TEM Parser Error ({parser.__class__.__name__}): {e}")
            continue
            
    return None
