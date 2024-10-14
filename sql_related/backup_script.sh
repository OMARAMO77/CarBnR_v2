#!/bin/bash

# Replace these variables with your actual database credentials
DB_NAME="carbnr_dev_db"
BACKUP_DIR="/my_private_repo"

# Create a timestamp for the backup file
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.sql"

# Perform the database backup
mysqldump -u root $DB_NAME > $BACKUP_FILE

# Optionally, compress the backup file
gzip $BACKUP_FILE
