import * as vscode from 'vscode';
import * as http from 'http';

let server: http.Server | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('TEM extension activated.');

    server = http.createServer((req, res) => {
        if (req.method === 'POST' && req.url === '/tem-error') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    // Open Copilot Chat and populate with the query
                    vscode.commands.executeCommand('workbench.action.chat.open', { query: body }).then(() => {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Success');
                    }, (err) => {
                        console.error('Failed to open chat:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Failed to open chat');
                    });
                } catch (e) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Server Error');
                }
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });

    // Listen on localhost only
    server.listen(54321, '127.0.0.1', () => {
        console.log('TEM local bridge server listening on port 54321');
    });
}

export function deactivate() {
    if (server) {
        server.close();
    }
}
