import unittest
import os
from tem_cli.models import ErrorPayload
from tem_cli.context import enrich_payload, format_markdown

class TestContext(unittest.TestCase):
    def test_enrich_payload_no_file(self):
        payload = ErrorPayload(raw_text="Error")
        enriched = enrich_payload(payload)
        self.assertIsNone(enriched.context_snippet)

    def test_enrich_payload_with_file(self):
        with open("dummy.py", "w") as f:
            f.write("def foo():\n    print('hello')\n    1/0\n    return False\n")
            
        payload = ErrorPayload(
            raw_text="Traceback ... 1/0",
            file_path="dummy.py",
            line_number=3
        )
        
        enriched = enrich_payload(payload)
        self.assertIsNotNone(enriched.context_snippet)
        self.assertIn(">     1/0", enriched.context_snippet)
        
        os.remove("dummy.py")
        
    def test_format_markdown(self):
        payload = ErrorPayload(
            raw_text="Raw Error Text",
            file_path="dummy.py",
            line_number=3,
            context_snippet="  line 1\n> line 2\n  line 3"
        )
        md = format_markdown(payload)
        self.assertIn("```\nRaw Error Text\n```", md)
        self.assertIn("```\n  line 1\n> line 2\n  line 3\n```", md)

if __name__ == '__main__':
    unittest.main()
