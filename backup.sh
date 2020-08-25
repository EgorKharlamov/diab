#!/bin/bash

export $(grep -v '^#' back-end/.env | xargs)

DUMP_DATE=$(date +%Y-%m-%d_%T)
BACKUP_FOLDER="db-mongo-backups"

# docker-compose exec -T mongodb mongorestore --archive --gzip < dump.gz

function createFolder() {
    if [ ! -d "./$BACKUP_FOLDER" ]; then
        mkdir -p "$BACKUP_FOLDER"
    fi
}

function selectFile() {
    prompt="Select dump to restore:"
    options=($(find ./$BACKUP_FOLDER -type f -print0 | xargs -0))

    PS3="$prompt "
    select opt in "${options[@]}" "Quit"; do
        if ((REPLY == 1 + ${#options[@]})); then
            exit

        elif ((REPLY > 0 && REPLY <= ${#options[@]})); then
            FILE_NAME=$(echo $opt | cut -f3 -d/)

            # echo "You picked $FILE_NAME which is file $REPLY"
            break

        else
            echo "Invalid option. Try another one."
        fi
    done

}

function backup() {
    createFolder

    BACKUP_NAME="dump_$DUMP_DATE"
    if [ -n "$1" ]; then
        BACKUP_NAME=$1
    fi
    docker-compose exec -T mongodb mongodump -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase "admin" --archive --gzip --db "$DB_NAME" >"$BACKUP_FOLDER/$BACKUP_NAME.gz"
}

function restore() {
    DUMP_FILE="$1.gz"
    if [ ! -n "$1" ]; then
        echo "restore without name"
        selectFile
        DUMP_FILE=$FILE_NAME
    fi
    docker-compose exec -T mongodb mongorestore -u "$DB_USER" -p "$DB_PASS" --authenticationDatabase "admin" --archive --gzip <"./$BACKUP_FOLDER/$DUMP_FILE"
}

function main() {
    case "$1" in
    -h | --help)
        echo "backup:"
        echo "        -b     - backup with default name"
        echo "        -b BAR - backup with BAR name [e.g. backup.sh -b BAR -> dump in BAR.gz]"

        echo "restore:"
        echo "        -r     - restore with choosing dump file name"
        echo "        -r BAR - restore with BAR name [e.g. backup.sh -r BAR -> restore BAR.gz]"
        exit 0
        ;;
    -b | --backup)
        backup "$2"
        exit 0
        ;;
    -r | --restore)
        restore "$2"
        exit 0
        ;;
    esac
}

main "$1" "$2"
