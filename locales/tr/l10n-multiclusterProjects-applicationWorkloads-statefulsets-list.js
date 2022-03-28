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
  STATEFULSET_EMPTY_DESC: 'Lütfen bir statefulset oluşturun.',
  // List > Edit Information
  // List > Edit YAML
  // List > Delete
  // List > Create
  // List > Create > Basic Information
  // List > Create > Pod Settings
  POD_SETTINGS: 'Kapsül Ayarları',
  POD_REPLICAS: 'Kapsül Replikaları',
  ONDELETE: 'Güncelleme veya Silme',
  ONDELETE_DESC:
    'Kapsül replikalarını yalnızca manuel olarak silindikleri zaman günceller.',
  PARTITION_ORDINAL: 'Kapsül Replikalarını Bölmek için Sıra',
  PARTITION_ORDINAL_DESC:
    'Kapsül replikalarını iki gruba bölmek için sıra tanımla. Statefulset güncellendiğinde, yalnızca sıralaması bu değerden eşit veya büyük olan kapsül replikaları güncellenir.',
  // List > Create > Volume Settings > Volume Templates
  ADD_VOLUME_TEMPLATE_DESC:
    'Kapsülle aynı yaşam döngüsüne sahip bir bölüm bağlamak için bölüm şablonu ekle.',
  STATEFULSETS_ADD_VOLUME_TEMPLATE_DESC: 'Lütfen bir bölüm şablonu ekleyiniz',
  VOLUME_CAPACITY_TCAP: 'Bölüm Kapasitesi',
  MOUNT_PATH: 'Bağlama yolu',
  MOUNT_VOLUME_OR_TEMPLATE: 'Bölüm Şablonu veya Bölüm Bağla',
  VOLUME_TEMPLATES: 'Bölüm Şablonları',
  // List > Create > Advanced Settings
  // List > Create > Cluster Differences
  SERVICE_PORT: 'Servis Portu',
  SERVICE_PORT_VALUE: 'Servis Portu: {value}',
  // List > Create > Cluster Differences (Displayed after you add a volume template)
  VOLUME_TEMPLATE_SETTINGS: 'Bölüm Şablonu Ayarları',
  CLUSTER_VOLUME_DIFF_DESC:
    'Farklı kümelerde farklı depolama ayarları kullanınız.',
}
