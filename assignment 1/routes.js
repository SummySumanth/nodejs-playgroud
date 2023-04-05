const router = (req, res) => {
  const dummyUsers = ['User A', 'User B', 'User C', 'User D'];
  const buffer = [];
  switch (req.url) {
    case '/':
      res.setHeader('content-type', 'text/html');
      res.write('<html><body><h1><form action="/create-user" method="post"><input type="text" name="test-input"/></input><button type="submit">Send</button></hello></body></html>');
      res.end();
      break;
    case '/user':
      res.setHeader('content-type', 'text/html');
      res.write('<html><body><ul>');
      dummyUsers.forEach((user) => {
        res.write(`<li>${user}</li>`);
      });
      res.write('</ul></body></html>');
      res.end();
      break;
    case '/create-user':
      console.log('create user reached');
      req.on('data', (chunk) => buffer.push(chunk));
      req.on('end', () => {
        console.log('end of req reached');
        console.log('Received Data =>', Buffer.concat(buffer).toString());
        res.end();
      });
      break;
    default:
      res.end();
  }
};

module.exports = router;
