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
  'Allow Volume Expansion': 'Permitir expansión de volumen',
  'Available Capacity': 'Capacidad disponible',
  'Create Snapshot': 'Crear snapshot',
  'Create Storage Class': 'Crear clase de almacenamiento',
  'Create Volume': 'Crear volumen',
  CREATE_VOLUME_WITH_SNAPSHOT: 'CREATE_VOLUME_WITH_SNAPSHOT',
  'Custom Provisioner': 'Provisioner personalizado',
  Default: 'Predeterminado',
  'Default Storage Class': 'Clase de almacenamiento predeterminada',
  'Default Volume': 'Volumen predeterminado',
  'Delete Volume': 'Eliminar volumen',
  'Disable Volume Snapshot': 'Deshabilitar snapshot de volumen',
  'Apply immediately': 'Efecto inmediato',
  'Enable Volume Snapshot': 'Habilitar snapshot de volumen',
  Expand: 'Expandir',
  'Expand Volume': 'Ampliar volumen',
  Idle: 'En desuso',
  'In Use': 'En uso',
  'Mount Info': 'Información de montaje',
  'Mount Options': 'Opciones de montaje',
  'Mount Status': 'Estado de montaje',
  Mounted: 'Montado',
  'Mounted Pods': 'Pods montados',
  'Not Mounted': 'No montado',
  Parameters: 'Parámetros',
  'Parameters (key-value pairs)': 'Parámetros (pares clave-valor)',
  PersistentVolumeClaim: 'PersistentVolumeClaim',
  PersistentVolumes: 'PersistentVolumes',
  'Reclaim Policy': 'Política de reclamación',
  Scalable: 'Escalable',
  'Set as default storage class':
    'Establecer como clase de almacenamiento predeterminada',
  'Snapshot Message': 'Mensaje de snapshot',
  'Snapshots Message': 'Mensaje de snapshots',
  'Storage Class': 'Clase de almacenamiento',
  'Storage Class Name': 'Nombre de clase de almacenamiento',
  'Storage Class Settings': 'Configuraciones de clase de almacenamiento',
  'storage classes': 'clases de almacenamiento',
  'Storage System': 'Sistema de almacenamiento',
  STORAGE_CLASS_CREATE_DESC: 'STORAGE_CLASS_CREATE_DESC',
  StorageClasses: 'StorageClasses',
  storageclasses: 'storageclasses',
  'Support Volume Snapshot': 'Soporta snapshot de volumen',
  'Supported Access Mode': 'Modo de acceso admitido',
  'Used Capacity': 'Capacidad utilizada',
  'Clone Volume': 'Clon del volumen',
  'Volume Count': 'Recuento de volumen',
  'The volume name exists': 'nombre de volumen existe',
  'The volume size must be greater than zero':
    'The volume size must be greater than zero',
  'Volume Template Settings': 'Volume Template Settings',
  'Volume Usage': 'Uso de volumen',
  VOLUME_DESC:
    'A volume is used for workloads created by users. It represents a resource object for the persistent storage of workloads.',
  VOLUME_SNAPSHOT_STATUS_CREATING: 'Creando',
  VOLUME_SNAPSHOT_STATUS_FAILED: 'Creado sin éxito',
  VOLUME_SNAPSHOT_STATUS_READY: 'Creado con éxito',
  VOLUME_SNAPSHOT_STATUS_DELETING: 'Eliminando',
  volumes: 'volúmenes',
  VolumeSnapshots: 'Volume Snapshots',
  'Storage Classs': 'Clases de almacenamiento',
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
  VOLUME_CREATE_DESC:
    'Un volumen es un PVC (PersistentVolumeClaim) creado mediante el aprovisionamiento ' +
    'de volumen dinámico.',
  VOLUME_SETTINGS_DESC:
    'Complete la capacidad del volumen según sea necesario, y el tamaño del volumen ' +
    'y el modo de acceso deben ser compatibles con la clase de almacenamiento y las capacidades del servidor de almacenamiento. El modo de acceso generalmente se selecciona como RWO.',
  VOLUME_STORAGE_CLASS_DESC:
    'El administrador del clúster configura los parámetros del servidor de ' +
    'almacenamiento y proporciona almacenamiento para el usuario por tipo.',
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
    'Una StorageClass proporciona una forma para que los administradores configuren ' +
    'las "clases" de almacenamiento que ofrecen.',
  'STORAGE-CLASSES_BASEINFO_DESC':
    'El tipo de almacenamiento registra la información de configuración de un cierto tipo de almacenamiento proporcionado por el administrador. Antes de crear un tipo específico de volumen de almacenamiento, se debe configurar el tipo de almacenamiento correspondiente.',
  STORAGE_CLASS_SETTING_DESC:
    'El tipo de almacenamiento registra la información de configuración de un cierto tipo de almacenamiento proporcionado por el administrador. Antes de crear un tipo específico de volumen de almacenamiento, se debe configurar el tipo de almacenamiento correspondiente.',
  STORAGE_CLASS_SET_DEFAULT_DESC:
    'Una vez establecida la clase de almacenamiento predeterminada, el sistema creará volúmenes de esta clase de forma predeterminada si no se agrega ningún requisito especial. Solo se permite una clase de almacenamiento predeterminada en un clúster de Kubernetes.',
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
    'El sistema de almacenamiento debe implementar los plugins de almacenamiento correspondientes para proporcionar servicios.',
  VOLUME_EXPAND_TIPS:
    'El PVC actual se ha montado para la carga de trabajo, por lo que la expansión conllevará un reinicio de la carga de trabajo y a una nueva versión. El servicio puedes sufrir una breve interrupción.',
  QINGCLOUD_CSI_DESC:
    'El plugin QingCloud CSI implementa Container Storage Interface (CSI) de Kubernetes, permitiendo que el container orchestrator (CO) use el almacenamiento de QingCloud. Actualmente, el plugin QingCloud CSI soporta el servicio de almacenamiento de bloques en la plataforma QingCloud. Para obtener información detallada, consulte las <a href="https://github.com/yunify/qingcloud-csi/blob/master/README.md#feature-matrix">características</a> .',
  QINGCLOUD_CSI_TYPE_DESC:
    'En la plataforma de nube pública QingCloud, 0 representa un volumen de alto rendimiento. 2 representa volumen de alta capacidad. 3 representa un volumen súper alto rendimiento. 5 representa Enterprise Server SAN. 100 representa  volumen estándar.',
  CREATE_VOLUME_MAX_SIZE: 'Límite superior de tamaño de volumen',
  CREATE_VOLUME_STEP_SIZE: 'Incremento de tamaño de volumen',
  CREATE_VOLUME_MIN_SIZE: 'Límite inferior de tamaño de volumen',
  VOLUME_FS_TYPE: 'ext3, ext4, xfs',
  GLUSTERFS_RESTURL_DESC:
    'URL de servicio de Heketi que proporciona volúmenes deslumbrantes bajo demanda.',
  GLUSTERFS_ID_DESC: 'ID del Gluster',
  GLUSTERFS_RESTAUTHENABLED_DESC:
    'Habilite la autenticación en el servidor REST.',
  GLUSTERFS_RESTUSER_DESC:
    'El servicio REST de Gluster / usuario de Heketi que tiene acceso para crear volúmenes en el Gluster Trusted Pool.',
  GLUSTERFS_SECRET_NAMESPACE_DESC:
    'Identificación de la instancia secreta que contiene la contraseña de usuario para usar cuando se habla con el servicio REST de Gluster.',
  GLUSTERFS_SECRET_NAME_DESC:
    'Estos parámetros son opcionales; se utilizará una contraseña vacía cuando se omitan secretNamespace y secretName.',
  GLUSTERFS_GID_MIN_DESC:
    'El valor mínimo del rango de GID para la clase de almacenamiento. Se utilizará un valor único (GID) en este rango (gidMin-gidMax) para volúmenes aprovisionados dinámicamente. Estos son valores opcionales.',
  GLUSTERFS_GID_MAX_DESC:
    'El valor máximo del rango de GID para la clase de almacenamiento. Se utilizará un valor único (GID) en este rango (gidMin-gidMax) para volúmenes aprovisionados dinámicamente. Estos son valores opcionales.',
  GLUSTERFS_VOLUME_TYPE_DESC:
    'El tipo de volumen y sus parámetros se pueden configurar con este valor opcional.',
  QINGCLOUD_VOLUME_TAGS_DESC:
    'Los tags se asociarán automáticamente cuando se cree un disco duro. Separe varios tags con comas.',
  CEPHRBD_MONITORS_DESC:
    'Monitores Ceph, delimitados por comas. Este parámetro es obligatorio',
  CEPHRBD_ADMIN_ID_DESC:
    'ID de cliente de Ceph que es capaz de crear imágenes en el pool.',
  CEPHRBD_ADMIN_SECRET_NAME_DESC:
    'El secreto proporcionado debe tener el tipo "kubernetes.io/rbd".',
  CEPHRBD_ADMIN_SECRET_NAMESPACE_DESC: 'El namespace para adminSecretName',
  CEPHRBD_POOL_DESC: 'Ceph RBD pool',
  CEPHRBD_USERID_DESC:
    'ID de cliente Ceph que se utiliza para asignar la imagen RBD. El valor predeterminado es el mismo que adminId.',
  CEPHRBD_USER_SECRET_NAME_DESC:
    'El nombre de Ceph Secret para userId para mapear la imagen RBD',
  CEPHRBD_USER_SECRET_NAMESPACE_DESC: 'El namespace para userSecretName',
  CEPHRBD_FS_TYPE_DESC: 'fsType que es compatible con kubernetes.',
  CEPHRBD_IMAGE_FORMAT_DESC: 'Formato de imagen Ceph RBD, "1" o "2"',
  CEPHRBD_IMAGE_FEATURES_DESC:
    'Este parámetro es opcional y solo debe usarse si configura imageFormat en “2”.',
  DEPENDENT_STORAGE_CLASS_DELETE_TIPS:
    'Compruebe si la clase de almacenamiento está siendo utilizada por otros recursos. Si hay algún recurso dependiente de la clase de almacenamiento, primero debe deshabilitar el recurso.',
  CREATE_VOLUME_BY_STORAGECLASS: 'Crear volumen por clase de almacenamiento',
  CREATE_VOLUME_BY_SNAPSHOT: 'Crear volumen por snapshot',
  SELECT_SNAPSHOT_TO_CREATE_VOLUME: 'Selecciona snapshot para crear volumen.',
  VOLUMESNAPSHOT_DESC:
    'Un snapshot de volumen se refiere a una snapshot de un volumen en un punto de tiempo particular. Se puede utilizar para crear nuevos volúmenes (preestablecer los datos del snapshot) o restaurar un volumen existente a su estado anterior (que se muestra en los snapshots).',
  VOLUMESNAPSHOT_CREATE_DESC:
    'Un snapshot de volumen se refiere a una snapshot de un volumen en un punto de tiempo particular. Se puede utilizar para crear nuevos volúmenes (preestablecer los datos del snapshot) o restaurar un volumen existente a su estado anterior (que se muestra en los snapshots).',
  WHAT_IS_VOLUME_SNAPSHOTS: '¿Qué son los snapshots de volumenes?',

  CLUSTER_VOLUME_DIFF_DESC:
    'You can specify different storage classes for different clusters.',

  VOLUME_MONITORING_TIP:
    'Kubernetes collects volume usage data, excluding data from unmounted volumes. For path-based volumes such as OpenEBS/Local PV and NFS, the data collected may be different from the actual amount. For detailed information, see <a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">volume monitoring data analysis</a>.',
}
