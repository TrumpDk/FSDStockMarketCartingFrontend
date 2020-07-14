pipeline {
  agent none
  stages {
    stage('Checkout'){
	  agent{ label 'master'}
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '2675br5d-3623-475u-8z1a-di3r4bc4d936', url: 'git@github.com:TrumpDk/FSDStockMarketCartingFrontend.git']]])
      }
    }
    stage('Compile'){
	  agent{ label 'master'}
      steps {
        bat 'npm install'
      }
    }
    stage('Deploy'){
	  agent{ label 'master'}
      steps {
        bat 'ng build --prod'
        sh 'scp -r dist TrumpDk@127.0.0.1:/var/www/temp_deploy/dist/'
      }
    }
  }
  post {
    always {
      sh 'echo '"${env.JOB_NAME} [${currentBuild.displayName}] ${currentBuild.currentResult} after ${currentBuild.durationString} (<${currentBuild.absoluteUrl}|Open>)"'
    }
  }
}
