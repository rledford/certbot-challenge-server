# certbot-challenge-server

NodeJS server for handling certbot well-known challenges.

## Usage

The following environment variables must be set:

| Env                  | Type    | Description                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`               | Integer | The port this server will listen on.                                                                                                                                                                                                                                                                                                                              |
| `CERTBOT_VALIDATION` | String  | The data string Certbot issues, or passes into the pre-validation hook, and requires to be served from a file at the _/.well-known/acme-challenge_ endpoint. It is not necessary to create any files, just provide the full data string Certbot issued during the setup process. The necessary file is created in the appropriate directory if it does not exist. |

The provided `authenticator.sh` and `cleanup.sh` are directly from the [Certbot docs](https://certbot.eff.org/docs/using.html?highlight=hook#pre-and-post-validation-hooks) and are intended to be used for automatic renewal. _You will need to modify the script files to be executable `+x` and also edit the scripts to point to the full path of the `.well-known/acme-challenge/` directory in this repo._

### Linux / MacOS

```bash
git clone https://github.com/rledford/certbot-challenge-server
cd ./certbot-challenge-server
PORT=80 CERTBOT_VALIDATION=certbot.data node ./server
```

### Windows CMD

```bash
git clone https://github.com/rledford/certbot-challenge-server
cd .\certbot-challenge-server
set PORT=80
set CERTBOT_VALIDATION=certbot.data
node .\server
```

### Windows PowerShell

```powershell
git clone https://github.com/rledford/certbot-challenge-server
cd .\certbot-challenge-server
$env:PORT="80"
$env:CERTBOT_VALIDATION="certbot.data"
node .\server
```

### Verify

The following `CERTBOT_VALIDATION` is an example of what Certbot will require to complete the challenge.

```bash
PORT=8000 CERTBOT_VALIDATION=TS_oZ2-ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E.1DzOo_voCOsrpddP_2kpoek2opeko2pke-UAPb21sW1c node.js
```

Going to http://localhost:8000/.well-known/acme-challenge/TS_oZ2-ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E will return:

_TS_oZ2-ji23jrio3j2irj3iroj_U51u1o0x7rrDY2E.1DzOo_voCOsrpddP_2kpoek2opeko2pke-UAPb21sW1c_
