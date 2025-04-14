pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS' // Use the NodeJS installation configured in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
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
            
            // Archive test results
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}