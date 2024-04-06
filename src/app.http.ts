import fs from 'fs';
import http from 'http';

const server = http.createServer((request, response) => {

    console.log(request.url);

    // response.writeHead(200, { 'Content-Type': 'text/html'});
    // response.write('<h1>Hola mundo!</h1>');
    // response.end();

    // const data = { name: 'Juan Carlos', age: 28, city: 'Lima'}
    // response.writeHead(200, { 'Content-Type': 'application/json'});
    // response.end( JSON.stringify(data));

    if (request.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(htmlFile);
        return;
    }

    if (request.url?.endsWith('.js')) {
        const cssFile = fs.readFileSync('./public/css/main.css', 'utf-8')
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(cssFile);
    }
});


server.listen(3024, () => {
    console.log("Server running on port 3024");
});