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
  CLUSTER_VISIBILITY: '集群能見度',
  EDIT_VISIBILITY_DESC: '編輯集群在企業空間中的能見度。',
  UNAUTHORIZED: '未授權',
  CLUSTER_VISIBILITY_DESC: '集群能見度控制集群對企業空間的授權。將集群授權給企業空間後，即可在企業空間中查看並管理集群資源。',
  CLUSTER_VISIBILITY_Q1: '如何將集群授權給指定的企業空間使用？',
  CLUSTER_VISIBILITY_A1: '您可以點擊編輯能見度將集群授權給指定的企業空間使用。',
  CLUSTER_VISIBILITY_Q2: '什麼是公開集群?',
  CLUSTER_VISIBILITY_A2: '公開狀態的集群意味著平台内的用戶都可以使用該集群，並在集群中創建和調度資源。',
  // List
  WORKSPACE: '企業空間',
  CLUSTER_VISIBILITY_SCAP: '集群能見度',
  AUTHORIZATION_TIME_TCAP: '授權時間',
  // List > Edit Visibility
  EDIT_VISIBILITY: '編輯能見度',
  AUTHORIZED: '已授權',
  SET_PUBLIC_CLUSTER: '設置為公開集群',
  HOST_CLUSTER_VISIBILITY_WARNING: '請謹慎將主集群授權给企業空間，主集群負載過高會導致多集群系統穩定性下降。',
  CLUSTER_VISIBILITY_REMOVE_WARNING: '移除集群對企業空間的授權後，該企業空間在目前集群下的所有資源將被刪除。',
  REMOVE_WORKSPACE_CONFIRM_TITLE: '移除授權',
  REMOVE_WORKSPACE_CONFIRM_SI: '請輸入企業空間名稱 <strong>{resource}</strong> 確保您已了解操作所带来的風險。',
  REMOVE_WORKSPACE_CONFIRM_PL: '請輸入企業空間名稱 <strong>{resource}</strong> 確保您已了解操作所带来的風險。'
};