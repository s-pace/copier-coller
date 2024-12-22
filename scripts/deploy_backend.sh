#!/bin/bash

# Navigate to the backend directory
cd backend || exit

# Build the Docker image
echo "Building Docker image..."
docker build -t print-jam:latest . --platform linux/amd64 || exit

# Tag the Docker image for GCR
echo "Tagging Docker image for GCR..."
docker tag print-jam gcr.io/print-jam-map/print-jam:latest || exit

# Push the Docker image to GCR
echo "Pushing Docker image to GCR..."
docker push gcr.io/print-jam-map/print-jam:latest || exit

# Deploy to Google Cloud Run
echo "Deploying to Google Cloud Run..."
gcloud run deploy print-jam-backend \
    --image gcr.io/print-jam-map/print-jam \
    --region europe-west1 \
    --vpc-connector vpc-connector-print-jam \
    --platform managed \
    --service-account sa-print-jam-backend@print-jam-map.iam.gserviceaccount.com \
    --update-secrets MONGODB_URI=mongodb-uri:latest,MARKETING_API_KEY=marketing_api_key:latest,aws_access_key_id=aws_access_key_id:latest,FIREBASE_CREDENTIALS=firebase_credentials:latest,aws_secret_access_key=aws_secret_access_key:latest,aws_region=aws_region:latest,aws_bucket_name=aws_bucket_name:latest,ALGOLIA_API_KEY=algolia_api_key:latest,ALGOLIA_APP_ID=algolia_app_id:latest \
    --set-env-vars CORS_ORIGINS='*' \
    --vpc-egress=all-traffic || exit

echo "Deployment completed successfully."
