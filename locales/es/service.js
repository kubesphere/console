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
  ' has no corresponding workload.':
    'no tiene carga de trabajo correspondiente.',
  'Access Method': 'Método de acceso',
  'Access Type': 'Tipo de acceso',
  'Add Route Rule': 'Agregar regla de ruta',
  'Add Selector': 'Agregar selector',
  'Associated Application': 'Solicitud asociada',
  Auto: 'Auto',
  'Automatically assign Service IP':
    'Asigna automáticamente una IP de servicio',
  'Commonly included tags in the current workloads':
    'Etiquetas comúnmente incluidas en las cargas de trabajo actuales',
  'Container Port': 'Puerto de contenedores',
  'Create Service': 'Crear servicio',
  'Create service by specifying workloads':
    'Crear servicio especificando carga de trabajo',
  'Create service by Yaml': 'Crear servicio por Yaml',
  Creating: 'Creando',
  'Creation failed, please delete and try again':
    'Creación fallida, por favor, elimínela e intente de nuevo',
  'Custom Creation': 'Creacion personalizada',
  'Delete Service': 'Eliminar servicio',
  'Do not assign Service IP': 'No asignar IP de servicio',
  'Edit Internet Access': 'Editar acceso a Internet',
  'Edit Service': 'Servicio de edición',
  'Enable Sticky Session': 'Habilitar Sticky Session',
  'External Address': 'Dirección Externa',
  'External Service': 'Servicio externo',
  'Internal access': 'Acceso interno',
  'Invalid port': 'Puerto inválido',
  'Language Type': 'Tipo de idioma',
  'LoadBalancer IP': 'IP del balanceador',
  'Map Services outside the cluster': 'Servicios de mapas fuera del clúster',
  'Maximum Session Sticky Time (s)': 'Tiempo máximo de sesión (s)',
  'No related resources found with current service(s)':
    'No se encontraron recursos relacionados con los servicios actuales',
  'Node Port': 'Puerto de nodo',
  'Node Port(s)': 'Puerto(s) de nodo',
  'Not Associate': 'No asociado',
  'Path is Required': 'La ruta es obligatoria',
  'Please input ExternalName': 'Por favor introduce el ExternalName',
  'Please input ports': 'Por favor introduce puertos',
  'Please input selectors that have corresponding workloads':
    'Introduce los selectores que tienen las cargas de trabajo correspondientes',
  'Please input service name': 'Por favor introduce el nombre del servicio',
  'Please input valid Selector': 'Por favor introduce un selector válido',
  'Please select a workload': 'Por favor selecciona una carga de trabajo',
  'Please select Service': 'Por favor selecciona Servicio',
  Ports: 'Puertos',
  routes: 'rutas',
  Selector: 'Selector',
  selector: 'selector',
  'Service Access': 'Acceso al servicio',
  'Service Mesh': 'Malla de servicio',
  'Service Name': 'Nombre del Servicio',
  'Service Port': 'Puerto de servicio',
  'Service Type': 'Tipo de servicio',
  services: 'servicios',
  'Simple Service': 'Servicio simple',
  'Specify Workload': 'Especificar carga de trabajo',
  'Specify Node': 'Especificar nó',
  'Specify Workloads': 'Especificar cargas de trabajo',
  'Stateful Service': 'Stateful Service',
  'Stateless Service': 'Stateless Service',
  'Sure to delete the service(s)?':
    '¿Seguro que quiere eliminar los servicios?',
  'Target Port': 'Puerto destino',
  'The current selector': 'El selector actual',
  'The maximum session sticky time is 10800s (3 hours).':
    'El tiempo de máximo de la sesión es de 10800 s (3 horas).',
  'Virtual IP': 'IP virtual',
  SERVICE_EXTERNAL_NAME_DESC:
    'Asigne el servicio al contenido del campo externalName devolviendo un registro CNAME con su valor.',
  TOTAL_WORKLOAD: '{count} cargas de trabajo en total',
  SERVICE_SELECTOR_AFFECT_1: '',
  SERVICE_SELECTOR_AFFECT_2: 'afectar las workload de {count}',
  SERVICE_NAME_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de caracteres se establece en 63.',
  SERVICE_DESC:
    'Un servicio es una abstracción que define una colección lógica de Pods y una estrategia para acceder a ellos.',
  SERVICE_CREATE_DESC:
    'Un servicio es una abstracción que define una colección lógica de Pods y una estrategia para acceder a ellos. Puedes seleccionar el tipo de servicio o cómo se crea un servicio. KubeSphere admite servicios con y sin estado y los servicios se pueden crear a través de códigos o artefactos.',
  SERVICES_BASEINFO_DESC:
    'El nombre y la descripción del servicio deben proporcionarse para crear el servicio. El nombre del servicio no puedes ser el mismo que el nombre del servicio existente en el mismo proyecto.',
  SERVICES_SETTINGS_DESC:
    'La configuración del servicio define cómo acceder a una carga de trabajo existente.',
  SERVICES_INTERNET_ACCESS_DESC: 'Exponga el servicio fuera del clúster.',
  VIRTUAL_IP_TITLE:
    'IP virtual: acceda al servicio a través de la IP interna del clúster',
  VIRTUAL_IP_DESC:
    'Basado en la IP única generada por el clúster. La IP se puedes usar para acceder al servicio dentro del clúster.',
  HEADLESS_SELECTOR_TITLE:
    'Sin cabecera (selector): acceso directo al servicio a través de la IP del punto final del servicio dentro del clúster',
  HEADLESS_SELECTOR_DESC:
    'El clúster no creará una IP para el servicio. En cambio, los clientes dentro del clúster acceden directamente a través de sus puntos finales. Por ejemplo, servicios que necesitan distinguir maestro de esclavo.',
  HEADLESS_EXTERNAL_NAME_TITLE:
    'Sin cabecera (nombre externo): direcciones de mapas fuera del clúster para visitar',
  HEADLESS_EXTERNAL_NAME_DESC:
    'Asigne servicios externos a un clúster o proyecto.',
  ACCESS_NONE_TIP: 'Hacer el servicio accesible solo internamente',
  ACCESS_NODEPORT_TIP:
    'Exponga el servicio en la IP de cada nodo en un puerto estático',
  ACCESS_LOADBALANCER_TIP:
    'Exponga el servicio externamente utilizando el balanceador de carga del proveedor en la nube',
  SERVICE_NODE_PORT_DESC:
    'Si su red actual está en la misma red que el nodo del clúster, puedes acceder a ella a través de la dirección IP del clúster + número de puerto del nodo o a través del puerto del nodo IP + nodo.',
  SERVICE_TYPE: 'Puedes crear un servicio sin estado o un servicio con estado.',
  SERVICE_TYPES_Q: 'Tipos de servicio',
  SERVICE_TYPES_A:
    'El servicio se divide en un servicio sin estado (Servicio virtual + Depolyment) y un servicio con estado (Servicio sin cabeza + Statefulset). En un servicio sin estado, las réplicas pueden compartir un volumen, y un servicio con estado debe tener su propio volumen independiente.',
  SCENARIOS_FOR_SERVICES_Q:
    '¿Cuáles son los escenarios de aplicación para servicios sin estado y servicios con estado?',
  SCENARIOS_FOR_SERVICES_A:
    'Los servicios sin estado son útiles para escenarios en los que los datos persistentes no se almacenan localmente y varias instancias responden a solicitudes uniformes (Nginx, Tomcat, etc.). Los servicios con estado son útiles cuando se trata de almacenamiento de datos, subprocesos múltiples o colas (base de datos MySQL, Kafka, Zookeeper, etc.).',
  SERVICE_SIMPLE_DESC:
    'Crear un servicio a partir de un grupo de pods existente',
  DELETE_SERVICE_DESC:
    'Está a punto de eliminar los servicios {resource}. ¿Confirma si desea eliminar el recurso asociado?',
  SERVICE_FROM_CODE:
    'Cree un nuevo servicio desde el repositorio de código fuente',
  SERVICE_FROM_ARTIFACTS: 'Construye un nuevo servicio a través del artefacto',
  SERVICE_FROM_CODE_DESC:
    'Puedes construir su código existente en una imagen e implementarlo a través de Source to Image.',
  SERVICE_FROM_ARTIFACTS_DESC:
    'Puedes construir un artefacto existente en una nueva imagen y completar despliegue.',
  SERVICE_CUSTOM_CREATE:
    'Puedes crear un servicio ya sea especificando una carga de trabajo o editando la configuración (Yaml).',
  SERVICE_TYPE_STATEFULSERVICE: 'Servicio de estado',
  SERVICE_TYPE_STATELESSSERVICE: 'Servicio sin estado',
  SERVICE_TYPE_EXTERNALSERVICE: 'Servicio externo',
  STATEFUL_SERVICE_DESC:
    'Los servicios con estado o stateful se usan para administrar aplicaciones con estado, asegurando un despliegue y escala ordenada y elegante. También proporcionan almacenamiento persistente estable e identificadores de red.',
  STATELESS_SERVICE_DESC:
    'El servicio más utilizado en servicios de contenedores. Define la plantilla del Pod para controlar el estado del Pod, incluidas las actualizaciones continuas y los retrocesos.',
  SERVISE_SIMPLE_DESC: 'Crea un servicio con Pods existentes.',
  SERVICE_PORTS_DESC:
    'Configure el puerto para exponer la imagen del contenedor y el puerto de servicio.',
  SPECIFY_WORKLOAD_DESC:
    'Especifique una carga de trabajo que debe asociarse con el servicio.',

  SPECIFY_NODE_DESC: 'Especifique um nó que precisa ser associado ao serviço.',

  EIP_POOL_DESC: 'Método de acceso dentro del clúster (DNS)',
}
