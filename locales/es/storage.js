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
  VOLUME_EXPANSION: 'Volume Expansion',
  AVAILABLE_CAPACITY: 'Capacidad disponible',
  CREATE_SNAPSHOT: 'Crear snapshot',
  'Create Storage Class': 'Crear clase de almacenamiento',
  'Create Volume': 'Crear volumen',
  CREATE_VOLUME_WITH_SNAPSHOT: 'CREATE_VOLUME_WITH_SNAPSHOT',
  'Custom Provisioner': 'Provisioner personalizado',
  DEFAULT: 'Predeterminado',
  'Default Storage Class': 'Clase de almacenamiento predeterminada',
  'Default Volume': 'Volumen predeterminado',
  'Delete Volume': 'Eliminar volumen',
  'Disable Volume Snapshot': 'Deshabilitar snapshot de volumen',
  'Apply immediately': 'Efecto inmediato',
  'Enable Volume Snapshot': 'Habilitar snapshot de volumen',
  Expand: 'Expandir',
  EXPAND_VOLUME: 'Ampliar volumen',
  EXPAND: 'Expand',
  AVAILABLE: 'En desuso',
  IN_USER: 'En uso',
  MOUNT_INFORMATION: 'Información de montaje',
  'Mount Options': 'Opciones de montaje',
  'Mount Status': 'Estado de montaje',
  // Volumes List Page
  MOUNT_STATUS: 'Montar',
  MOUNTED: 'Montado',
  MOUNTED_PODS: 'Pods montados',
  NOT_MOUNTED: 'No montado',
  Parameters: 'Parámetros',
  'Parameters (key-value pairs)': 'Parámetros (pares clave-valor)',
  PersistentVolumeClaim: 'Volume',
  PersistentVolumes: 'PersistentVolumes',
  RECLAIM_POLICY: 'Reclaim Policy',
  CREATE: 'Create',
  UPDATE: 'Update',
  Scalable: 'Escalable',
  SET_AS_DEFAULT_STORAGE_CLASS: 'Set as Default Storage Class',
  'Snapshot Message': 'Mensaje de snapshot',
  'Snapshots Message': 'Mensaje de snapshots',
  'Set as default storage class':
    'Establecer como clase de almacenamiento predeterminada',
  SNAPSHOT_PL: 'Snapshots',
  'Storage Class': 'Clase de almacenamiento',
  STORAGE_CLASS: 'Clase de almacenamiento',
  STORAGE_CLASS_PL: 'Storage Classes',
  STORAGE_CLASS_LOW: 'storage class',
  STORAGE_CLASS_EMPTY_DESC: 'Please create a storage class.',
  STORAGE_CLASS_VALUE: 'Storage class: {value}',
  'Storage Class Name': 'Nombre de clase de almacenamiento',
  STORAGE_CLASS_SETTINGS: 'Configuraciones de clase de almacenamiento',
  'storage classes': 'clases de almacenamiento',
  STORAGE_SYSTEM: 'Sistema de almacenamiento',
  STORAGE_CLASS_CREATE_DESC: 'STORAGE_CLASS_CREATE_DESC',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  ALLOW_VOLUME_SNAPSHOT:
    'Permitir el almacenamiento de instantáneas de volumen',
  ALLOW_VOLUME_CLONE: 'Permitir la clonación del volumen de almacenamiento',
  ALLOW_VOLUME_EXPANSION: 'Permitir la expansión del volumen de almacenamiento',
  PV: 'Backend de volumen',
  VOLUME_BACKEND_TCAP: 'Backend de volumen',
  PV_STATUS_AVAILABLE: 'Disponible',
  PV_STATUS_BOUND: 'Ligado',
  PV_STATUS_RELEASED: 'Liberado',
  PV_STATUS_FAILED: 'indisponible',
  'Bound Volume': 'Límite de volumen de almacenamiento',
  RECYCLING_STRATEGY: 'Mecanismo de reciclaje',
  ACCESS_MODE: 'Modo de acceso admitido',
  ACCESS_MODE_SCAP: 'Modo de acceso admitido',
  'Used Capacity': 'Capacidad utilizada',
  CLONE_VOLUME: 'Clon del volumen',
  CLONE: 'Clone',
  VOLUME: 'Volumen',
  BACKEND_IDENTIFIER: 'Backend Identifier',
  VOLUMES: 'Volume',
  VOLUME_PL: 'Recuento de volumen',
  NUMBER_OF_VOLUMES: 'Number of volumes',
  VOLUME_LOW: 'volume',
  VOLUME_INSTANCE: 'Volume Instance',
  VOLUME_INSTANCE_PL: 'Volume Instances',
  VOLUME_INSTANCE_LOW: 'volume instance',
  VOLUME_INSTANCE_EMPTY_DESC: 'Please bind a volume to a workload.',
  'The volume name exists': 'nombre de volumen existe',
  VOLUME_SIZE_TIP: 'The volume capacity must be greater than 0.',
  VOLUME_NAME_EXIST: 'nombre de volumen existe',
  'The volume size must be greater than zero':
    'The volume size must be greater than zero',
  VOLUME_TEMPLATE_SETTINGS: 'Volume Template Settings',
  'Volume Usage': 'Uso de volumen',
  VOLUME_DESC:
    'A volume is used for workloads created by users. It represents a resource object for the data persistence of workloads.',
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Creando',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Creado sin éxito',
  VOLUME_SNAPSHOT_STATUS_READY: 'Creado con éxito',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Eliminando',
  volumes: 'volúmenes',
  VolumeSnapshots: 'Volume Snapshots',
  'Storage Classs': 'Clases de almacenamiento',
  // Volume Pages
  ACCESS_MODE_TCAP: 'Modo de acceso',
  ACCESS_MODE_RWO: 'Nodo único de lectura y escritura',
  ACCESS_MODE_ROX: 'Multi-nodo de solo lectura',
  ACCESS_MODE_RWX: 'Múlti-nodos de lectura y escritura',
  VOLUME_STATUS_BOUND: 'Enlazado',
  VOLUME_STATUS_LOST: 'Perdido',
  VOLUME_STATUS_PENDING: 'Pendiente',
  VOLUME_STATUS_TERMINATING: 'Terminando',
  VOLUME_STATUS_UPDATING: 'Actualizando',
  VOLUME_CONDITION_FILESYSTEMRESIZEPENDING: 'Expandiendo disco',
  VOLUMES_BASEINFO_DESC:
    'El volumen puede conservar datos y su ciclo de vida es independiente de la ' +
    'carga de trabajo. Asegúrese de que la clase de almacenamiento se cree antes de crear un volumen.',
  VOLUME_EMPTY_DESC:
    'Un volumen es un PVC (PersistentVolumeClaim) creado mediante el aprovisionamiento ' +
    'de volumen dinámico.',
  VOLUME_SETTINGS_DESC:
    'Complete la capacidad del volumen según sea necesario, y el tamaño del volumen ' +
    'y el modo de acceso deben ser compatibles con la clase de almacenamiento y las capacidades del servidor de almacenamiento. El modo de acceso generalmente se selecciona como RWO.',
  VOLUME_STORAGE_CLASS_DESC:
    'Selecciona clase de almacenamiento para crear un tipo específico de volumen.',
  PROVISIONER_DESC: 'Proporciona el backend de almacenamiento',
  ACCESS_MODES_DESC:
    'Selecciona el modo de acceso compatible con la clase de almacenamiento.',
  DELETE_STORAGE_TIP:
    'Si se está montando el volumen de almacenamiento, elimínelo cuando se elimine la ' +
    'carga de trabajo.',
  SRORAGE_SETTING_DESC:
    'ReadWriteOnce: lectura y escritura de un solo nodo. <br/> ReadOnlyMany: ' +
    'Multi-nodo de solo lectura. <br/> ReadWriteMany: lectura y escritura de ' +
    'múlti-nodos. <br/> Solo se puede usar un modo al montar.',
  STORAGE_CLASS_DESC:
    'Storage classes support dynamic volume provisioning, allowing administrators to create new storage volumes on demand.' +
    'las "clases" de almacenamiento que ofrecen.',
  'STORAGE-CLASSES_BASEINFO_DESC':
    'El tipo de almacenamiento registra la información de configuración de un cierto tipo de almacenamiento proporcionado por el administrador. Antes de crear un tipo específico de volumen de almacenamiento, se debe configurar el tipo de almacenamiento correspondiente.',
  STORAGE_CLASS_SETTING_DESC:
    'El tipo de almacenamiento registra la información de configuración de un cierto tipo de almacenamiento proporcionado por el administrador. Antes de crear un tipo específico de volumen de almacenamiento, se debe configurar el tipo de almacenamiento correspondiente.',
  STORAGE_CLASS_SET_DEFAULT_DESC:
    'Una vez establecida la clase de almacenamiento predeterminada, el sistema creará volúmenes de esta clase de forma predeterminada si no se agrega ningún requisito especial. Solo se permite una clase de almacenamiento predeterminada en un clúster de KubeSphere.',
  STORAGECLASSES_BASEINFO_DESC:
    'Una StorageClass proporciona una forma para que los administradores configuren las "clases" de almacenamiento que ofrecen. Las diferentes clases pueden asignarse a niveles de calidad de servicio o a políticas de respaldo o a políticas arbitrarias determinadas por los administradores del clúster. Debes crear una StorageClass antes de que los usuarios puedan crear un volumen (es decir, PVC) basado en StorageClass.',
  STORAGECLASS_PARAMETER_TIP:
    'Consulte la <a href="{link}" target="_blank">documentación de Kubernetes</a> para más detalles.',
  VOLUME_BASEINFO_TIP:
    'El volumen se aprovisiona a través del aprovisionamiento de volumen dinámico que permite crear volúmenes de almacenamiento bajo demanda. El volumen se usa para datos persistentes y tiene un ciclo de vida explícito independiente de cualquier pod individual que lo use. Al menos, los administradores deben configurar una StorageClass antes de crear un volumen.',
  WHAT_IS_STORAGE_CLASS_Q: '¿Qué es una clase de almacenamiento?',
  WHAT_IS_STORAGE_CLASS_A:
    'El administrador del clúster configura la clase de almacenamiento para configurar los parámetros del servidor de almacenamiento y proporcionar almacenamiento para los usuarios del clúster por clase.',
  WHAT_IS_LOCAL_VOLUME_Q: '¿Qué es un volumen local?',
  WHAT_IS_LOCAL_VOLUME_A:
    'Un volumen local es un dispositivo de almacenamiento local montado, como un disco, partición o directorio.',
  CHOOSE_STORAGE_SYSTEM_TIP: 'Elija el sistema de almacenamiento que necesita',
  PROVISIONER_DEPENDENCE_DESC:
    'You need to deploy a plugin in your storage system before it provides services.',
  VOLUME_EXPAND_TIPS:
    'El PVC actual se ha montado para la carga de trabajo, por lo que la expansión conllevará un reinicio de la carga de trabajo y a una nueva versión. El servicio puedes sufrir una breve interrupción.',
  QINGCLOUD_CSI_DESC:
    'Use QingCloud CSI as the underlying storage plugin. <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">Learn More</a>',
  QINGCLOUD_CSI_TYPE_DESC:
    'En la plataforma de nube pública QingCloud, 0 representa un volumen de alto rendimiento. 2 representa volumen de alta capacidad. 3 representa un volumen súper alto rendimiento. 5 representa Enterprise Server SAN. 100 representa  volumen estándar.',
  CREATE_VOLUME_MAX_SIZE: 'Maximum size of the volume.',
  CREATE_VOLUME_STEP_SIZE: 'Step size of the volume.',
  CREATE_VOLUME_MIN_SIZE: 'Minimum size of the volume.',
  VOLUME_FS_TYPE: 'Supports ext3, ext4, and XFS. The default type is ext4.',
  MAXSIZE: 'Maximum Size',
  MINSIZE: 'Minimum Size',
  STEPSIZE: 'Step Size',
  FSTYPE: 'File System Type',
  TAGS: 'Tag',
  GLUSTERFS_RESTURL_DESC:
    'Heketi REST URL that provisions volumes, for example, <Heketi Service cluster IP Address>:<Heketi Service port number>.',
  GLUSTERFS_ID_DESC: 'Gluster cluster ID.',
  GLUSTERFS_RESTAUTHENABLED_DESC:
    'Habilite la autenticación en el servidor REST.',
  GLUSTERFS_RESTUSER_DESC:
    'Username of Gluster REST service or Heketi service.',
  GLUSTERFS_SECRET_NAMESPACE_DESC: 'Namespace of the Heketi user secret.',
  GLUSTERFS_SECRET_NAME_DESC: 'Name of the Heketi user secret.',
  GLUSTERFS_GID_MIN_DESC: 'Minimum GID of the volume.',
  GLUSTERFS_GID_MAX_DESC: 'Maximum GID of the volume.',
  GLUSTERFS_VOLUME_TYPE_DESC:
    'Type of volume. The value can be none, replicate:<Replicate count>, or disperse:<Data>:<Redundancy count>. If the volume type is not set, the default volume type is replicate:3.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Add tags to the storage volume. Use commas to separate multiple tags.',
  CEPHRBD_MONITORS_DESC: 'IP address of Ceph monitors.',
  CEPHRBD_ADMIN_ID_DESC:
    'ID de cliente de Ceph que es capaz de crear imágenes en el pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC: 'Secret name of adminid.',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'El namespace para adminSecretName',
  CEPHRBD_POOL_DESC: 'Name of the Ceph RBD pool.',
  CEPHRBD_USERID_DESC:
    'ID de cliente Ceph que se utiliza para asignar la imagen RBD. El valor predeterminado es el mismo que adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC:
    'El nombre de Ceph Secret para userId para mapear la imagen RBD',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'El namespace para userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'File system type of the storage volume.',
  CEPHRBD_IMAGE_FORMAT_DESC:
    'Option of the Ceph volume. The value can be "1" or "2". imageFeatures needs to be filled when you set imageFormat to "2".',
  CEPHRBD_IMAGE_FEATURES_DESC:
    'Additional function of the Ceph cluster. The value should only be set when you set imageFormat to "2".',
  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    'Make sure if there are resources dependent on the storage class. If there are, you need to disable the resources before it the resource functions are affected.',
  CREATE_VOLUME_BY_STORAGE_CLASS: 'Crear volumen por clase de almacenamiento',
  CREATE_VOLUME_BY_SNAPSHOT: 'Crear volumen por snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Selecciona snapshot para crear volumen.',
  SELECT_STORAGE_CLASS_CREATE_VOLUME:
    'Seleccione una clase de almacenamiento para crear un volumen.',
  VOLUME_SNAPSHOT_DESC:
    'Un snapshot de volumen se refiere a una snapshot de un volumen en un punto de tiempo particular. Se puede utilizar para crear nuevos volúmenes (preestablecer los datos del snapshot) o restaurar un volumen existente a su estado anterior (que se muestra en los snapshots).',
  VOLUME_SNAPSHOT_EMPTY_DESC:
    'Un snapshot de volumen se refiere a una snapshot de un volumen en un punto de tiempo particular. Se puede utilizar para crear nuevos volúmenes (preestablecer los datos del snapshot) o restaurar un volumen existente a su estado anterior (que se muestra en los snapshots).',
  WHAT_IS_VOLUME_SNAPSHOTS: '¿Qué son los snapshots de volumenes?',

  CLUSTER_VOLUME_DIFF_DESC:
    'You can specify different storage classes for different clusters.',

  VOLUME_MONITORING_TIP:
    'KubeSphere collects volume usage data, excluding data from unmounted volumes. For path-based volumes such as OpenEBS/Local PV and NFS, the data collected may be different from the actual amount. For detailed information, see <a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">volume monitoring data analysis</a>.',

  // Storage Class > GlusterFS
  RESTURL: 'REST URL',
  CLUSTER_ID: 'Cluster ID',
  REST_AUTH_ENABLED: 'REST Authentication',
  REST_USER: 'REST User',
  VOLUME_TYPE: 'Volume Type',
  SECRET_NAME: 'Secret Name',
  REST_AUTH_TRUE: 'True',
  CEPH_MONITOR_IP: 'IP address and port number',
  SECRET_NAMESPACE: 'Secret Namespace',
  GID_MIN: 'Minimum GID',
  GID_MAX: 'Maximum GID',
  CUSTOM: 'Custom',
  PARAMETERS: 'Parameters',
  VOLUME_SNAPSHOT_CLASS: 'Tipo de instantánea',
  SNAPSHOT_EMPTY_TIP: 'Seleccione un tipo de instantánea.',
  VOLUME_BINDING_MODE: 'Volume Binding Mode',
  IMMEDIATE_BINDING: 'Immediate binding',
  BINDING_WAIT: 'Delayed binding',
  DEFAULT_STORAGE_CLASS: 'Default Storage Class',

  // Storage Class > Detail
  STORAGE_CLASS_SCAP: 'Storage class',
  CREATE_VOLUME: 'Create Volume',
  VOLUME_MANAGEMENT: 'Volume Management',
  SET_DEFAULT_STORAGE_CLASS_TITLE: 'Set as Default Storage Class',
  VOLUME_COUNT: 'Volumes',
}
