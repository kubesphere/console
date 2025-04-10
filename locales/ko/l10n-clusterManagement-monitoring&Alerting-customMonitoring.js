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
  CUSTOM_MONITORING: '커스텀 모니터링',
  CUSTOM_MONITORING_DASHBOARD: '커스텀 모니터링 대시보드',
  CUSTOM_MONITORING_DASHBOARD_PL: '커스텀 모니터링 대시보드',
  CUSTOM_MONITORING_DASHBOARD_EMPTY_DESC: '커스텀 모니터링 대시보드를 생성하십시오.',
  CUSTOM_MONITORING_DASHBOARD_DESC: '커스텀 모니터링은 애플리케이션 모니터링 템플릿을 제공합니다. 필요에 따라 모니터링 대시보드를 커스터마이즈 할 수 있습니다.',
  // List
  // List > Create
  TEMPLATE: '템플릿',
  CREATE_CUSTOM_MONITORING_DASHBOARD: '커스텀 모니터링 대시보드 생성',
  MONITORING_TEMPLATE: '모니터링 템플릿',
  CUSTOM_MONITORING_TEMPLATE_DESC: '기본 템플릿을 선택하거나, 템플릿을 업로드하거나, 템플릿을 커스터마이즈하여 커스텀 모니터링 대시보드를 생성합니다.',
  // List > Create > Grafana
  UPLOAD_GRAFANA_DASHBOARD: 'Grafana 대시보드 업로드',
  SUPPORT_JSON_FILE: 'JSON 형식의 파일만 지원됩니다.',
  UPLOAD_GRAFANA_URL: 'URL에서 Grafana 대시보드를 업로드합니다.',
  UPLOAD_FROM_LOCAL_TITLE: '파일 선택 또는 드래그',
  FILE_UPLOAD_ERROR: '하나의 파일만 업로드할 수 있습니다.',
  UPLOAD_FILE_TIP: '파일을 업로드하십시오.',
  ENTER_GRAFANA_URL: 'Grafana 대시보드 URL을 입력하십시오.',
  UPLOAD_FROM_LOCAL_STORAGE: '로컬 스토리지에서 업로드',
  UPLOAD_FROM_URL: 'URL에서 업로드',
  // List > Create > Custom
  DASHBOARD_TITILE: '대시보드 제목',
  APPLICABLE_SCENE: '적용가능한 시나리오',
  BASE_LINE_CHART: '꺽은선형 차트',
  STACK_LINE_CHART: '누적 영역형 차트',
  BASE_LINE_CHART_DESC: '꺽은선형 차트는 주로 시간에 따른 데이터의 추세 또는 변화를 시각화하는 데 사용됩니다. 웹 사이트 트래픽 또는 제품 가격과 같은 일련의 2차원 연속 데이터를 표시하는 데 매우 유용합니다.',
  STACK_LINE_CHART_DESC: '누적 영역형 차트는 구간 내에서 여러 변수를 비교하는 데 사용할 수 있는 특수한 유형의 영역 차트입니다. 각 그룹과 전체 차트의 관계를 분석하고 각 그룹의 비율을 표시할 수 있으므로 여러 데이터 열을 사용할 수 있는 경우 매우 유용합니다.',
  LINE_CHART_DESC: '꺽은선형 차트는 주로 시간에 따른 데이터의 추세 또는 변화를 시각화하는 데 사용됩니다.',
  BASE_BAR_CHART: '막대형 차트',
  STACK_BAR_CHART: '누적 막대형 차트',
  BAR_CHART_DESC: '막대형 차트는 가장 일반적인 차트 유형입니다. 표시되는 값에 비례하는 높이 또는 길이를 갖는 수평 또는 수직 막대와 함께 서로 다른 범주형 데이터를 표시합니다.',
  BASE_BAR_CHART_DESC: '세로 막대 차트의 한 축은 비교 중인 범주를 나타내고 다른 축은 각 범주의 값을 나타냅니다.',
  STACK_BAR_CHART_DESC: '누적 막대 차트는 막대 차트의 확장입니다. 표준 막대 차트는 개별 데이터 점을 서로 비교하는 반면, 누적 막대 차트에서는 데이터의 일부가 인접하거나 쌓입니다. 범주의 전체 양과 해당 하위 양(비율)을 표시하는 데 사용할 수 있습니다. 따라서 부분 대 전체 관계를 조사하는 데 매우 유용합니다.',
  CUSTOM_DISPLAY_MODAL_DESC: '필요에 따라 테이블 표시 스타일 커스터마이즈',
  THRESHOLD_FILL_DESC: '임계값을 설정할 수 있으며 임계값을 초과한 후 스타일을 자동으로 변경할 수 있습니다.',
  ADD_MONITOR_ITEM: '모니터링 항목 추가',
  ADD_MONITOR_ROW: '모니터링 그룹 추가',
  CHART_TYPES: '차트 유형',
  GRAPH_TYPES: '그래프 유형',
  LINE_CHART: '꺽은선형 차트',
  BAR_CHART: '막대 차트',
  SELECT_CHART_TYPE: '차트 유형 선택',
  SELECT_CHART_TYPE_MODAL_DESC: '사용자 지정 차트 유형 선택',
  SINGLE_STATE_CHART: '실시간 텍스트',
  DISPLAY_POSITION: '표시 위치',
  EMPTY_CHART_PLACEHOLDER: '차트가 여기에 표시됩니다.',
  DISPLAY_FORMAT: '표시 형식',
  FIELD_NAME: '필드 이름',
  COLUMN_NAME: '컬럼 이름',
  GRAPH_NAME: '차트 이름',
  DECIMALS: '소수점 이하',
  TABLE: '테이블',
  TABLE_SETTINGS: '테이블 설정',
  VALUE_FOMATER: '값 형식',
  PER_PAGE_LINES: '페이지 당 선',
  CUSTOM_DISPLAY_STYLE: '표시 스타일',
  DATA_TYPE: '데이터 유형',
  Y_AXIS: 'Y 축',
  GRAPH_COLORS: '차트 색상',
  SINGLE_GRAPH_TYPE_NAME: '기본 차트',
  SINGLE_GRAPH_TYPE: '가장 일반적인 차트 유형',
  STACKED_GRAPH_TYPE: '누적 차트',
  STACKED_GRAPH_TYPE_DESC: '부분 대 전체 관계를 표시하는 데 유용합니다',
  MONITOR_TYPE_NO_SUPPORT: '현재 지원되지 않는 유형입니다',
  MONITOR_METRIC: '모니터링 메트릭',
  METRIC_NAME: '메트릭 이름',
  DEBUGB_DATA: '디버깅 데이터',
  TIME_FORMAT: '시간 형식',
  HIGHT_RULES: '강조 표시 규칙',
  EDIT_TEMPLATE: '템플릿 편집',
  SAVE_TEMPLATE: '템플릿 저장',
  THRESHOLD_FILL: '임계값 설정',
  UNIT: '단위',
  COOL_COLORS: '시원한 색상',
  WARM_COLORS: '따뜻한 색상',
  DEFAULT_COLORS: '기본 색상',
  LAST: '마지막',
  SECOND_TIME: '{count, plural, =1 {1 초} other{# 초}}',
  MINUTE_TIME: '{count, plural, =1 {1 분} other{# 분}}',
  HOUR_TIME: '{count, plural, =1 {1 시간} other{# 시간}}',
  DAY_TIME: '{count, plural, =1 {1 일} other{# 일}}',
  WEEK_TIME: '{count, plural, =1 {1 주} other{# 주}}',
  NO_REFRESHING: '새로고침 안 함',
  INTERVAL: '시간 간격',
  // List > Edit Information
  // List > Edit YAMl
  // List > Delete
  CUSTOM_MONITORING_DASHBOARD_LOW: '커스텀 모니터링 대시보드'
};