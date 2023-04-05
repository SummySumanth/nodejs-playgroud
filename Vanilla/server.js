const http = require('http');
const fs = require('fs');

const port = 3000;
console.clear();
console.log('Server started listening at port:', port);
console.log('----------------------------------------------------');

let reqNumer = 1;

const requestListener = (req, res) => {
  reqNumer += 1;
  const { url } = req;

  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><form action="/message" method="POST"><input type="text" name="testtext"/><button type="submit">Submit</button></form></body></html>');
    return res.end();
  }

  if (req.url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log('parsed Body', parsedBody);
      const msg = parsedBody.split('=')[1];
      fs.writeFile('./message.txt', msg, () => {
        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
      });
    });
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<html><body>Hello World</body></html>');

  if (req.url === '/clear') {
    console.clear();
  }

  console.log('~~~ END OF REQ ~~~');
  res.end();
  console.log('----------------------------------------------------');
  console.log('----------------------------------------------------');
};

const server = http.createServer(requestListener);

server.listen(port);
