#!/bin/bash
certbot certonly --manual --manual-auth-hook $PRE_HOOK --manual-cleanup-hook $POST_HOOK -d $DOMAIN