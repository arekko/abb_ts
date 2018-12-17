#! /bin/bash

# yarn run build:server
sudo docker build -t arekko/abb:latest .
sudo docker push arekko/abb:latest
ssh -o "IdentitiesOnly yes" -i ~/.ssh/id_rsa_digital_ocean  root@68.183.217.233 "docker pull arekko/abb:latest && docker tag arekko/abb:latest dokku/abb:latest && dokku tags:deploy abb latest"

