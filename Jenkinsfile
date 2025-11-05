pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'git@github.com:Nikhil8306/test-jenkins.git',
                    credentialsId: '391c318d-fd4d-4087-999e-4f0de78b6fda' 
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies!'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Build Stage'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Test stage'
                // sh 'npm test'
            }
        }
        
        stage('Deploy with PM2') {
            steps {
                echo 'Deploying application with PM2...'
                sh '''
                    npx pm2 stop test-jenkins || true
                    npx pm2 delete test-jenkins || true
                    
                    npx pm2 start index.js --name test-jenkins
                    
                    npx pm2 save
                    
                    npx pm2 list
                    npx pm2 info test-jenkins
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Success! Application deployed with PM2'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}