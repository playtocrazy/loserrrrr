#!/bin/bash
chmod -R 755 /home/ubuntu/project/loserrrrr/
chown -R ubuntu:ubuntu /home/ubuntu/project/loserrrrr/
cd /home/ubuntu/project/loserrrrr/
#aws s3 cp public/ s3://loserrrrr-static --recursive