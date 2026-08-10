from dataclasses import dataclass
from typing import Optional

@dataclass
class ErrorPayload:
    raw_text: str
    file_path: Optional[str] = None
    line_number: Optional[int] = None
    context_snippet: Optional[str] = None
