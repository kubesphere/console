export const TEMPLATE_CONFIG = {
  ci: `pipeline {
        agent {
            node {
            label 'base'
            }
        }
        environment {
            DOCKER_CREDENTIAL_ID = 'dockerhub'
            KUBECONFIG_CREDENTIAL_ID = 'kubeconfig'
            REGISTRY = 'docker.io'
            DOCKERHUB_NAMESPACE = 'shaowenchen'
            APP_NAME = 'devops-python-sample'
            SONAR_CREDENTIAL_ID = 'sonar-token'
        }
        parameters {
            string(name: 'BRANCH_NAME', defaultValue: 'master', description: '')
        }

        stages {
            stage('clone code') {
            steps {
                container('base') {
                checkout([$class: 'GitSCM', branches: [[name: '*/$BRANCH_NAME']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/kubesphere/devops-python-sample.git']]])
                }
            }
            }

            stage('build & push') {
            steps {
                container('base') {
                withCredentials([usernamePassword(credentialsId : "$DOCKER_CREDENTIAL_ID" ,passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,)]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:$BUILD_NUMBER .'
                    sh 'docker push $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:$BUILD_NUMBER'
                }

                }

            }
            }
        }
    }`,
  cicd: `pipeline {
        agent {
          node {
            label 'maven'
          }
        }

          parameters {
              string(name:'TAG_NAME',defaultValue: '',description:'')
          }

          environment {
              DOCKER_CREDENTIAL_ID = 'dockerhub-id'
              GITHUB_CREDENTIAL_ID = 'github-id'
              KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
              REGISTRY = 'docker.io'
              DOCKERHUB_NAMESPACE = 'docker_username'
              GITHUB_ACCOUNT = 'kubesphere'
              APP_NAME = 'devops-java-sample'
          }

          stages {
              stage('clone code') {
                steps {
                  container('base') {
                    checkout([$class: 'GitSCM', branches: [[name: '*/$BRANCH_NAME']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/kubesphere/devops-python-sample.git']]])
                  }
                }
              }

              stage ('unit test') {
                  steps {
                      container ('maven') {
                          sh 'mvn clean -o -gs \`pwd\`/configuration/settings.xml test'
                      }
                  }
              }

              stage ('build & push') {
                  steps {
                      container ('maven') {
                          sh 'mvn -o -Dmaven.test.skip=true -gs \`pwd\`/configuration/settings.xml clean package'
                          sh 'docker build -f Dockerfile-online -t $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER .'
                          withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKER_CREDENTIAL_ID" ,)]) {
                              sh 'echo "$DOCKER_PASSWORD" | docker login $REGISTRY -u "$DOCKER_USERNAME" --password-stdin'
                              sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER'
                          }
                      }
                  }
              }

              stage('push latest'){
                 when{
                   branch 'master'
                 }
                 steps{
                      container ('maven') {
                        sh 'docker tag  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:SNAPSHOT-$BRANCH_NAME-$BUILD_NUMBER $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
                        sh 'docker push  $REGISTRY/$DOCKERHUB_NAMESPACE/$APP_NAME:latest '
                      }
                 }
              }

              stage('deploy to dev') {
                steps {
                  input(id: 'deploy-to-dev', message: 'deploy to dev?')
                  kubernetesDeploy(configs: 'deploy/dev-ol/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
                }
              }
              stage('deploy to production') {
                steps {
                  input(id: 'deploy-to-production', message: 'deploy to production?')
                  kubernetesDeploy(configs: 'deploy/prod-ol/**', enableConfigSubstitution: true, kubeconfigId: "$KUBECONFIG_CREDENTIAL_ID")
                }
              }
          }
      }`,
}
