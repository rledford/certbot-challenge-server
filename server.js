const path = require('path');
const spawn = require('child_process').spawn;
const express = require('express');
const app = express();
let config;
try {
  config = require('./config.json');
} catch (err) {
  console.log('config.json is missing or invalid');
  process.exit(1);
}
const { domain, renewInterval } = config;

const port = process.env.PORT || 80;
const tokenPath = path.join(
  __dirname,
  'public',
  '.well-known',
  'acme-challeng'
);
const prehook = path.join(__dirname, 'authenticator.sh');
const posthook = path.join(__dirname, 'cleanup.sh');

app.use(express.static(path.join(__dirname, 'public')));
app.listen(parseInt(port), () => {
  console.log('listening on port', port);
});

let renewalInProgress = false;
function execRenewal() {
  if (renewalInProgress) return;
  renewalInProgress = true;
  const shell = spawn('sh', ['./renew.sh'], {
    DOMAIN: domain,
    TOKEN_PATH: tokenPath,
    PRE_HOOK: prehook,
    POST_HOOK: posthook
  });
  process.stdout.pipe(shell.stdout);
  shell.on('close', () => {
    renewalInProgress = false;
  });
}

setInterval(execRenewal, renewInterval);
