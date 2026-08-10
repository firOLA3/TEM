import unittest
from tem_cli.parsers.python import PythonParser
from tem_cli.parsers.node import NodeParser
from tem_cli.parsers.rust import RustParser
from tem_cli.parsers import parse_output

class TestParsers(unittest.TestCase):
    def test_python_traceback(self):
        output = [
            "Running script...\n",
            "Traceback (most recent call last):\n",
            "  File \"script.py\", line 1, in <module>\n",
            "    1/0\n",
            "ZeroDivisionError: division by zero\n"
        ]
        parser = PythonParser()
        result = parser.detect(output)
        self.assertIn("ZeroDivisionError", result.raw_text)
        self.assertNotIn("Running script", result.raw_text)

    def test_node_runtime(self):
        output = [
            "Starting node...\n",
            "TypeError: Cannot read properties of undefined (reading 'foo')\n",
            "    at Object.<anonymous> (/path/to/app.js:2:15)\n",
            "    at Module._compile (node:internal/modules/cjs/loader:1254:14)\n"
        ]
        parser = NodeParser()
        result = parser.detect(output)
        self.assertIn("TypeError", result.raw_text)
        self.assertIn("at Object", result.raw_text)
        self.assertNotIn("Starting node", result.raw_text)

    def test_node_npm_err(self):
        output = [
            "npm start\n",
            "npm ERR! code ELIFECYCLE\n",
            "npm ERR! errno 1\n",
            "npm ERR! app@1.0.0 start: `node app.js`\n"
        ]
        parser = NodeParser()
        result = parser.detect(output)
        self.assertIn("npm ERR! code ELIFECYCLE", result.raw_text)
        self.assertNotIn("npm start", result.raw_text)

    def test_node_cannot_find_module(self):
        output = [
            "Error: Cannot find module 'express'\n",
            "Require stack:\n",
            "- /path/to/app.js\n"
        ]
        parser = NodeParser()
        result = parser.detect(output)
        self.assertIn("Cannot find module", result.raw_text)
        
    def test_node_syntax(self):
        output = [
            "SyntaxError: Unexpected token '{'\n",
            "    at Object.compileFunction (node:vm:352:18)\n"
        ]
        parser = NodeParser()
        result = parser.detect(output)
        self.assertIn("SyntaxError", result.raw_text)

    def test_rust_compiler_error(self):
        output = [
            "Compiling app v0.1.0\n",
            "error[E0384]: cannot assign twice to immutable variable `x`\n",
            " --> src/main.rs:4:5\n",
            "  |\n",
            "2 |     let x = 5;\n",
            "  |         - first assignment\n"
        ]
        parser = RustParser()
        result = parser.detect(output)
        self.assertIn("error[E0384]", result.raw_text)
        self.assertNotIn("Compiling app", result.raw_text)

    def test_rust_panic(self):
        output = [
            "Running `target/debug/app`\n",
            "thread 'main' panicked at src/main.rs:10:5:\n",
            "called `Option::unwrap()` on a `None` value\n",
            "note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace\n"
        ]
        parser = RustParser()
        result = parser.detect(output)
        self.assertIn("panicked at", result.raw_text)
        self.assertIn("RUST_BACKTRACE=1", result.raw_text)
        self.assertNotIn("Running `target", result.raw_text)
        
    def test_registry(self):
        output = [
            "Running...\n",
            "npm ERR! code ELIFECYCLE\n"
        ]
        result = parse_output(output)
        self.assertIn("npm ERR!", result.raw_text)

if __name__ == '__main__':
    unittest.main()
