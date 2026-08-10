from typing import Optional
from ..models import ErrorPayload

class BaseParser:
    def detect(self, output_lines: list) -> Optional[ErrorPayload]:
        """
        Takes a list of strings (output lines).
        Returns an ErrorPayload if an error is detected.
        Returns None if no error is detected.
        """
        raise NotImplementedError
