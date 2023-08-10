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
  // Banner
  WORKLOAD_DESC: '워크로드는 서비스 요청을 처리하는 데 사용되며 하나 이상의 파드를 포함할 수 있습니다. 로깅 및 모니터링과 같은 시스템 기능도 워크로드에 의해 구현됩니다.',
  // List
  DEPLOYMENT_EMPTY_DESC: '디플로이먼트를 생성하십시오.',
  UPDATING: '업데이트 중',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  NEXT: '다음',
  INVALID_PROJECT: '잘못된 프로젝트입니다.',
  // List > Create > Pod Settings > Replica Scheduling Mode
  REPLICA_SCHEDULING_MODE: '복제본 스케줄링 모드',
  SPECIFY_REPLICAS: '복제본 개수 지정',
  WEIGHTS: '가중치',
  SPECIFY_WEIGHTS: '가중치 지정',
  SPECIFY_WEIGHTS_DESC: '각 클러스터의 총 파드 복제본 수와 가중치를 설정합니다. 파드 복제본은 가중치에 따라 클러스터에 스케줄링 됩니다.',
  SPECIFY_REPLICAS_DESC: '각 클러스터의 파드 복제본 수를 수동으로 설정합니다.',
  REPLICA_LOW_SI: '복제본',
  REPLICA_LOW_PL: '복제본',
  WEIGHT: '가중치',
  TOTAL_REPLICAS: '전체 복제본',
  // List > Create > Pod Settings > Add Container > Container Settings
  COST: '비용',
  ADD_CONTAINER: '컨테이너 추가',
  ADD_CONTAINER_DESC: '컨테이너 설정을 커스터마이즈하여 컨테이너를 생성합니다.',
  CONTAINERS: '컨테이너',
  IMAGE_TIME_SIZE_LAYER: '{time}에 업데이트됨',
  IMAGE_DESC: '개인 이미지 레지스트리를 사용하려면 먼저 이미지 레지스트리 시크릿을 만들어야 합니다. <a href={link} target="_blank">자세히 알아보기 </a>',
  IMAGE_PLACEHOLDER: 'nginx:latest와 같은 이미지 이름 또는 경로',
  IMAGE_EMPTY: '이미지를 설정하십시오.',
  ENTER_POSITIVE_INTEGER_DESC: '자연수를 입력하십시오.',
  TOTAL_REPLICAS_EMPTY_DESC: '모든 클러스터의 총 파드 복제본 수를 입력하십시오.',
  CONTAINER_NAME: '컨테이너 이름',
  CONTAINER_TYPE: '컨테이너 유형',
  USE_DEFAULT_PORTS: '기본 포트 사용',
  USE_IMAGE_DEFAULT_PORTS: 'Use Default Port of Images',
  NO_DEFAULT_PORT: '기본 포트 구성 없음',
  REGISTRY: '레지스트리',
  SET_IMAGE_DESC: '컨테이너에 대한 이미지를 설정합니다.',
  WORKER_CONTAINER: '워커 컨테이너',
  CONTAINER_RESOURCE_LIMIT_TIP: '컨테이너가 적절한 노드로 스케줄링되도록 컨테이너의 리소스 제한 및 요청을 설정합니다.',
  GPU_TYPE: 'GPU 유형',
  GPU_LIMIT: 'GPU 제한',
  NVIDIA_COM_GPU: 'NVIDIA GPU',
  NO_LIMIT: '제한 없음',
  NO_REQUEST: '요청 없음',
  NO_RESOURCE_LIMIT: '리소스 제한 없음',
  IGNORE_AND_RETRY: '무시하고 다시 시도',
  AVAILABLE_QUOTAS: '사용 가능한 할당량',
  // List > Create > Pod Settings > Add Container > Port Settings
  PORT_SETTINGS: '포트 설정',
  ISTIO_PROTOCOL_TIP: '서비스에서 사용하는 프로토콜을 선택하여 애플리케이션 거버넌스 기능을 완전히 활용합니다. 예를 들어 HTTP 서비스에 대해 HTTP를 선택합니다.',
  REQUIRED: '필수',
  // List > Create > Pod Settings > Add Container > Use Local Image First
  IMAGE_PULL_POLICY_ALWAYS: '항상 Pull 이미지',
  IMAGE_PULL_POLICY_NEVER: '로컬 이미지만 사용',
  IMAGE_PULL_POLICY_ALWAYS_DESC: '파드가 생성되거나 업데이트될 때 항상 이미지를 Pulling합니다.',
  IMAGE_PULL_POLICY_IFNOTPRESENT_DESC: '필요한 이미지가 로컬에 없는 경우에만 이미지를 Pull합니다.',
  IMAGE_PULL_POLICY_NEVER_DESC: '로컬 이미지만 사용합니다. 필요한 이미지가 로컬로 존재하지 않으면 컨테이너가 비정상적으로 \b동작할 수 있습니다.',
  IMAGE_PULL_POLICY_IFNOTPRESENT: '로컬 이미지 우선 사용',
  // List > Create > Pod Settings > Add Container > Health Check
  LIVENESS_CHECK: 'Liveness 체크',
  READINESS_CHECK: 'Readiness 체크',
  STARTUP_CHECK: '스타트업 검사',
  LIVENESS_CHECK_DESC: '컨테이너가 활성 상태인지 확인합니다.',
  READINESS_CHECK_DESC: '컨테이너가 요청을 처리할 준비가 되었는지 확인합니다.',
  STARTUP_CHECK_DESC: '컨테이너가 성공적으로 시작되었는지 확인합니다.',
  ADD_PROBE: 'Probe 추가',
  COMMANDS: '명령어',
  HEALTH_CHECK: 'Health 체크',
  STARTUP_CHECK_TIP: 'Kubernetes v1.18 이상이 필요합니다.',
  HTTP_PATH_EMPTY: 'HTTP 체크하는데 사용되는 경로를 설정하십시오.',
  // List > Create > Pod Settings > Add Container > Life Management
  LIFECYCLE_MANAGEMENT: '라이프사이클 관리',
  LIFECYCLE_MANAGEMENT_DESC: '환경 준비 또는 정상 종료를 위해 컨테이너가 시작된 후 또는 중지되기 전까지 수행할 작업을 추가합니다.',
  POSTSTART_ACTION: 'Post-start 작업',
  PRESTOP_ACTION: 'Pre-stop 작업',
  POSTSTART_ACTION_DESC: '컨테이너가 시작된 후 수행할 작업을 추가합니다.',
  PRESTOP_ACTION_DESC: '컨테이너를 중지하기 전에 수행할 작업을 추가합니다.',
  ADD_ACTION: '작업 추가',
  // List > Create > Pod Settings > Add Container > Environment Variables
  ADD_ENVIRONMENT_VARIABLE: '환경 변수 추가',
  KEY_IN_RESOURCE: '리소스 키',
  LABEL_TYPE: '{label} <span style="{style}">({type})</span>',
  RESOURCE: '리소스',
  CREATE_CONFIGMAP_SECRET_DESC: '요구 사항을 충족하는 컨피그맵 또는 시크릿이 없는 경우',
  CREATE_CONFIG: '컨피그맵 생성',
  OR: '또는',
  CREATE_SECRET: '시크릿을 생성합니다.',
  DEFAULT_REPOSITORY: 'Default Registry',
  SET_DEFAULT_REPOSITORY: 'Set Default Registry',
  SET_AS_DEFAULT_REPOSITORY_DESC: 'Set the image registry as the default image registry. Unless otherwise specified, the system uses images from the default image registry to create application workloads. Only one default image registry is allowed in each project.',
  SET_AS_DEFAULT_REPOSITORY: 'Set as Default',
  SET_DEFAULT_REPO_SUCCESSFUL: 'Default repository set successfully',
  // List > Create > Pod Settings > Add Container > Container Security Context
  CONTAINER_SECURITY_CONTEXT: '컨테이너 보안 컨텍스트',
  CONTAINER_SECURITY_CONTEXT_DESC: '컨테이너의 권한 설정을 커스터마이즈합니다.',
  PRIVILEGED_MODE: '특권 모드',
  PRIVILEGED_MODE_DESC: '호스트의 루트 사용자로 컨테이너 프로세스를 실행합니다.',
  ALLOW_PRIVILEGE_ESCALATION: '권한 상승 허용',
  ALLOW_PRIVILEGE_ESCALATION_DESC: '컨테이너 프로세스가 상위 프로세스보다 더 많은 권한을 획득할 수 있습니다. 이 옵션은 특권 모드가 활성화된 경우 기본적으로 활성화됩니다.',
  ROOT_DIRECTORY_READONLY: '루트 디렉터리 읽기 전용',
  ROOT_DIRECTORY_READONLY_DESC: '컨테이너 파일 시스템의 루트 디렉터리를 읽기 전용으로 설정합니다.',
  USER_AND_USER_GROUP: '사용자 및 사용자 그룹',
  USER_GROUP: '사용자 그룹',
  RUN_AS_NON_ROOT: '루트가 아닌 사용자 권한으로 실행',
  RUN_AS_NON_ROOT_DESC: '컨테이너를 시작하기 전에 루트 사용자 권한으로 컨테이너를 실행할지 여부를 확인합니다. 예를 선택하면 컨테이너가 시작되지 않습니다.',
  RUN_AS_USER_DESC: '컨테이너 프로세스의 진입점을 실행하는 UID입니다. 기본값은 이미지 메타데이터에 지정된 UID입니다.',
  RUN_AS_USER_GROUP_DESC: '컨테이너 프로세스의 진입점을 실행하는 GID입니다. 기본값은 컨테이너 런타임에 지정된 GID입니다.',
  SELINUX_CONTEXT: 'SELinux 컨텍스트',
  CAPABILITIES: 'Capabilities',
  DROP: 'Drop',
  ACCESS_CONTROL: '접근 제어',
  LEVEL: '레벨',
  // List > Create > Pod Settings > Add Container > Synchronize Host Timezone
  SYNC_HOST_TIMEZONE_DESC: '컨테이너의 표준 시간대를 호스트의 표준 시간대와 동기화합니다.',
  SYNC_HOST_TIMEZONE: '호스트 표준 시간대 동기화',
  // List > Create > Pod Settings > Update Strategy
  UPDATE_STRATEGY: '업데이트 전략',
  ROLLING_UPDATE_RECOMMENDED: '롤링 업데이트(권장)',
  SIMULTANEOUS_UPDATE: '동시 업데이트',
  ROLLINGUPDATE_DESC: '오래 된 파드 복제본을 점차 새로운 드 복제본으로 교체합니다. 업데이트 프로세스 중에는 서비스가 중단되지 않습니다.',
  SIMULTANEOUS_UPDATE_DESC: '새로운 파드 복제본을 만들기 전에 기존 파드 복제본을 모두 삭제합니다. 업데이트 프로세스 중에 서비스가 중단됩니다.',
  ENTER_INTEGER_OR_PERCENTAGE: '정수 또는 백분율을 입력하십시오.',
  MAX_EXTRA_EMPTY: '업데이트 프로세스 중 허용되는 여분의 파드 복제본의 최대 수 또는 백분율을 설정하십시오.',
  // List > Create > Pod Settings > Pod Security Context
  POD_SECURITY_CONTEXT: '파드 보안 컨텍스트',
  POD_SECURITY_CONTEXT_DESC: '파드 권한 설정을 커스터마이즈합니다.',
  POD_SECURITY_CONTEXT_TIP: '사용자, 사용자 그룹 및 SELinux 컨텍스트 설정이 파드 보안 컨텍스트 및 컨테이너 보안 컨텍스트에 모두 정의된 경우 컨테이너 보안 컨텍스트 설정이 파드 보안 컨텍스트 설정을 재정의합니다.',
  // List > Create > Pod Settings > Pod Scheduling Rules
  POD_SCHEDULING_RULES: '파드 스케줄링 규칙',
  POD_SCHEDULING_RULES_DESC: '노드에 파드 복제본을 스케줄링 위한 규칙을 지정합니다.',
  DEFAULT_RULES: '기본 규칙',
  DEFAULT_RULES_DESC: '기본 규칙에 따라 파드 복제본을 노드로 스케줄링 합니다.',
  DECENTRALIZED_SCHEDULING: '분산 예약',
  CUSTOM_RULES: '규칙 커스터마이즈',
  CUSTOM_RULES_DESC: '커스텀 규칙에 따라 파드 복제본을 노드로 스케줄링합니다.',
  DECENTRALIZED_SCHEDULING_DESC: '가능한 경우 파드 복제본을 다른 노드로 스케줄링합니다.',
  CENTRALIZED_SCHEDULING_DESC: '가능한 경우 파드 복제본을 동일한 노드로 스케줄링합니다.',
  CENTRALIZED_SCHEDULING: '중앙 집중화된 스케줄링',
  SCHEDULE_WITH_TARGET: '대상과 같이 스케줄링',
  SCHEDULE_AWAY_FROM_TARGET: '대상에서 멀리 스케줄링',
  MATCH_IF_POSSIBLE: '가능한 경우 일치',
  MUST_MATCH: '필수로 일치',
  TARGET: '대상',
  STRATEGY: '전략',
  // List > Create > Pod Settings > Pod Grace Period
  POD_GRACE_PERIOD: 'Pod Grace Period',
  POD_GRACE_PERIOD_DESC: 'Set the waiting time before Pod terminates, after which Pod will be forcibly terminated.',
  TERMINATION_GRACEPERIOD_SECONDS: 'Termination GracePeriod Seconds (s)',
  // List > Create > Pod Settings > Add Metadata
  ADD_METADATA: '메타데이터 추가',
  POD_ADD_METADATA_DESC: '파드 복제본에 메타데이터를 추가합니다.',
  // List > Create > Storage Settings
  STORAGE_SETTINGS: '저장소 설정',
  READ_ONLY_LOW: '읽기 전용',
  READ_AND_WRITE_LOW: '읽기 및 쓰기',
  // List > Create > Storage Settings > Mount Volume
  MOUNT_VOLUME: '마운트 볼륨',
  WORKLOAD_MOUNT_VOLUME_DESC: '퍼시스턴트 볼륨, 임시 볼륨 또는 HostPath 볼륨을 컨테이너에 마운트합니다.',
  SELECT_PERSISITENT_VOLUME_CLAIM: '퍼시스턴트 볼륨 클레임 선택',
  SELECT_PERSISITENT_VOLUME_CLAIM_DESC: '퍼시스턴트 볼륨 클레임에 따라 생성된 퍼시스턴트 볼륨을 컨테이너에 마운트합니다.',
  CAPACITY: '용량',
  PVC_NOT_SELECT: '퍼시스턴트 볼륨 클레임을 선택하십시오.',
  TEMPORARY_VOLUME: '임시 볼륨',
  VOLUME_NAME: '볼륨 이름',
  VOLUME_NAME_EMPTY: '볼륨 이름을 설정하십시오.',
  HOST_PATH_EMPTY: '볼륨의 호스트 경로를 설정하십시오.',
  CONTAINER_NOT_SELECTED: '볼륨을 하나 이상의 컨테이너에 마운트하십시오.',
  NOT_MOUNT: '마운트되지 않음',
  HOSTPATH_VOLUME: 'HostPath 볼륨',
  HOSTPATH_TIP: 'HostPath 볼륨을 사용하여 호스트 파일 시스템의 파일 또는 디렉토리를 컨테이너에 마운트합니다.',
  HOST_PATH: 'Host Path',
  READ_AND_WRITE: '읽기 및 쓰기',
  READ_ONLY: '읽기 전용',
  // List > Create > Storage Settings > Mount Configmap or Secret
  MOUNT_CONFIGMAP_OR_SECRET: '컨피그맵 또한 시크릿 마운트',
  MOUNT_CONFIGMAP_OR_SECRET_DESC: '컨피그맵 또는 시크릿을 컨테이너에 마운트합니다.',
  CONFIGMAP: '컨피그맵',
  SELECT_CONFIGMAP_DESC: '컨피그맵을 컨테이너에 마운트합니다.',
  READ_WRITE_MOUNT_EMPTY: '볼륨 액세스 모드와 마운트 경로를 지정하십시오.',
  SELECT_SPECIFIC_KEYS: '특정 키 선택',
  SELECT_SPECIFIC_KEYS_DESC: '컨테이너에 마운트할 특정 키를 선택합니다.',
  SELECT_SECRET_DESC: '시크릿을 컨테이너에 마운트합니다.',
  CONFIGMAP_NOT_SELECT: '컨피그맵을 선택하십시오.',
  SECRET_NOT_SELECT: '시크릿을 선택하십시오.',
  NO_AVAILABLE_RESOURCE: '사용 가능한 리소스가 없음',
  // List > Create > Advanced Settings
  SELECT_NODES: '노드 선택',
  SELECT_NODES_DESC: '파드 복제본을 특정 노드에 할당합니다. 레이블을 사용하여 노드를 선택하거나 수동으로 노드를 지정할 수 있습니다.',
  ADD_NODE_SELECTOR: '노드 셀렉터 추가',
  ADD_METADATA_DESC: '메타데이터를 리소스에 추가합니다.',
  KEY: '키',
  VALUE: '값',
  ADVANCED_SETTINGS: '고급 설정',
  DUPLICATE_LABELS: '중복 된 레이블을 추가할 수 없습니다.',
  // List > Create > Advanced Settings > Specify Node
  WORKLOAD_SPECIFY_NODE_DESC: '파드 복제본을 특정 노드에 할당합니다.',
  // List > Create > Cluster Differences
  CLUSTER_DIFF: '클러스터 차이',
  CLUSTER_DIFF_CONTAINER_SETTINGS_DESC: '서로 다른 클러스터에서 서로 다른 컨테이너 설정을 적용합니다.',
  CLUSTER_DIFF_PORT_SETTINGS_DESC: '서로 다른 클러스터에 있는 컨테이너에 대해 서로 다른 포트를 설정합니다.',
  CLUSTER_DIFF_ENVIRONMENT_VARIABLES_DESC: '서로 다른 클러스터에 있는 컨테이너에 대해 서로 다른 환경 변수를 설정합니다.',
  CONTAINER_IMAGE: '컨테이너 이미지'
};