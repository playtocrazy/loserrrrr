#!/bin/bash
cd /home/ubuntu/project/loserrrrr/
yarn install
aws s3 cp public/ s3://loserrrrr-static --recursive