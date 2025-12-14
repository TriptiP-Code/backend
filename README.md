# Backend Service – Node.js + PostgreSQL

This repository contains the **backend service** used in the DevOps assignment project. The backend is a **Node.js application** that connects to a **PostgreSQL database (AWS RDS)** and is deployed on **EC2 using Docker**, behind an **Application Load Balancer (ALB)**.

The application logic is simple;and the focus of this project is on **DevOps practices** such as infrastructure provisioning, CI/CD automation, monitoring, logging, and best practices.

## 🧱 Architecture Overview

* **Backend**: Node.js application (Dockerized)
* **Database**: AWS RDS – PostgreSQL
* **Compute**: EC2 (Amazon Linux)
* **Networking**: VPC with public/private subnets
* **Traffic**: Application Load Balancer (ALB)
* **CI/CD**: GitHub Actions
* **Monitoring**: AWS CloudWatch

## 📂 Project Structure

```
backend/
├── Dockerfile
├── package.json
├── package-lock.json
├── app.js
├── node_modules
├── .github/workflows
└── README.md
```

## ⚙️ Environment Variables

The backend uses environment variables for configuration. These are injected at runtime 
| Secret          | Value / Description                                       |
| --------------- | --------------------------------------------------------- |
| DOCKER_USERNAME | Docker Hub username used to push images                   |
| DOCKER_PASSWORD | Docker Hub access token (recommended instead of password) |
| EC2_HOST        | EC2 public IP or DNS used for SSH deployment              |
| EC2_USER        | ec2-user (default Amazon Linux user)                      |
| EC2_KEY         | PEM private key content used by GitHub Actions            |
| DB_HOST         | RDS PostgreSQL endpoint                                   |
| DB_USER         | Database username                                         |
| DB_PASSWORD     | Database password (stored securely as secret)             |
| DB_NAME         | PostgreSQL database name                                  |

## 🐳 Docker Setup
A Dockerfile is written , installing dependencies and requirments and runs application on port

## 🚀 Deployment on EC2 (Current Approach)

1. **Docker image is built and pushed to Docker Hub using GitHub Actions**
2. GitHub Actions connects to EC2 via SSH
3. On EC2:

   * Docker pulls the latest image from Docker Hub
   * Existing container is stopped and removed
   * New container is started with updated image
4. Application is exposed via **ALB DNS**


## 🔄 CI/CD Pipeline (GitHub Actions)

The backend CI/CD pipeline performs:

### On Pull Request

* Install dependencies
* Run unit tests
* Validate code

### On Merge to `main`

* Build Docker image
* Scan dependencies (basic security checks)
* Push image to Docker Hub
* SSH into EC2
* Pull latest image
* Restart backend container

## 📊 Monitoring & Logging

### Metrics (CloudWatch)

* EC2 CPU utilization
* ALB RequestCount
* ALB Target response metrics

### Logs

* Application logs (via Docker logs)
* EC2 system logs
* Centralized CloudWatch Log Groups

---

## 🔐 Security Considerations

* No secrets are hardcoded in the codebase
* Sensitive variables are injected via:

  * GitHub Secrets
* RDS is deployed in **private subnets**
* EC2 access restricted using **Security Groups**

## 🛠️ Future Improvements

* Use **AWS Secrets Manager** for DB credentials
* Replace SSH-based deployment with:

  * Auto Scaling Groups
  * User Data bootstrapping
* Add structured application logging
* Enable automated RDS backups and snapshots


## ✅ Purpose of This Backend

This backend exists to **demonstrate DevOps capabilities**, not complex business logic. It showcases:

* Infrastructure as Code (Terraform)
* CI/CD automation
* Dockerized deployments
* Cloud-native monitoring

## 👩‍💻 Author

**Tripti Pandey**
DevOps Engineer
