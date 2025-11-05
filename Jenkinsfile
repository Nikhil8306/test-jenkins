pipeline {
    agent any
    
    environment {
        PATH = "/home/admin/.nvm/versions/node/v24.11.0/bin"
    }

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
        
        stage('Start Server') {
            steps {
                echo 'Starting Server!'
                sh '''
                    pkill -f "node index.js" || true
                    nohup node index.js > server.log 2>&1 &
                    sleep 3
                    echo "Server started"
                '''
            }
        }
    }
    
    post {
        success {
            echo 'Success!'
        }
        failure {
            echo 'Something went wrong'
        }
    }
}
