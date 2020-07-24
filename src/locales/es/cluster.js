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

export default {
  'Add Cluster': 'Agregar clúster',
  'Add New Cluster': 'Agregar nuevo clúster',
  'All Projects': 'Todos los proyectos',
  'Authorize the cluster to workspace':
    'Autorizar el clúster en el espacio de trabajo',
  Authorized: 'Autorizado',
  'Available Clusters': 'Clusters Disponibles',
  'Choose a provider': 'Elige un proveedor',
  'Click to Copy': 'Haga clic para copiar',
  'Cluster Info': 'Información del clúster',
  'Cluster initialization failed': 'La inicialización del clúster ha fallado',
  'Cluster List': 'Lista de clústeres',
  'Cluster Management': 'Gestión de clúster',
  'Cluster Member': 'Miembro del grupo',
  'Cluster Members': 'Miembros del grupo',
  'Cluster Name': 'Nombre del clúster',
  'Cluster Roles': 'Roles de clúster',
  'Cluster Settings': 'Configuraciones de clúster',
  'Cluster Visibility': 'Visibilidad de clúster',
  'Connection Method': 'Método de conexión',
  'Copy successfully': 'Copia realizada con éxito',
  'Custom Resources': 'Custom Resources',
  'Edit cluster basic information': 'Editar información básica del clúster',
  'Edit Cluster Info': 'Editar información del clúster',
  'Edit Visibility': 'Editar visibilidad',
  'Enter the project': 'Entrar al proyecto',
  'Go back': 'Atrás',
  'Host Cluster': 'Clúster de host',
  'Host Clusters': 'Clústers de host',
  Import: 'Importar',
  'Import Kubernetes Cluster': 'Importar clúster de Kubernetes',
  'Invite members to the cluster': 'Invitar miembros al clúster',
  'IP Ranges': 'Rangos de IP',
  'Kubernetes Settings': 'Configuraciones de Kubernetes',
  'Kubernetes Status': 'Estado de Kubernetes',
  'Kubernetes Version': 'Versión de Kubernetes',
  'Member Cluster': 'Mimbro del clúster',
  'Member Clusters': 'Miembor de los clústers',
  'Network Management': 'Administración de redes',
  'Network Policies': 'Políticas de red',
  'Network Topology': 'Topología de la red',
  'Node Types': 'Tipos de nodos',
  'Nodes Management': 'Gestión de nodos',
  'Not Ready': 'No está listo',
  'Please input cluster name': 'Por favor introduce el nombre del clúster',
  'Please input the kubesphere api server address of the cluster':
    'Introduce la dirección del servidor de la API de Kubesphere del clúster',
  'Please select or input a provider':
    'Por favor selecciona o introduce un proveedor',
  'Please select or input a tag':
    'Por favor selecciona o introduce una etiqueta',
  'Scheduler Scheduling Times': 'Horarios de programación',
  'Scheduling Failed Pods': 'Programar pods fallidos',
  'Select Clusters': 'Seleccionar clústeres',
  'Set as public cluster': 'Establecer como clúster público',
  Snapshots: 'Snapshots',
  'Storage Management': 'Administración de almacenamiento',
  'System Projects': 'Proyectos de Sistema',
  'The current cluster is public': 'El clúster actual es público.',
  Tools: 'Herramientas',
  Unauthorized: 'No autorizado',
  Unbind: 'Desvincular',
  'Unbind Cluster': 'Desvincular clúster',
  'User Projects': 'Proyectos de usuario',
  Validating: 'Validar',
  'Validation failed': 'Validación fallida',
  'Waiting for the cluster to join': 'Esperando a que el clúster se añada',
  NO_CLUSTER_TIP: 'Agregue al menos un clúster.',
  NO_CLUSTER_TIP_DESC:
    'Un clúster es un grupo de nodos (máquinas físicas o virtuales) que ejecutan Kubernetes, y la función de Kubesphere también depende de los nodos en el clúster.',
  ADD_NEW_CLUSTER_DESC: 'Agregar un nuevo clúster de Kubernetes',
  CHOOSE_PROVIDER_DESC:
    'KubeSphere proporciona una solución para implementar rápidamente los clústeres de Kubernetes entre los principales proveedores de servicios.',
  VISIBILITY_PART: 'Parcialmente visible',
  VISIBILITY_PUBLIC: 'Público',
  MULTI_CLUSTER: 'Multi-Clústers',
  IMPORT_CLUSTER_DESC: 'Importar un clúster de Kubernetes existente',
  SELECT_CLUSTERS_DESC:
    'Selecciona el clúster disponible en el espacio de trabajo.',
  CLUSTER_SETTINGS_DESC: 'Definir información de configuración del clúster',
  CLUSTER_TAG: 'Etiqueta',
  CLUSTER_TAG_DESC:
    'Para indicar para qué se utiliza el clúster, como un entorno de producción, un entorno de prueba o un entorno de demostración',
  CLUSTER_PROVIDER_DESC: 'El proveedor de infraestructura de clúster',
  CLUSTER_CONNECT_METHOD_DESC:
    'Conéctese directamente al clúster o use un agente',
  CONNTECT_DIRECT: 'Conexión directa al clúster de Kubernetes',
  CONNTECT_PROXY: 'Agente de conexión de clúster',
  CLUSTER_WAITING_JOIN_DESC:
    'Actualmente no hay nodos disponibles. Puedes agregar el siguiente archivo de configuración para habilitar el clúster.',
  CLUSTER_AGENT_TIP_1:
    'Cree un archivo llamado agent.yaml en el clúster de destino a través de SSH',
  CLUSTER_AGENT_TIP_1_DESC:
    'Por ejemplo, <span class="code">agent.yaml</span> .',
  CLUSTER_AGENT_TIP_2:
    'Copie el siguiente archivo de configuración en agent.yaml',
  CLUSTER_AGENT_TIP_2_DESC:
    'El archivo del agente puedes conectar el clúster de destino a la plataforma.',
  CLUSTER_AGENT_TIP_3:
    'Ejecutar en la línea de comando <span class="code">kubectl create -f agent.yaml</span>',
  CLUSTER_AGENT_TIP_3_DESC:
    'Después de ejecutar el comando, espere la actualización del estado del clúster.',
  CLUSTER_CONDITIONS: 'Condiciones de clúster',
  CLUSTER_BASE_INFO_DESC:
    'Este módulo resume la información básica del clúster actual.',
  INVITE_CLUSTER_MEMBER_DESC:
    'Puedes invitar a nuevos miembros a este clúster.',
  CLUSTER_API_SERVER_TITLE: 'Servidor API Kubesphere para agregar al clúster',
  CLUSTER_API_SERVER_DESC:
    'Debes indicar la dirección del servidor API de KubeSphere para agregarla al clúster',
  INPUT_KUBECONFIG: 'Complete el KubeConfig del clúster de destino',
  CLUSTER_DIRECT_IMPORT_TIP:
    'La interfaz de control de múltiples clústeres de KubeSphere se conecta a los clústeres importados a través del kubeconfig proporcionado. Para este método, el clúster actual debe poder acceder directamente a los clústeres que se importarán a través de la dirección del servidor en kubeconfig. </br></br> Este método generalmente se aplica a las siguientes condiciones: </br> 1. El clúster actual y los clústeres que se importarán están en la misma red interna. </br> 2. La red tanto del clúster actual como de los clústeres que se importarán está conectada a través de VPN u otras tecnologías (por ejemplo, Túneles). </br> 3. Se puedes acceder a la dirección del servidor en kubeconfig a través de la red pública.',
  CLUSTER_AGENT_IMPORT_TIP:
    'La interfaz de control de KubeSphere se conecta a los clústeres que se importarán a través de un proxy. La interfaz de control ejecuta un servicio de proxy público, que está conectado a un componente de cliente creado por clústeres para importar. Por lo tanto, se crea un proxy de reserva. Para este método, la interfaz de control y los clústeres que se van a importar no necesitan estar en la misma red. La dirección de apiserver de los clústeres a importar tampoco necesita exponerse. Sin embargo, el rendimiento de la red puedes verse afectado. </br></br> Este método generalmente se aplica a las siguientes condiciones: </br> 1. El clúster actual y los clústeres que se importarán no están en la misma red. <br/> 2. La red tanto del clúster actual como de los clústeres que se van a importar no se puedes conectar a través de VPN u otras tecnologías (por ejemplo, Túneles). <br/> 3. Se pueden aceptar deficiencias de rendimiento de la red dentro de los clústeres.',
  CLUSTER_AGENT_TITLE:
    'Agregue el clúster en función del agente proporcionado en el clúster.',
  CLUSTER_AGENT_DESC:
    'Se debe establecer un agente correspondiente en el clúster.',
  HOW_TO_GET_KUBECONFIG: '¿Cómo obtener KubeConfig?',
  UNBIND_CLUSTER_DESC:
    'Una vez que el clúster no está vinculado, KubeSphere no podrá administrar el clúster y los recursos de Kubernetes dentro del clúster no se eliminarán.',
  SURE_TO_UNBIND_CLUSTER: 'Sí, confirmo que quiero desvincular el clúster.',
  AUTHORIZE_CLUSTER_TO_WORKSPACE_DESC:
    'Los clústeres se pueden asignar a espacios de trabajo mediante autorización.',
  PUBLIC_CLUSTER_DESC:
    'Un clúster público significa que todos los usuarios de la plataforma pueden acceder al clúster, en el que pueden crear y programar recursos.',
  CLUSTER_AUTHORIZATION_DESC:
    'Los clústeres se pueden asignar a espacios de trabajo mediante autorización.',
  CLUSTER_VISIBILITY_Q1:
    '¿Cómo autorizar clústeres a espacios de trabajo específicos?',
  CLUSTER_VISIBILITY_A1:
    'Puedes autorizar el clúster a diferentes espacios de trabajo haciendo clic en Editar visibilidad.',
  CLUSTER_VISIBILITY_Q2: '¿Qué es un clúster público?',
  CLUSTER_VISIBILITY_A2:
    'Un clúster público significa que todos los usuarios de la plataforma pueden acceder al clúster, en el que pueden crear y programar recursos.',
  SELECT_HOST_CLUSTER_WARNING:
    'Por favor, intenta no crear recursos en el clúster huésped (host) para evitar cargas excesivas, lo que podría llevar a disminuir la estabilidad en todos los clústers.',
  HOST_CLUSTER_VISIBILITY_WARNING:
    'Por favor, ten cuidado al autorizar el clúster huésped (host) en el espcaio de trabajo. Si la carga del clúster es demasiado alta, la estabilidad disminuirá en todos los clústers.',
}
