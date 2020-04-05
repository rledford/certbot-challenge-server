# certbot-challenge-server

NodeJS server for handling certbot well-known challenges.

## Usage

The following environment variables must be set:

| Env    | Type    | Description                                                                                                                                                                                                                                                                                                              |
| ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `PORT` | Integer | The port this server will listen on.                                                                                                                                                                                                                                                                                     |
| `DATA` | String  | The data string Certbot issues and requires to be served from a file at the _/.well-known/acme-challenge_ endpoint. It is not necessary to create any files, just provide the full data string Certbot issued during the setup process. The necessary file is created in the appropriate directory if it does not exist. |

### Linux / MacOS

```bash
git clone https://github.com/rledford/certbot-challenge-server
cd ./certbot-challenge-server
PORT=80 DATA=certbot.data node ./server
```

### Windows CMD

```bash
git clone https://github.com/rledford/certbot-challenge-server
cd .\certbot-challenge-server
set PORT=80
set DATA=certbot.data
node .\server
```

### Windows PowerShell

```powershell
git clone https://github.com/rledford/certbot-challenge-server
cd .\certbot-challenge-server
$env:PORT="80"
$env:DATA="certbot.data"
node .\server
```

### Verify

The following `DATA` is an example of what Certbot will require to complete the challenge.

```bash
PORT=8000 DATA=TS_oZ2-ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E.1DzOo_voCOsrpddP_2kpoek2opeko2pke-UAPb21sW1c node.js
```

Going to http://localhost:8000/.well-known/acme-challenge/TS_oZ2-ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E will return:

_TS_oZ2-ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E.1DzOo_voCOsrpddP_2kpoek2opeko2pke-UAPb21sW1c_
