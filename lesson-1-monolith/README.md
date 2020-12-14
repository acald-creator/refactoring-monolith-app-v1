# Monolith to Microservices Progress

## Proposal
This is a projec that is meant to show how to migrate a monolith app to microservices. This is built upon the example app called Udagram, which is an image filtering project. The original project is on a different github repository which we will be pulling the built docker images. These steps below show what I have done and what I believe are best practices. The original Udacity project that was provided within Udacity Cloud Developer is slightly outdated, so I'm doing an updated one.

### Task 1 - Create an S3 Bucket to store files (create IAM user)
- Create IAM user (Create a group for the user, Set policies to have the user access the S3 bucket only)
    - Configure the EC2 role for the group where the user reside in
- Configure AWS credentials on local machine
- Setup CORS configuration (xml deprecated, use JSON now)

### Task 2 - Create AWS RDS PostgreSQL database
- Create a PostgreSQL database
    - Set the name of the database as the identifier (this is what you will see as the list of the databases)
    - Set the username and password (or let AWS generate one for you)
    - If you want the database is be accessible publicly, select the option that allows this
    - Make sure that the DB is the different VPN and different Subnet Group (for security purposes and optional)
    - Create a new VPC security (optional) to have the right port(s) open and accessible only to your private IP Address
    - Create a name for the database

### Task 3 - Setup the AWS Secret Manager (optional step)
- Use AWS Secret Manager to store the credentials used for the AWS RDS (relational database service)
    - Prior to creating the database, you should have already created a user, and placed the user in a group and attach a role
        - This user will have access to the S3 bucket where the files are being stored
    - To store the new secret, select enable automatic rotation (optional)
        - You can setup the new Lambda function for a reminder