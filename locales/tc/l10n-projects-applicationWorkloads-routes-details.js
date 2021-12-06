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
  // Details
  // Resource Status
  DOMAIN_NAME_VALUE: 'Domain Name: {value}',
  PATH_VALUE: '路徑：{value}',
  RULES: '規則',
  ROUTE_PATH_VALUE: '路徑：<strong>{value}</strong>',
  ROUTE_SERVICE_VALUE: '服務：<strong>{value}</strong>',
  ROUTE_PORT_VALUE: '端口：<strong>{value}</strong>',
  ACCESS_SERVICE: '訪問服務',
  UNABLE_TO_ACCESS: '無法訪問服務',
  UNABLE_TO_ACCESS_TIP: '● 請確保您設置的域名可以解析到訪問入口的 IP 地址;<br/>● 如果在私有雲環境中，請修改本地的 host 檔案，並通過&lt域名&gt:&ltNodePort&gt的方式來訪問;<br/>● 通過配置 DNS 訪問，將域名修改為&ltHostname&gt.&lt網關地址&gt.nip.io，然後可以通過&ltHostname&gt.&lt網關地址&gt.nip.io:&ltNodePort&gt的形式來訪問服務;<br/>● 如果通過域名訪問被拒絕，請確認您的域名是真實域名而且已經申請通過。',
  CERTIFICATE_VALUE: 'Certificate: {value}'
};