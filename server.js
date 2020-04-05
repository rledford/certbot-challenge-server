var http = require('http');
var fs = require('fs');
var path = require('path');

const port = process.env.PORT;
const data = process.env.DATA;
if (!port || !data) {
  if (!port) process.stdout.write('PORT required\n');
  if (!data) process.stdout.write('DATA required\n');
  process.exit(1);
}

const filePath = path.join(
  __dirname,
  '.well-known',
  'acme-challenge',
  data.split('.')[0]
);

if (!fs.existsSync(filePath)) {
  process.stdout.write('creating required .well-known/acme-challenge file\n');
  fs.writeFileSync(filePath, data);
}

const server = http.createServer(function (req, res) {
  var stream = fs.createReadStream(path.join(__dirname, req.url));
  stream.on('error', function () {
    res.writeHead(404);
    res.end();
  });
  stream.pipe(res);
});

server.listen(port, function () {
  process.stdout.write('listening on port ' + port + '\n');
});
