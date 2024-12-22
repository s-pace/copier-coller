#!/bin/bash

BUCKET="printjam-stls"
FILE_PATTERN="masque_boucle\.stl"

if aws s3api list-objects --bucket $BUCKET --query 'Contents[].Key' --output text | grep -i "$FILE_PATTERN" &>/dev/null; then
    echo "File exists in S3"
    FOUND_FILE=$(aws s3api list-objects --bucket $BUCKET --query 'Contents[].Key' --output text | grep -i "$FILE_PATTERN")
    echo "Found: $FOUND_FILE"
    exit 0
else
    echo "File does not exist in S3"
    exit 1
fi 