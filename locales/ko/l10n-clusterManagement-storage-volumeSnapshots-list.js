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
  VOLUME_SNAPSHOT: '볼륨 스냅샷',
  VOLUME_SNAPSHOT_PL: '볼륨 스냅샷',
  VOLUME_SNAPSHOT_DESC: '볼륨 스냅샷은 특정 시점의 볼륨 복사본입니다. 스냅샷에 의해 미리 채워진 데이터로 새 볼륨을 프로비저닝하거나 스냅샷에 의해 캡처된 볼륨을 이전 상태로 복원하는 데 사용할 수 있습니다.',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: '볼륨 스냅샷 클래스란?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A: '볼륨 스냅샷 클래스는 볼륨 스냅샷을 생성하는 데 사용되는 스토리지 유형을 정의합니다.',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: '볼륨 스냅샷 콘텐츠란?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A: '볼륨 스냅샷 컨텐츠는 볼륨 스냅샷의 컨텐츠를 나타내는 리소스입니다.',
  SELECT_A_VOLUME_DESC: '스냅샷을 생성할 퍼시스턴트 볼륨 클레임을 선택합니다.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC: '특정 유형의 스냅샷을 생성하려면 스냅샷 클래스를 선택합니다.',
  // List
  VOLUME_SNAPSHOT_EMPTY_DESC: '볼륨 스냅샷을 생성하십시오.',
  VOLUME_SNAPSHOT_STATUS_CREATING: '생성 중',
  VOLUME_SNAPSHOT_STATUS_FAILED: '생성 실패',
  VOLUME_SNAPSHOT_STATUS_READY: '생성 성공',
  VOLUME_SNAPSHOT_STATUS_DELETING: '삭제 중',
  CREATE_STATUS_SUCCESS: '생성 성공',
  CREATE_STATUS_UPDATING: '생성 중',
  CREATE_STATUS_FAILED: '생성 실패',
  CREATE_STATUS_DELETING: '삭제 중',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: '볼륨 스냅샷',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT: '퍼시스턴트 볼륨 클레임의 스토리지 클래스가 스냅샷 생성을 지원하지 않습니다. 다른 퍼시스턴트 볼륨 클레임을 선택하십시오.'
};