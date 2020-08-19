#!/bin/bash

export $(grep -v '^#' .env | xargs)

DUMP_DATE=`date +%Y-%m-%d_%T`

if [ ! -d "./db-mongo" ]; then
    mkdir -p "db-mongo"
fi

docker-compose exec -T mongodb mongodump -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase "admin" --archive --gzip --db diab_db > "db-mongo/dump_$DUMP_DATE.gz"