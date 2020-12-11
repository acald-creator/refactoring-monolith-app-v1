# Monolith to Microservices Progress

- Create AWS RDS PostgreSQL database
- Create an S3 Bucket to store files
- Setup CORS configuration (xml deprecated, use JSON now)
- Create IAM user (Create a group for the user, Set policies to have the user access the S3 bucket only)
- Configure the EC2 role for the group where the user reside in
- Configure AWS credentials on local machine