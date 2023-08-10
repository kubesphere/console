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
  WORKSPACE_ROLE_PL: '워크스페이스 역할',
  WORKSPACE_ROLE_DESC: '워크스페이스 맴버의 역할에 따라 워크스페이스에서 맴버의 사용 권한이 결정됩니다.',
  // List
  WORKSPACE_ROLE_EMPTY_DESC: '워크스페이스 역할을 생성하십시오.',
  ROLE_WORKSPACE_ADMIN: '워크스페이스 내 모든 리소스를 관리합니다.',
  ROLE_WORKSPACE_REGULAR: '워크스페이스 설정을 조회합니다.',
  ROLE_WORKSPACE_VIEWER: '워크스페이스 내 모든 리소스를 조회합니다.',
  ROLE_WORKSPACE_SELF_PROVISIONER: '워크스페이스 설정을 조회하고, 앱 템플릿을 관리하고, 프로젝트 및 데브옵스 프로젝트를 생성합니다.',
  // List > Create
  CREATE_WORKSPACE_ROLE: '워크스페이스 역할 생성',
  WORKSPACE_ROLE_NAME_TIP: '역할 이름은 역할의 고유 식별자로 사용됩니다.',
  NEXT_STEP: '다음 단계',
  NEXT_STEP_DESC: '역할의 사용 권한을 편집해야 합니다.',
  // List > Create > Edit Permissions > Project Management
  PERMIGROUP_PROJECTS_MANAGEMENT: '프로젝트',
  PERMISSION_PROJECTS_VIEW: '프로젝트 보기',
  PERMISSION_PROJECTS_VIEW_DESC: '워크스페이스 내 모든 리소스를 조회합니다.',
  PERMISSION_PROJECTS_MANAGEMENT: '프로젝트 관리',
  PERMISSION_PROJECTS_MANAGEMENT_DESC: '\b워크스페이스 내 프로젝트들을 생성, 편집 및 삭제합니다.',
  PERMISSION_PROJECTS_CREATE: '프로젝트 생성',
  PERMISSION_PROJECTS_CREATE_DESC: '프로젝트를 생성하고 생성된 프로젝트의 관리자가 됩니다.',
  // List > Create > Edit Permissions > DevOps Project Management
  PERMIGROUP_DEVOPS_MANAGEMENT: '데브옵스 프로젝트',
  PERMISSION_DEVOPS_VIEW: '데브옵스 프로젝트 보기',
  PERMISSION_DEVOPS_VIEW_DESC: '워크스페이스 내 모든 데브옵스 프로젝트들을 조회합니다.',
  PERMISSION_DEVOPS_MANAGEMENT: '데브옵스 프로젝트 관리',
  PERMISSION_DEVOPS_MANAGEMENT_DESC: '워크스페이스 내 데브옵스 프로젝트를 생성, 편집 및 삭제합니다.',
  PERMISSION_DEVOPS_CREATE: '데브옵스 프로젝트 생성',
  PERMISSION_DEVOPS_CREATE_DESC: '데브옵스 프로젝트를 생성하고 생성된 데브옵스 프로젝트의 관리자가 됩니다.',
  // List > Create > Edit Permissions > App Management
  PERMISSION_APPS_MANAGEMENT: '앱 관리',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW: '앱 저장소 보기',
  PERMISSION_WORKSPACE_APP_REPOS_VIEW_DESC: '워크스페이스 내 앱 저장소를 조회합니다.',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT: '앱 저장소 관리',
  PERMISSION_WORKSPACE_APP_REPOS_MANAGEMENT_DESC: '워크스페이스 내 앱 저장소를 생성, 편집 및 삭제합니다.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW: '앱 템플릿 보기',
  PERMISSION_WORKSPACE_APP_TEMPLATES_VIEW_DESC: '워크스페이스 내 앱 템플릿을 조회합니다.',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT: '앱 템플릿 관리',
  PERMISSION_WORKSPACE_APP_TEMPLATES_MANAGEMENT_DESC: '워크스페이스 내 앱 템플릿을 업로드, 편집 및 삭제하고, 플랫폼 앱스토어에서 앱을 릴리스 및 삭제합니다.',
  // List > Create > Edit Permissions > Access Control
  PERMISSION_WORKSPACE_GROUPS_VIEW: '부서 보기',
  PERMISSION_WORKSPACE_GROUPS_VIEW_DESC: '워크스페이스 부서의 구조 및 맴버를 봅니다.',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT: '부서 관리',
  PERMISSION_WORKSPACE_GROUPS_MANAGEMENT_DESC: '워크스페이스 부서의 구조, 맴버 및 권한을 관리합니다.',
  PERMISSION_WORKSPACE_MEMBERS_VIEW: '맴버 보기',
  PERMISSION_WORKSPACE_MEMBERS_VIEW_DESC: '워크스페이스 맴버를 조회합니다.',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT: '맴버 관리',
  PERMISSION_WORKSPACE_MEMBERS_MANAGEMENT_DESC: '워크스페이스 맴버를 초대, 편집 및 삭제합니다.',
  PERMISSION_WORKSPACE_ROLES_VIEW: '역할 보기',
  PERMISSION_WORKSPACE_ROLES_VIEW_DESC: '워크스페이스 역할을 조회합니다.',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT: '역할 관리',
  PERMISSION_WORKSPACE_ROLES_MANAGEMENT_DESC: '시스템 프리셋 역할을 제외한 워크스페이스 역할을 생성, 편집 및 삭제합니다.',
  // List > Create > Edit Permissions > Workspace Settings Management
  PERMIGROUP_WORKSPACE_SETTINGS: '워크스페이스 설정',
  PERMISSION_WORKSPACE_SETTINGS_VIEW: '워크스페이스 설정 보기',
  PERMISSION_WORKSPACE_SETTINGS_VIEW_DESC: '워크스페이스 설정을 조회합니다.',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT: '워크스페이스 설정 관리',
  PERMISSION_WORKSPACE_SETTINGS_MANAGEMENT_DESC: '워크스페이스를 관리하고 워크스페이스 정보 및 네트워크 정책을 편집합니다.'
};