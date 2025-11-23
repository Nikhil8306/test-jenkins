pipeline {
    agent { label 'conv-ai-agent' }
    
    stages {
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
            }
        }
        
        stage('Deploy with PM2') {
            steps {
                withCredentials([
                    string(credentialsId:'TESTKEY', variable:'TESTKEY')
                ]){
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
