/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */
module.exports = {
  // Edit Information
  CODE_REPOSITORY: '코드 저장소',
  // Attributes
  TASK_STATUS: '작업 상태',
  NOT_RUNNING: '실행중이 아님',
  QUEUED: '대기열에 추가됨',
  ABORTED: '중단됨',
  UNSTABLE: '불안정함',
  SKIPPED: '무시됨',
  NOT_BUILT: '빌드되지 않음',
  SYNC_STATUS: '동기화 상태',
  DEVOPS_PROJECT: '데브옵스 프로젝트',
  // More > Edit Settings
  // More > Scan Repository
  SCAN_REPO_SUCCESSFUL: '저장소 스캔이 성공적으로 트리거되었습니다.',
  // More > View Scan Logs
  VIEW_SCAN_LOGS: '스캔 로그 보기',
  STARTED_BY_NAME: '{name}에 의하여 시작 됨',
  REPOSITORY_SCAN_LOGS: '저장소 스캔 로그',
  RESCAN: '다시 스캔',
  LOGS_OBTAINED_SUCCESSFULLY: '로그를 가져왔습니다.',
  // Health Status
  HEALTH_STATUS_SCAP: '건강 상태',
  // Task Status
  PIPELINE_QUEUED_TITLE: '초기화가 곧 완료 됨',
  INITIALIZING_PIPELINE: '파이프라인 초기화 중',
  PIPELINE_PREPARE_DESC: '환경을 준비하는 중...',
  INITIALIZING_PIPELINE_DESC: '파이프라인 초기화가 완료될 때까지 기다려 주십시오.',
  TASK_FAILED_NOT_OPERATIONAL: '이 단계가 실패하여 더 이상 작동하지 않습니다.',
  NO_PIPELINE_CONFIG_FILE_TIP: '파이프라인 구성 파일을 찾을 수 없습니다.',
  // Task Status > Edit Pipeline
  EDIT_PIPELINE: '파이프라인 편집',
  JENKINS_UNAVAILABLE: 'Jenkins가 준비되지 않았습니다.',
  AGENT_TYPE_DESC: `에이전트 섹션은 해당 에이전트 섹션이 정의 된 위치에 따라 전체 파이프라인 또는 특정 Stage가 Jenkins 환경에서 수행될 위치를 지정합니다. 이 섹션은 파이프라인 블록의 맨 위에 정의되어야 하지만 stage level 사용은 선택 사항입니다`,
  NOT_VALID_REPO: '코드 저장소가 유효하지 않아 생성할 수 없습니다.',
  CREATE_PIPELINE_DESC: '파이프라인을 사용한 빌드, 테스트 및 배포',
  CI: '지속 통합 (CI)',
  CI_DESC: '지속적 통합(CI)은 소스 코드가 변경된 후 자동으로 감지, 풀링, 빌딩 및 (대부분의 경우) 유닛 테스트를 수행하는 과정입니다',
  CICD: '지속적인 통합과 배포 (CI/CD)',
  CICD_DESC: '지속적 통합(CD)은 지속적 파이프라인을 통하여 배포된 버전을 엔드유저에게 자동으로 제공하는 개념입니다. 사용자의 설치 방식에 따라 클라우드 환경에서 자동 배포, 앱 업그레이드, 웹 사이트 업데이트 또는 가용한 버전 목록 업데이트 등이 이에 해당 됩니다.',
  CUSTOM_PIPELIEN: '커스텀 파이프라인',
  CUSTOM_PIPELIEN_DESC: '필요한 태스크를 선택하여 파이프라인 내용을 커스터마이즈할 수 있습니다.',
  CC: 'CC',
  CREDENTIAL_NAME: '자격 증명 이름',
  REMOTE_REPOSITORY_URL: '원격 저장소 URL',
  SCM: 'SCM',
  INPUT_MESSAGE_DESC: '파이프라인의 작동 상태에 이 메시지를 표시합니다.',
  KUBERNETES_DEPLOY_DESC: `Kubernetes 클러스터에 리소스를 배포합니다.
    지속적인 통합 또는 지속적인 배포 환경에서,
    정기적으로 업데이트해야 하는 리소스가 있을 시 본 배포 단계에 배치해야 합니다.
    따라서 이 단계는 이러한 리소스 배포하는데 주로 사용됩니다.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
  <label>이 단계에는 다음과 같은 주요 기능이 있습니다:</label>
  <li>kubectl을 필요로하지 않는 환경에서의 배포</li>
  <li>Jenkins 파일의 변수 대체 및 이를 이용한 동적 배포 가능</li>
  <li>개인 이미지 저장소에서 도커 이미지 풀링 지원</li>
  <label>현재 이 단계는 다음 리소스를 지원합니다: </label>
  <br />
  <li> Configuration </li>
  <li>Key</li>
  <li>Deploy</li>
  <li>Dave Process Set</li>
  <li>App Routing</li>
  <li>Namespace</li>
  <li>Task</li>
  <li>Service</li>
  <li>Replica Set</li>
  <li>
  Replication
  Controller (롤링 업데이트는 지원되지 않습니다. 롤링 업데이트를 사용하려면 deployment를 사용하십시오.)
  </li>`,
  STAGE: '스테이지',
  KUBERNETES_DEPLOY_DEPRECATED_TIP: '이 단계는 이후 버전에서는 더 이상 사용되지 않으며 다른 대안책을 고려하는 것을 권장합니다.',
  ORIGINAL_IMAGE_ADDRESS: '원본 이미지 주소',
  NEW_IMAGE_ADDRESS: '새로운 이미지 주소',
  NEW_IMAGE_TAG: '새로운 이미지 태그',
  CD_STEP_DESC: '지속적 배포를 사용하여 이미지 정보를 업데이트합니다.',
  UPDATE_CD_TITLE: '지속적인 업데이트 배포',
  // Task Status > Edit Jenkinsfile
  EDIT_JENKINSFILE: 'Jenkinsfile 편집',
  CLOSE_JENKINSFILE_EDITOR_TIP: 'Jenkinsfile 편집기를 닫으시겠습니까?',
  // Task Status > View Logs
  PIPELINE_RUN_LOGS: '파이프라인 실행 로그',
  VIEW_LOGS: '로그 보기',
  DURATION_VALUE: '기간: {value}',
  DOWNLOAD_LOGS: '다운로드 로그',
  // Task Status > View Logs > View Logs
  START_REAL_TIME_LOG: '실시간 로그 사용',
  STOP_REAL_TIME_LOG: '실시간 로그 사용 안 함',
  // Run Records
  RUN_RECORDS: '실행 기록',
  RUN: '실행',
  ACTIVITY_EMPTY_TIP: '파이프라인이 실행되지 않았습니다.',
  COMMIT: '커밋',
  LAST_MESSAGE: '마지막 메시지',
  RUN_ID: '실행 ID',
  STOP_PIPELINE_SUCCESSFUL: '파이프라인이 성공적으로 중지되었습니다.',
  INVALID_JENKINSFILE_TIP: '본 Jenkinsfile은 표준 선언형 Jenkinsfile이 아니므로 그래픽 표시를 사용할 수 없습니다.',
  PAUSED: '일시정지',
  // Run Records > Run
  SET_PARAMETERS: '매개변수 설정',
  PARAMS_DESC: `다음 매개변수는 Jenkinsfile의 매개변수 섹션에서 생성된 필드 혹은 파이프라인 설정에 의하여 생성됩니다.`,
  PIPELINE_RUN_START_SI: '파이프라인 실행을 시작합니다...',
  PIPELINE_RUN_START_PL: '파이프라인 실행을 시작합니다...',
  // Run Records > Run Record Details > Details
  // Run Records > Run Record Details > Task Status
  BREAK: 'Break',
  PROCEED: '계속',
  WAITING_FOR_INPUT: '입력 대기 중...',
  CANCELLED_IN_REVIEW: '검토 중 취소됨',
  STEPS_COMPLETE_TOTAL: '단계: {complete}/{total}',
  // Run Records > Run Record Details > Commits
  COMMIT_PL: '커밋',
  AUTHOR: '작성자',
  NO_COMMIT_FOUND: '커밋을 찾을 수 없습니다.',
  // Run Records > Run Record Details > Artifacts
  ARTIFACT_PL: '결과물',
  NO_ARTIFACT_FOUND_TIP: '결과물을 찾을 수 없습니다.',
  SIZE: '크기',
  // Run Records > Run > Set Parameters
  // Branches
  BRANCH_SI: '브랜치',
  BRANCH_PL: '브랜치',
  SCAN_REPOSITORY: '저장소 스캔',
  PIPELINE: '파이프라인',
  NO_BRANCHES_FOUND: '브랜치가 존재하지 않습니다.',
  // Branches > Code Check
  CODE_CHECK: '코드 검사',
  BUG_PL: '버그',
  VULNERABILITY_PL: '취약점',
  CODE_SMELL_PL: 'Code Smells',
  CODE_LINE_COUNT: '코드 라인수',
  COVERAGE: '커버리지',
  TEST_RESULTS: '결과',
  ISSUE_PL: '이슈',
  CRITICAL: '심각',
  MAJOR: '메이저',
  MINOR: '마이너',
  DISPLAY_ALL: '모두 표시',
  DISPLAY_ONLY_LAST_TEN: '마지막 10개의 이슈만 표시합니다.',
  LINE_VALUE: '라인: {value}',
  PASSED: '통과됨',
  // Pull Requests
  PULL_REQUEST_PL: 'Pull Requests',
  FAILED_CHECK_SCRIPT_COMPILE: 'Failed to check script compiling. If you want to skip the step, click Continue.',
  // detail page // Create Pipeline modal // add step modal 
  IMPORT_FROM_CODE_REPO: 'Import From Code Repository',
  //Create pipeline modal -> Custom Pipeline
  General: '일반',
  Container: '컨테이너',
  Review: '리뷰',
  URL: 'URL',
  'Credential Name': '자격 증명 이름',
  Branch: '브랜치',
  'SVN URL': 'SVN URL',
  'Credential Name': '자격 증명 이름',
  'The message to print': '표시 할 메시지',
  'Shell command line': '쉘 명령어',
  //   Recipient: 'Recipient',
  //   CC: 'CC',
  //   Subject: 'Subject',
  Body: 'Body',
  'Credential Name': '자격 증명 이름',
  //   'Username Variable': 'Username Variable',
  //   'Password Variable': 'Password Variable',
  Variable: '변수',
  'KeyFile Variable': 'KeyFile 변수',
  'Passphrase Variable': 'Passphrase 변수',
  'Artifacts Location': '결과물 위치',
  Time: '시간',
  Unit: '단위',
  //   'Timeout after no activity in logs for this block':
  // 'Timeout after no activity in logs for this block',
  'Groovy script': 'Groovy 스크립트',
  'Target Pipeline Name': '파이프라인 이름',
  'Quiet Period': '방해 금지 시간',
  'Wait For Completion': '완료 대기',
  'Propagate Errors': '오류 전파',
  'Error Message': '오류 메시지',
  Time: '시간',
  Unit: '단위',
  'Test Results Location': '테스트 결과 위치',
  'Allow Empty Results': '빈 결과 허용',
  'Keep Long Output': '긴 출력 유지',
  'Skip Publishing Checks': '퍼블리싱 검사 건너뛰기',
  'Retry Count': '재시도 횟수',
  Message: '메시지',
  Submitter: '제출자',
  'Config Name': '설정 항목',
  'AbortPipeline if quality gate status is not green': '품질 게이트 상태가 녹색이 아닌 경우 파이프라인 중단',
  'Container Name': '컨테이너 이름',
  'Continuous Deployments': '지속적 배포',
  Branch: '브랜치',
  'Original Image Address': '원본 이미지 주소',
  'New Image Address': '새로운 이미지 주소',
  'New Image Tag': '새로운 이미지 태그',
  Credential: '자격 증명',
  // detail page -> pipeline configuration tab
  PIPELINE_CONFIGURATION: 'Pipeline Configurations',
  Replay: 'Replay',
  BRANCH_DISABLED_NOT_REPLAY: 'The branch has been disabled and cannot be replayed.',
  // detail page // run log // task status
  RUN_LOGS: 'Run Logs',
  VIEW_FULL_LOG: 'View Full Logs',
  // detail page // run log // task status // pipeline log modal
  PIPELINE_LOG: 'Pipeline Logs',
  // detail page // Create Pipeline modal // add step modal
  IMPORT_FROM_CODE_REPO: 'Import From Code Repository',
  // detail page // parameters tab
  NO_BUILD_PARAMETERS: 'Not found build parameters.',
};