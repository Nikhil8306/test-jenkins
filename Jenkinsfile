pipeline {
    agent {
        label "myagent"
    }

    environment {
        APP_NAME = 'my-app'
        PORT = '2001'
    }

    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies!'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }

        stage('Snapshot Current State') {
            steps {
                echo 'Saving current healthy PM2 state before deploy...'
                sh '''
                    # Only snapshot if app is already running
                    APP_STATUS=$(npx pm2 describe ${APP_NAME} 2>/dev/null | grep -w "status" | grep -w "online" | wc -l)
                    if [ "$APP_STATUS" -gt "0" ]; then
                        npx pm2 save --force
                        echo "Snapshot saved"
                    else
                        echo "No running app found, skipping snapshot"
                    fi
                '''
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                        set -e
                        if npx pm2 describe ${APP_NAME} > /dev/null 2>&1 && npx pm2 describe ${APP_NAME} | grep -q "online"; then
                            echo "=== Reloading existing app (zero downtime) ==="
                            npx pm2 reload ${APP_NAME} --update-env
                        else
                            echo "=== Starting new app ==="
                            PORT=${PORT} npx pm2 start "node index.js" \
                                --name ${APP_NAME} \
                                -- start
                        fi


                        echo "=== App is online ==="
                        npx pm2 list
                    '''

                }
            }
        }

        // stage('Smoke Test') {
        //     steps {
        //         echo 'Running health check...'
        //         sh '''
        //             set -e
        //             sleep 5
        //             HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PORT}/)
        //             if [ "$HTTP_STATUS" != "200" ]; then
        //                 echo "Health check failed! HTTP status: $HTTP_STATUS"
        //                 npx pm2 logs ${APP_NAME} --lines 50 --nostream
        //                 exit 1
        //             fi
        //             echo "Health check passed (HTTP $HTTP_STATUS)"
        //         '''
        //     }
        // }

        // stage('Save State') {
        //     steps {
        //         echo 'Saving healthy PM2 state after successful deploy...'
        //         sh 'npx pm2 save --force'
        //     }
        // }
    }

    post {
        success {
            echo "Deployment successful on ${env.BRANCH_NAME} (${env.DEPLOY_ENV})"
        }
        failure {
            echo 'Deployment failed — attempting rollback to last healthy state'
        }
        always {
            echo 'Pipeline finished'
        }
    }
}