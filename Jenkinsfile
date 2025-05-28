pipeline {
  /* ❶ 빌드 컨테이너 */
  agent any;

  /* ❷ 공통 환경 변수 */
  environment {
    AWS_DEFAULT_REGION = 'ap-northeast-2'
    S3_BUCKET          = 'monitory-frontend'
    BUILD_DIR          = 'dist'           // vite 기본 출력 폴더
    /* GitHub Checks용 건별 이름 */
    GH_CHECK_NAME      = "FE Build Test"
    CF_DISTRIBUTION_ID = 'EAYJZWWL9AWSC'
  }

  stages {

    stage('Checkout & Environment Setup') {
      steps { 
        checkout scm
        script {
          def rawUrl = sh(script: "git config --get remote.origin.url",
                        returnStdout: true).trim()
          env.REPO_URL = rawUrl.replaceAll(/\.git$/, '')
          env.COMMIT_MSG = sh(script: "git log -1 --pretty=format:'%s'",returnStdout: true).trim()
        }
      }
    }

    stage('Build') {
      when { not { changeRequest() } }
      steps {
        sh 'npm ci --no-audit --loglevel=error'

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
          slackSend channel: env.SLACK_CHANNEL,
                    tokenCredentialId: env.SLACK_CRED_ID,
                    color: '#ff0000',
                    message: """:x: *FE Build Test 실패*
          파이프라인: <${env.BUILD_URL}|열기>
          커밋: `${env.GIT_COMMIT}` – `${env.COMMIT_MSG}`
          (<${env.REPO_URL}/commit/${env.GIT_COMMIT}|커밋 보기>)
          """
        }
      }
    }

    stage('Deploy to S3 (develop only)') {
      when {
        allOf {
          anyOf {
            branch 'develop'
            branch 'main'
          }
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
        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding',
                        credentialsId: 'jenkins-access']]) {
          sh """
echo '>>> Invalidate CloudFront distribution: ${CF_DISTRIBUTION_ID}'
aws cloudfront create-invalidation --distribution-id ${CF_DISTRIBUTION_ID} --paths '/*'
"""
        }
      }
      post {
        success {
          slackSend channel: env.SLACK_CHANNEL,
                    tokenCredentialId: env.SLACK_CRED_ID,
                    color: '#36a64f',
                    message: """:white_check_mark: *FE CI/CD 성공*
파이프라인: <${env.BUILD_URL}|열기>
커밋: `${env.GIT_COMMIT}` – `${env.COMMIT_MSG}`
(<${env.REPO_URL}/commit/${env.GIT_COMMIT}|커밋 보기>)
"""
        }
        failure {
          slackSend channel: env.SLACK_CHANNEL,
                    tokenCredentialId: env.SLACK_CRED_ID,
                    color: '#ff0000',
                    message: """:x: *FE CI/CD 실패*
파이프라인: <${env.BUILD_URL}|열기>
커밋: `${env.GIT_COMMIT}` – `${env.COMMIT_MSG}`
(<${env.REPO_URL}/commit/${env.GIT_COMMIT}|커밋 보기>)
"""
        }
      }
    }
  }
}
