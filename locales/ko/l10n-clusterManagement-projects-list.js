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
  PROJECT_DESC: '프로젝트는 리소스를 그룹화하고 서로 다른 사용자의 리소스 관리 권한을 제어하는 데 사용됩니다.',
  SYSTEM_PROJECTS: '시스템 프로젝트',
  USER_PROJECTS: '사용자 프로젝트',
  // List
  EMPTY_WRAPPER: '{resource} 리소스를 찾을 수 없음',
  TERMINATING: '종료 중',
  ACTIVE: '활성화',
  // List > Assign Workspace
  PROJECT_ADMINISTRATOR: '프로젝트 관리자',
  PROJECT_ADMINISTRATOR_DESC: '워크스페이스에서 사용자를 프로젝트 관리자로 선택합니다.',
  PROJECT_ASSIGN_DESC: '프로젝트가 워크스페이스에 할당된 후에는 워크스페이스를 변경할 수 없습니다.',
  // List > Create
  CREATE_PROJECT_DESC: '리소스를 그룹화하고 서로 다른 사용자의 리소스 관리 권한을 제어하는 프로젝트를 만듭니다.',
  PROJECT_NAME_DESC: '이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자로 시작하고 소문자 또는 숫자로 끝나야 합니다. 최대 길이는 63자입니다.',
  PROJECT_NAME_INVALID_DESC: '잘못된 이름입니다. 이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자로 시작하고 소문자 또는 숫자로 끝나야 합니다. 최대 길이는 63자입니다.',
  CANCEL: '취소',
  CREATE_NAME: '{name} 생성',
  DESCRIPTION: '설명',
  NAME_VALIDATION_FAILED: '이름은 Kubernetes 시스템용으로 예약된 kube-로 시작할 수 없습니다.',
  PROJECT_NAME_EXIST_DESC: '존재하는 이름입니다. 다른 이름을 입력하십시오. 프로젝트 이름은 전체 플랫폼에서 고유해야 합니다.',
  NAME_EMPTY_DESC: '이름을 입력하세요.',
  OK: '확인',
  NAME_DESC: '이름은 소문자, 숫자 및 하이픈(-)만 포함할 수 있으며 소문자 또는 숫자로 시작하고 끝나야 합니다. 최대 길이는 63자입니다.',
  DESCRIPTION_DESC: '설명은 임의의 문자를 포함할 수 있으며 최대 길이는 256자입니다.',
  ALIAS_DESC: '별칭 이름은 문자, 숫자 및 하이픈(-)만 포함할 수 있으며 하이픈으로 시작할 수 없습니다. 최대 길이는 63자입니다.',
  // List > Edit Information
  EDIT_INFORMATION: '정보 편집',
  // List > Delete
  DELETE_TITLE_SI: '{type} 삭제',
  DELETE_TITLE_PL: '여러 {type} 삭제 ',
  DELETE: '삭제',
  PROJECT_LOW: '프로젝트',
  DELETED_SUCCESSFULLY: '삭제 완료',
  STOP_SUCCESS_DESC: '성공적으로 종료 되었습니다.',
  DELETE_RESOURCE_TYPE_DESC_SI: '{type} 이름 <strong>{resource} </strong>을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.',
  DELETE_RESOURCE_TYPE_DESC_PL: '{type} 이름 <strong>{resource} </strong>을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.',
  DELETE_RESOURCE_TYPE_DESC_GW: '{type} 이름 <strong>{resource} </strong>을 입력하여 이 작업의 위험을 이해하고 있는지 확인합니다.'
};