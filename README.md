## Getting Started with Memories App

### This project was created in reference to 
- **Full Stack MERN Project** - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 1/2]
    > [https://www.youtube.com/watch?v=ngc9gnGgUdA&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=1]
- **Full Stack MERN Project** - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 2/2]
    > [https://www.youtube.com/watch?v=aibtHnbeuio&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=2]
- **Full Stack MERN Project** - Implement MERN Comments | React + Redux, Node, Express, MongoDB
    > [https://www.youtube.com/watch?v=46NRrn4xi5Y&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=5]
- **MERN Auth** - Login with Email (JWT) + Google OAuth Authentication | React, Node, Express, MongoDB
    > [https://www.youtube.com/watch?v=LKlO8vLvUao&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=9]


-----------------------------------------------------------------------------------------------------------------
## Setting up Memories App

### 1. Dependencies.
- **Node.js**
- **Express.js**
- **Mongoose**
- **DockerDesktop (Enable Kubernetes)** 

### 2. Initializing project folders and dependencies.
#### **FrontEnd Client**
```bash
# Create Frontend Folders
cd client && npx create-react-app .
# Download dependencies
npm i axios moment jwt-decode react-toastify react-redux @reduxjs/toolkit
npm i @emotion/react @emotion/styled @mui/system @mui/material @mui/icons-material
```
#### **Backend Server**
```bash
# Create Backend Folders
cd server && npm init -y
# Download dependencies
npm i colors express cors mongoose dotenv bcryptjs jsonwebtoken express-async-handler
npm install -g nodemon
```

### 3. Setting up MongoAtlas DB.
- Navigate to **[https://cloud.mongodb.com/]** and login.
- Go to **Clusters -> Collections -> Add my own data -> Create Collection**.

### 4. Setting up Docker.
#### Login.
```bash 
docker login -u ${username} 
```
#### Docker cleanup commands.
```bash 
docker rm -f $(docker ps -aq)
docker image prune --all --force
docker system prune
```
   
### 5. Connecting to Database.
- Go to **Clusters -> Connect -> MongoDB** for VS Code.
- Copy uri into var **<ATLAS_URI>** in .env file with extension [memories?retryWrites=true&w=majority]
- In **[k8s/secret.yml]** need to update the **<data.DBPASSWORD>** to base-encoded64 **<ATLAS_URI>**
    ```bash
    # output of this command is the value of the secret. 
    echo -n "${WORD}" | base64
    ``` 

-----------------------------------------------------------------------------------------------------------------
## Running Memories App locally

### 1. Debugging.
- **<Shift + Ctrl + J> to open browser console for debugging.**
    ```bash
    npm ls react
    npm cache clean --force
    npm install -g npm
    ```

### 2. Running project manually.
- **Open two terminals.**
    ```bash
    cd server && npm start
    cd client && npm start
    ```

### 3. Running project Docker.
- **Run project.**
    * On windows machine open DockerDesktop.
    * navigate to **[http://localhost:3050/]** in browser after running compose.
        ```bash
        docker-compose -f docker-compose.dev.yml up --detach
        docker-compose -f docker-compose.dev.yml down
        ```

### 4. Running project K8s.
#### Initiate K8s.
- Create repos **[mern-memories-client]** and **[mern-memories-server]** in Dockerhub before pushing images there. Need images in Dockerhub because thats where Kubernetes manifest files pull it from.
- **Change routes in [./server/src/index.js]**
    * `line 26`: take out the "/api"
    * `line 27`: take out the "/api"
- **Build Images.**
    ```bash
    docker build -t ayfantis53/mern-memories-client ./client
    docker build -t ayfantis53/mern-memories-server ./server
    ```
- **Push to Dockerhub.**
    ```bash
    docker push ayfantis53/mern-memories-client
    docker push ayfantis53/mern-memories-server
    ```
#### Run project.
- **Navigate to [127.0.0.1:80] in browser.**
```bash
# Apply Ingress Controller from Kubernetes.
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml
# Get rid of this validating webhook or our ingress service will not build. 
kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission 
# Apply our Deployment files.
kubectl apply -f k8s/
```

#### Take down project.
```bash
# Take down Ingress
kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml
# Take down local manifests
kubectl delete -f k8s/
```

#### Debug K8 project.
```bash
# Check status of all pods
kubectl get pods
# Get more detail on specific pod
kubectl describe pod ${pod-name}
```

-----------------------------------------------------------------------------------------------------------------
## Running Memories App in Cloud (AWS)
### 1. ELB Deployment
- **Important steps:**
    * Set the security group in AWS to listen on ports 8080-9000
    * Set a bigger EC2 Instance t2-medium
    * Set environmental variables
    * Put EC2 Instances Ip address into MongoAtlas DB whitelist
### 2. EKS Deployment
- **Important names and commands:**
    * AWS_EKS_CLUSTER_NAME = eks-cluster
    * aws eks list-clusters --region us-east-2
    * aws eks update-kubeconfig --region us-east-2 --name eks-cluster
    * kubectl get svc

-----------------------------------------------------------------------------------------------------------------
## GoogleAuth
### 1. React install
```bash 
npm i @react-oauth/google@latest 
```
### 2. Google Setup
- **Login to google cloud [console.google.cloud.com]**
    * Click top right honey-comb menu and Create a new project.
    * Go to the project page -> "APIs and Services".
    * Go to credentials -> "+ Create Credentials" -> "Create OAuth client ID".
        * name it `memories-app`
    * Enter in Authorized JavaScript origins. 
        * URIs 1 [https://localhost:3000]
        * URIs 2 [https://localhost:3000]
    * Authorized redirect URIs.
        * URIs 1 [https://localhost:3000]
        * URIs 2 [https://localhost:3000/auth]
    * In OathConsent Screen
        * Add emails to test in react app in "Test Users List".
        * Publish app opens it to all google users.
