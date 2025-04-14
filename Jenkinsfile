pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                // Simpler Node.js check
                sh '''
                    # Check if Node.js is available
                    node --version || {
                        echo "Node.js not found, installing"
                        curl -sL https://deb.nodesource.com/setup_18.x | bash -
                        apt-get install -y nodejs
                    }
                    node --version
                    npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run BrowserStack Tests') {
            environment {
                BROWSERSTACK_USERNAME = credentials('BROWSERSTACK_USERNAME')
                BROWSERSTACK_ACCESS_KEY = credentials('BROWSERSTACK_ACCESS_KEY')
                BSTACK_USER = credentials('BSTACK_USER')
                BSTACK_PASS = credentials('BSTACK_PASS')
            }
            steps {
                sh 'npm run wdio'
            }
        }
    }
    
    post {
        always {
            junit '**/wdio-*-reporter.log'
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}