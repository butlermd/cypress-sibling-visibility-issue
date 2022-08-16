const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer((request, response) => {
    let filePath = `.${request.url}`;
    if (request.url !== '/') {
      response.writeHead(301, {
        Location: `http://localhost:3030/`
      }).end()
      return;
    }

    const contentType = 'text/html';

    fs.readFile('./index.html', (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile('./404.html', (error, content) => {
            response.writeHead(404, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
          });
        } else {
          response.writeHead(500);
          response.end(
            `Sorry, check with the site admin for error: ${error.code} ..\n`
          );
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  })
  .listen(3030);