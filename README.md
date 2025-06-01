**Getting Started with Memories App**
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------

* This project was created in reference to 
    - Full Stack MERN Project - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 1/2]
        > [https://www.youtube.com/watch?v=ngc9gnGgUdA&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=1]
    - Full Stack MERN Project - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 2/2]
        > [https://www.youtube.com/watch?v=aibtHnbeuio&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=2]
    - Full Stack MERN Project - Implement MERN Comments | React + Redux, Node, Express, MongoDB
        > [https://www.youtube.com/watch?v=46NRrn4xi5Y&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=5]
    - MERN Auth - Login with Email (JWT) + Google OAuth Authentication | React, Node, Express, MongoDB
        > [https://www.youtube.com/watch?v=LKlO8vLvUao&list=RDCMUCmXmlB4-HJytD7wek0Uo97A&index=9]




**Setting up Memories App**
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------

* Dependencies.
    - Node.js
    - Express.js
    - Mongoose
    - DockerDesktop (Enable Kubernetes) 

* Initializing project folders and dependencies.
    * > FrontEnd Client.
        #### `cd client && npx create-react-app .`
        #### `npm i axios moment jwt-decode react-toastify react-redux @reduxjs/toolkit`
        #### `npm i @emotion/react @emotion/styled @mui/system @mui/material @mui/icons-material`
    * > Backend Server.
        #### `cd server && npm init -y`
        #### `npm i colors express cors mongoose dotenv bcryptjs jsonwebtoken express-async-handler`
        #### `npm install -g nodemon`

* Setting up MongoAtlas DB.
   > Navigate to [https://cloud.mongodb.com/] and login.
   > Go to Clusters -> Collections -> Add my own data -> Create Collection.

* Setting up Docker.
    - Login.
        #### `docker login -u ${username}`
    - Docker cleanup commands.
        #### `docker rm -f $(docker ps -aq)`
        #### `docker image prune --all --force`
        #### `docker system prune`
   
* Connecting to Database.
    * > Go to Clusters -> Connect -> MongoDB for VS Code.
    * > Copy uri into var <ATLAS_URI> in .env file with extension [memories?retryWrites=true&w=majority]
    * > In [k8s/secret.yml] need to update the <data.DBPASSWORD> to base-encoded64 <ATLAS_URI>
        #### `echo -n "${WORD}" | base64` 
        - output of that command is the value of the secret.



**Running Memories App locally**
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------

* Debugging.
    > <Shift><Ctrl><J> to open browser console for debugging.
    > #### `npm ls react`
    > #### `npm cache clean --force`
    > #### `npm install -g npm`

* Running project manually.
    > Open two terminals.
    #### `cd server && npm start`
    #### `cd client && npm start`

* Running project Docker.
    - Run project.
        * > On windows machine open DockerDesktop.
        * > navigate to [http://localhost:3050/] in browser after running compose.
            #### `docker-compose -f docker-compose.dev.yml up --detach`
            #### `docker-compose -f docker-compose.dev.yml down`

* Running project K8s.
    - Initiate K8s.
        * > Create repos [mern-memories-client] and [mern-memories-server] in Dockerhub before pushing. 
            images there. Need images in Dockerhub because thats where Kubernetes manifest files pull it from.
        * > Change routes in [./server/src/index.js]
            > `line 22`: take out the "/api"
            > `line 23`: take out the "/api"
        * > Build Images.
            #### `docker build -t ayfantis53/mern-memories-client ./client`
            #### `docker build -t ayfantis53/mern-memories-server ./server`
        * > Push to Dockerhub.
            #### `docker push ayfantis53/mern-memories-client` 
            #### `docker push ayfantis53/mern-memories-server` 
    - Run project.
        - Apply Ingress Controller from Kubernetes.
            #### `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml`
        - Get rid of this validating webhook or our ingress service will not build.
            #### `kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission`
        - Apply our Deployment files.
            #### `kubectl apply -f k8s/`
        > navigate to [127.0.0.1:8080] in browser.

    - Take down project.
        #### `kubectl delete -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.2/deploy/static/provider/cloud/deploy.yaml`
        #### `kubectl delete -f k8s/`




**Running Memories App in Cloud (AWS)**
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------

* ELB Deployment
    - Important steps:
        > Set the security group in AWS to listen on ports 8080-9000
        > Set a bigger EC2 Instance t2-medium
        > Set environmental variables
        > Put EC2 Instances Ip address into MongoAtlas DB whitelist

* EKS Deployment
    - Important names and commands:
        > AWS_EKS_CLUSTER_NAME = eks-cluster
        > aws eks list-clusters --region us-east-2
        > aws eks update-kubeconfig --region us-east-2 --name eks-cluster
        > kubectl get svc




**GoogleAuth**
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------
* React install
    #### `npm i @react-oauth/google@latest`
* Google Setup
    - Login to google cloud [console.google.cloud.com]
        > Click top right honey-comb menu and Create a new project.
        > Go to the project page -> "APIs and Services".
        > Go to credentials -> "+ Create Credentials" -> "Create OAuth client ID".
            > name it `memories-app`
        > Enter in Authorized JavaScript origins. 
            > URIs 1 [https://localhost:3000]
            > URIs 2 [https://localhost:3000]
        > Authorized redirect URIs.
            > URIs 1 [https://localhost:3000]
            > URIs 2 [https://localhost:3000/auth]
        > In OathConsent Screen
            > Add emails to test in react app in "Test Users List".
            > Publish app opens it to all google users.



------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------