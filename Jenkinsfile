pipeline {
    agent { label 'hola-agent' }
    
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
                
                echo "DONE"
                
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
