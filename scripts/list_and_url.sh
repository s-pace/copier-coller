#!/bin/bash

BUCKET_NAME="printjam-stls"

# List files and generate pre-signed URLs
aws s3 ls s3://$BUCKET_NAME --recursive | awk '{print $4}' | while read -r file; do
    if [[ ! -z "$file" ]]; then
        presigned_url=$(aws s3 presign s3://$BUCKET_NAME/$file)
        echo "$presigned_url",
        echo ">>$file",
    fi
done
