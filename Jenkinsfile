pipeline {
  /* ❶ 빌드 컨테이너 */
  agent any;

  /* ❷ 공통 환경 변수 */
  environment {
    AWS_DEFAULT_REGION = 'ap-northeast-2'
    S3_BUCKET          = 'monitory-frontend'
    BUILD_DIR          = 'dist'           // vite 기본 출력 폴더
    /* GitHub Checks용 건별 이름 */
    GH_CHECK_NAME      = "FE Build"
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install') {
      steps { sh 'npm ci --no-audit --loglevel=error' }
    }

    stage('Build') {
      steps {
        /* 상태 = IN_PROGRESS */
        publishChecks name: env.GH_CHECK_NAME,
                      status: 'IN_PROGRESS',
                      detailsURL: env.BUILD_URL
        /* 실제 빌드 */
        sh 'npm run build'
      }
      post {
        success {
          /* 상태 = SUCCESS */
          publishChecks name: env.GH_CHECK_NAME,
                        conclusion: 'SUCCESS',
                        detailsURL: env.BUILD_URL
        }
        failure {
          /* 상태 = FAILURE + 로그 링크 */
          publishChecks name: env.GH_CHECK_NAME,
                        conclusion: 'FAILURE',
                        detailsURL: "${env.BUILD_URL}console"
        }
      }
    }

    stage('Deploy to S3 (develop only)') {
      when {
        allOf {
          branch 'develop'
          not { changeRequest() }   // PR 빌드는 건너뜀
        }
      }
      steps {
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                          credentialsId: 'jenkins-access']]) {
          sh '''
            aws s3 sync ${BUILD_DIR}/ s3://${S3_BUCKET}/
          '''
        }
      }
    }
  }

  /* ❸ 파이프라인 전체 후처리 */
  post {
    failure {
      echo '❌ FE build 실패 - GitHub Checks에서 확인하세요.'
    }
  }
}
