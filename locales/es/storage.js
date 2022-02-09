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
  ACCESS_MODE_RWO: 'Nodo único de lectura y escritura',
  ACCESS_MODE_ROX: 'Multi-nodo de solo lectura',
  ACCESS_MODE_RWX: 'Múlti-nodos de lectura y escritura',
  'Create Storage Class': 'Crear clase de almacenamiento',
  'Create Volume': 'Crear volumen',
  CREATE_VOLUME_WITH_SNAPSHOT: 'CREATE_VOLUME_WITH_SNAPSHOT',
  'Custom Provisioner': 'Provisioner personalizado',
  'Default Storage Class': 'Clase de almacenamiento predeterminada',
  'Default Volume': 'Volumen predeterminado',
  'Delete Volume': 'Eliminar volumen',
  'Disable Volume Snapshot': 'Deshabilitar snapshot de volumen',
  'Apply immediately': 'Efecto inmediato',
  Expand: 'Expandir',
  'Mount Options': 'Opciones de montaje',
  // Volumes List Page
  Parameters: 'Parámetros',
  'Parameters (key-value pairs)': 'Parámetros (pares clave-valor)',
  PersistentVolumeClaim: 'Volume',
  PersistentVolumes: 'PersistentVolumes',
  Scalable: 'Escalable',
  'Snapshot Message': 'Mensaje de snapshot',
  'Snapshots Message': 'Mensaje de snapshots',
  'Set as default storage class': 'Establecer como clase de almacenamiento predeterminada',
  'Storage Class': 'Clase de almacenamiento',
  'Storage Class Name': 'Nombre de clase de almacenamiento',
  'storage classes': 'clases de almacenamiento',
  STORAGE_CLASS_CREATE_DESC: 'STORAGE_CLASS_CREATE_DESC',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  PV: 'Backend de volumen',
  'Bound Volume': 'Límite de volumen de almacenamiento',
  'Used Capacity': 'Capacidad utilizada',
  BACKEND_IDENTIFIER: 'Backend Identifier',
  VOLUMES: 'Volume',
  'The volume name exists': 'nombre de volumen existe',
  'The volume size must be greater than zero': 'The volume size must be greater than zero',
  'Volume Usage': 'Uso de volumen',
  volumes: 'volúmenes',
  VolumeSnapshots: 'Volume Snapshots',
  'Storage Classs': 'Clases de almacenamiento',
  VOLUMES_BASEINFO_DESC: 'The volume can persist data, and its lifecycle is independent of the workload. Make sure the storage class is created before you create a volume.',
  VOLUME_SETTINGS_DESC: 'Fill in the capacity of the volume as needed, and the volume size and access mode must be compatible with the storage class and storage server capabilities. The access mode is usually selected as RWO.',
  PROVISIONER_DESC: 'Proporciona el backend de almacenamiento',
  // Volume Pages
  DELETE_STORAGE_TIP: 'If the storage volume is being mounted, delete it when the workload is deleted.',
  SRORAGE_SETTING_DESC: 'ReadWriteOnce: Single node read and write.<br/>ReadOnlyMany: Multi-node read-only.<br/>ReadWriteMany: Multi-node read and write.<br/>Only one mode can be used when mounting.',
  'STORAGE-CLASSES_BASEINFO_DESC': 'El tipo de almacenamiento registra la información de configuración de un cierto tipo de almacenamiento proporcionado por el administrador. Antes de crear un tipo específico de volumen de almacenamiento, se debe configurar el tipo de almacenamiento correspondiente.',
  STORAGE_CLASS_SETTING_DESC: 'El tipo de almacenamiento registra la información de configuración de un cierto tipo de almacenamiento proporcionado por el administrador. Antes de crear un tipo específico de volumen de almacenamiento, se debe configurar el tipo de almacenamiento correspondiente.',
  STORAGECLASSES_BASEINFO_DESC: 'Una StorageClass proporciona una forma para que los administradores configuren las "clases" de almacenamiento que ofrecen. Las diferentes clases pueden asignarse a niveles de calidad de servicio o a políticas de respaldo o a políticas arbitrarias determinadas por los administradores del clúster. Debes crear una StorageClass antes de que los usuarios puedan crear un volumen (es decir, PVC) basado en StorageClass.',
  STORAGECLASS_PARAMETER_TIP: 'Consulte la <a href="{link}" target="_blank">documentación de Kubernetes</a> para más detalles.',
  VOLUME_BASEINFO_TIP: 'El volumen se aprovisiona a través del aprovisionamiento de volumen dinámico que permite crear volúmenes de almacenamiento bajo demanda. El volumen se usa para datos persistentes y tiene un ciclo de vida explícito independiente de cualquier pod individual que lo use. Al menos, los administradores deben configurar una StorageClass antes de crear un volumen.',
  VOLUME_EXPAND_TIPS: 'El PVC actual se ha montado para la carga de trabajo, por lo que la expansión conllevará un reinicio de la carga de trabajo y a una nueva versión. El servicio puedes sufrir una breve interrupción.',
  DEPENDENT_STORAGE_CLASS_DELETE_TIPS: 'Make sure if there are resources dependent on the storage class. If there are, you need to disable the resources before it the resource functions are affected.',
  WHAT_IS_VOLUME_SNAPSHOTS: '¿Qué son los snapshots de volumenes?'
};