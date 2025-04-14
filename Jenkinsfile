pipeline {
    agent any
    
    // Remove the tools section since NodeJS isn't available
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                // Use nvm or install Node.js directly if needed
                sh '''
                    # Check if Node.js is available
                    node --version || {
                        echo "Node.js not found, attempting to install"
                        curl -sL https://deb.nodesource.com/setup_18.x | bash -
                        apt-get install -y nodejs || {
                            echo "Couldn't install Node.js with apt, trying with curl"
                            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                            export NVM_DIR="$HOME/.nvm"
                            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                            nvm install 18
                            nvm use 18
                        }
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
            
            // Archive test results
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}