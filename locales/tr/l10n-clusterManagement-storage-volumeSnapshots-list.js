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
  VOLUME_SNAPSHOT_DESC:
    'Birim anlık görüntüsü, bir birimin belirli bir zaman noktasındaki kopyasıdır. Anlık görüntü tarafından önceden doldurulmuş verilerle yeni bir birim sağlamak veya bir birimi anlık görüntü tarafından yakalanan önceki durumuna geri yüklemek için kullanılabilir.',
  VOLUME_SNAPSHOT_PL: 'Birim Anlık Görüntüsü',
  VOLUME_SNAPSHOT_CONTENT_PL: 'Birim Anlık Görüntü İçeriği',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_Q: 'Anlık görüntü sınıfı nedir?',
  WHAT_IS_VOLUME_SNAPSHOT_CLASS_A:
    "VolumeSnapshotClass, bir VolumeSnapshot'a ait farklı özniteliklerin belirtilmesine izin verir. Bu özellikler, bir depolama sisteminin aynı biriminden alınan anlık görüntüler arasında farklılık gösterebilir ve bu nedenle PersistentVolumeClaim ile aynı StorageClass kullanılarak temsil edilemez.",
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_Q: 'Birim anlık görüntü içeriği nedir?',
  WHAT_IS_VOLUME_SNAPSHOT_CONTENT_A:
    'VolumeSnapshotContent, yönetici tarafından sağlanan kümedeki bir birimden alınan bir anlık görüntüdür. Kalıcı birim kümedeki bir kaynak olduğu gibi kümedeki bir kaynaktır.',
  SELECT_A_VOLUME_DESC: 'Anlık görüntü oluşturmak için bir Birim seçin.',
  SELECT_VOLUME_SNAPSHOT_CLASS_DESC:
    'Belirli bir türde anlık görüntü oluşturmak için bir anlık görüntü sınıfı seçin.',
  // List
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Oluşturuluyor',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Oluşturulamadı',
  VOLUME_SNAPSHOT_STATUS_READY: 'Başarıyla oluşturuldu',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Siliniyor',
  CREATE_STATUS_SUCCESS: 'Başarıyla oluşturuldu',
  CREATE_STATUS_UPDATING: 'Oluşturuluyor',
  CREATE_STATUS_FAILED: 'Oluşturulamadı',
  CREATE_STATUS_DELETING: 'Siliniyor',
  // List > Delete
  VOLUME_SNAPSHOT_LOW: 'birim Anlık Görüntüsü',
  // List > Create
  STORAGECLASS_NOT_ALLOW_CREATE_SNAPSHOT:
    'Bu depolama biriminin ait olduğu depolama türü, anlık görüntülerin oluşturulmasına izin vermiyor, lütfen yeniden seçin.',
}
