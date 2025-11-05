pipeline {
    agent any

    environment {}

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
        }

        stage('Test') {
        }

        stage('Start Server') {
            steps {
                echo 'Starting Server!'
                sh 'node index.js' 
            }
        }
    }

    post {
        success {
            echo 'Sucess !'
        }
        failure {
            echo 'Something went wrong'
        }
    }
}
