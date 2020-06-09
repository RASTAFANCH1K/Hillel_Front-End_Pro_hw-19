// EXERCISE-1:
// 1) Заимлементить сервер на порту 3000
// 2) Сервер должен реагировать на POST запрос /user , принимая такое body { school: 'Hillel', course: 'javascript pro'}, и 
// необходимо добавить поле teacher: 'Sergei' к этому обьекту и вернуть его
// 3)Устанавливаем монго!
// SOLUTION:

let http = require('http');
let url = require('url');

const hostname = 'localhost';
const port = 3000;

const requestListener = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Content-Type', 'application/json');
  
  const q = url.parse(req.url, true);
  const pathName = q.pathname;

  const methods = ['POST', 'OPTIONS'];

  if (methods.includes(req.method) && pathName === '/user') {
    let body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = String(body); // body = Buffer.concat(body).toString();
      
      if(body) {
        const r = JSON.parse(body);
        r.teacher = 'Sergei';
        res.end(JSON.stringify(r));
      } else {
        res.end(JSON.stringify({}))
      }
    });
  }
}

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server is listening on http://${hostname}:${port}`);
});