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
  connected: 'conectado',
  Copy: 'Copiar',
  'Copy Successfully': 'Copia con éxito',
  Disconnect: 'Desconectar',
  disconnected: 'desconectado',
  'Download File': 'Descargar archivo',
  'Kubeconfig File': 'Archivo kubeconfig',
  'KubeSphere Terminal': 'Terminal KubeSphere',
  'Launch kubectl': 'Lanzar kubectl',
  'Put this into': 'Poner esto en',

  KUBECONFIG_TIP: `
    <h2><a id="KubeConfig_Configuration_Method_0"></a>Método de configuración KubeConfig</h2>
    <p>Por favor, consultar la <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_blank">documentación oficial</a> para más comandos.</p>
  `,
  KUBECTL_TIP: `
    <h2><a id="KubeCtl_Common_Instructions_0"></a>Instrucciones comunes de KubeCtl</h2>
    <p>Por favor, consultar la <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank">documentación oficial</a> para más comandos.</p>
    <h3><a id="kubectl_output_format_4"></a>Formato de salida de kubectl</h3>
    <ul>
    <li>Mostrar más información sobre el pod.</li>
    </ul>
    <p><code>kubectl get pod <pod-name></pod-name> -o wide</code></p>
    <ul>
    <li>Mostrar detalles del pod en formato yaml</li>
    </ul>
    <p><code>kubectl get pod <pod-name> -o yaml</code></p>
    <h3><a id="kubectl_Operation_14"></a>kubectl Operation</h3>
    <h4><a id="1_Create_a_resource_object_16"></a>1. Crea un objeto de recurso</h4>
    <ul>
    <li>Crea servicio y rc una vez según la configuración del archivo yaml</li>
    </ul>
    <p><code>kubectl create -f my-service.yaml -f my-rc.yaml</code></p>
    <ul>
    <li>Crea todos los archivos .yaml, .yml, .json en el directorio</li>
    </ul>
    <p><code>kubectl create -f <directory></code></p>
    <h4><a id="2_View_resource_objects_26"></a>2. Ver los objetos de recurso</h4>
    <ul>
    <li>Ver lista de todos los pods</li>
    </ul>
    <p><code>kubectl get pods</code></p>
    <ul>
    <li>Ver lista de rc y servicios</li>
    </ul>
    <p><code>kubectl get rc,service</code></p>
    <h4><a id="3_View_resource_details_36"></a>3. Ver detalles del recurso</h4>
    <ul>
    <li>Mostrar detalles del nodo</li>
    </ul>
    <p><code>kubectl describe nodes <node-name></code></p>
    <ul>
    <li>Mostrar detalles del pod</li>
    </ul>
    <p><code>kubectl describe pods/<pod-name></code></p>
  `,
}
