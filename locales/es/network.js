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
  'Add Allowlist': 'Agregar lista de permitidos',
  'Create Network Policy': 'Crear política de red',
  Direction: 'Dirección',
  Egress: 'Salida',
  Ingress: 'Entrada',
  'Network Isolation': 'Aislamiento de red',
  'Network Policies': 'Políticas de red',
  'Network Policy': 'Política de red',
  'Traffic Egress': 'Salida de tráfico',
  'Traffic Ingress': 'Entrada de Tráfico',
  'Network Policys': 'Políticas de red',
  NETWORK_POLICY_DESC:
    'La configuración de la política de red permite el aislamiento de la red dentro del mismo clúster, lo que significa que se pueden configurar cortafuegos entre ciertas instancias (Pods).',
  NETWORK_ISOLATION_DESC:
    'Al configurar el aislamiento de la red para controlar el tráfico entre Pods dentro del mismo clúster y el tráfico del exterior, las aplicaciones se aíslan y se mejora la seguridad.',
  NETWORK_POLICY_Q: '¿Cómo usar mejor una política de red?',
  NETWORK_ISOLATION_Q: '¿Cómo usar mejor el aislamiento de red?',
  NETWORK_POLICY_A:
    'Hemos compilado varios escenarios de aplicación comunes basados en los escenarios reales, y puedes consultar la documentación para obtener más información.',
  NETWORK_POLICY_Q1: 'Requisito para implementar una política de red',
  NETWORK_ISOLATION_Q1: 'Requisito para implementar un aislamiento de red',
  NETWORK_POLICY_A1:
    'Asegúrate de que el plugin de red (CNI) utilizado por el clúster sea compatible con <a href="https://kubernetes.io/docs/concepts/services-networking/network-policies/" target="_blank">NetworkPolicy</a>. Existen varios plugins de red (CNI) que soportan NetworkPolicy, incluyendo Calico, Cilium, Kube-router, Romana y Weave Net.',
  NETWORK_POLICY_EMP_TITLE: 'Aislamiento de red del proyecto no habilitado',
  NETWORK_POLICY_EMP_DESC:
    'Otros proyectos en el clúster pueden acceder al proyecto actual según la configuración del espacio de trabajo. Una vez que el aislamiento de la red está habilitado para el proyecto, otros proyectos no podrán acceder a él, mientras que aún puedes personalizar proyectos específicos, servicios o direcciones externas que se pueden liberar de esta restricción.',
  NETWORK_POLICY_STATUS: 'Aislamiento de red de proyecto',
  NETWORK_POLICY_R_DESC1:
    'Puedes configurar el acceso a los siguientes recursos (que coincidan con cualquiera de las siguientes políticas)',
  NETWORK_POLICY_R_DESC2:
    'Se puede permitir que los siguientes recursos accedan al proyecto actual (que coincidan con cualquiera de las siguientes políticas)',
  NETWORK_POLICY_R1_TITLE: 'Lista de permisos interna del clúster',
  NETWORK_POLICY_R1_DESC: 'Permitir acceso a servicios dentro del clúster',
  NETWORK_POLICY_R1_DESC1:
    'Selecciona un proyecto o servicio específico como miembro de la lista de permisos para que estos recursos puedan acceder al proyecto actual.',
  NETWORK_POLICY_R2_TITLE: 'Dirección IP externa del clúster',
  NETWORK_POLICY_R2_DESC:
    'Permitir acceso para rango de IPs (CIDR) externo al clúster',
  NETWORK_POLICY_R2_DESC1:
    'Selecciona un rango específico de IPs (CIDR) como origen de entrada o destino de salida.',
  NETWORK_POLICY_D_DESC:
    'Haz coincidir el tráfico de salida y el tráfico de entrada',
  NETWORK_POLICY_D_DESC2:
    'rango de IPs (CIDR) es una cadena que representa un bloque de IPs válido, como "192.168.1.1/24".',
  NETWORK_POLICY_D_OP1: 'Salida',
  NETWORK_POLICY_D_OP2: 'Entrada',
  NETWORK_POLICY_CREATE_DESC:
    'La política de red está configurada para permitir el aislamiento de la red dentro del mismo clúster, es decir, la capacidad de construir un cortafuegos entre ciertas instancias (pods).',
  CIDR_DESC: 'Basado en la dirección del tráfico',
  NETWORK_POLICY_MODAL_DIRECT: 'Por favor, selecciona la dirección de la regla',
  NETWORK_POLICY_MODAL_CIDRERR: 'Please fill in the CIDR information correctly',
  NETWORK_POLICY_MODAL_PORTERR: 'Please fill in the port correctly',
  NETWORK_POLICY_MODAL_EMPDIR: 'The direction is required',
  NETWORK_POLICY_MODAL_EMPTP: 'The project or service is required',
}
