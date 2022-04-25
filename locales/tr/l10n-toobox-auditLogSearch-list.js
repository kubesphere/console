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
  // Title
  TOTAL_AUDITING_TODAY: 'Bugün toplam <span class={className}> {auditing} </span> denetim günlüğü girişi toplandı.',
  NO_AUDIT_LOG_TODAY: 'Bugün Toplanan Denetim Günlüğü Yok',
  // Search
  NO_AVAILABLE_CLUSTER: 'Kullanılabilir Küme Yok',
  AUDITING_NOT_ENABLED_DESC: 'Bileşen etkin değil. <a href="{docUrl}/pluggable-components/auditing-logs/" target="_blank">Daha Fazla Bilgi Edinin</a>',
  TIME_RANGE_LAST: 'Zaman aralığı: son {değer}',
  TIME_RANGE_RANGE: 'Zaman aralığı:{startTime} –{endTime}',
  // Querying Rules
  AUDIT_LOG_WORKSPACE_TIP: 'Denetim günlüklerini aramak için bir çalışma alanı adı girin.',
  AUDIT_LOG_PROJECT_TIP: 'Denetim günlüklerini aramak için bir proje adı girin.',
  AUDIT_LOG_RESOURCE_NAME_TIP: 'Denetim günlüklerini aramak için bir kaynak adı girin.',
  AUDIT_LOG_RESOURCE_TYPE_TIP: 'Denetim günlüklerini aramak için bir kaynak türü girin.',
  AUDIT_LOG_VERB_TIP: 'Denetim günlüklerini aramak için bir fiil girin.',
  AUDIT_LOG_STATUS_CODE_TIP: 'Denetim günlüklerini aramak için bir durum kodu girin.',
  AUDIT_LOG_OPERATOR_TIP: 'Denetim günlüklerini aramak için bir operatör girin.',
  AUDIT_LOG_SOURCE_IP_ADDRESS_TIP: 'Denetim günlüklerini aramak için bir kaynak IP adresi girin.',
  SEARCH_BY_VERB: 'Fiil ile ara',
  SEARCH_BY_STATUS_CODE: 'Durum Koduna Göre Ara',
  SEARCH_BY_OPERATOR: 'Operatöre Göre Ara',
  SEARCH_BY_SOURCE_IP_ADDRESS: 'Kaynak IP Adresine Göre Ara',
  ENABLE_AUDIT_LOG_COLLECTION_DESC: 'You need to enable audit log collection if it is disabled. <a href="{link}" target="_blank">Learn More</a>'
};