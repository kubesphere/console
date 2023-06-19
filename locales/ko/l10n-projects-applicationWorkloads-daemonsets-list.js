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
  // List
  // List > Create > Basic Information
  // List > Create > Pod Settings
  CONTAINER_SETTINGS_DESC: '컨테이너의 이미지, 이름, 유형 및 컴퓨팅 리소스를 설정합니다.',
  PORT_SETTINGS_DESC: '컨테이너에 액세스하는 데 사용되는 포트를 설정합니다.',
  HEALTH_CHECKER_DESC: 'Probe를 추가하여 컨테이너 상태를 정기적으로 확인합니다.',
  STARTUP_COMMAND: '시작 명령',
  STARTUP_COMMAND_DESC: '파드 시작 시 컨테이너에서 실행되는 커맨드를 커스터마이즈합니다. 기본적으로 컨테이너는 이미지에 지정된 기본 커맨드를 실행합니다.',
  CONTAINER_COMMAND_DESC: '컨테이너의 시작 커맨드입니다.',
  CONTAINER_ARGUMENT_DESC: '시작 커맨드의 매개 변수입니다. 여러 매개 변수를 구분하려면 쉼표를 사용합니다.',
  CONTAINER_ENVIRONMENT_DESC: '컨테이너에 환경 변수를 추가합니다.',
  PROBE_COMMAND_DESC: '여러 명령을 구분하려면 쉼표를 사용합니다.',
  // List > Create > Pod Settings > Add Container
  IGNORE_CERT_WARN_DESC: '인증서 확인을 무시하면 암호가 노출될 수 있습니다.',
  CERT_ERROR: '인증서 오류입니다.'
};