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
  connected: 'connected',
  Copy: 'Copy',
  'Copy Successfully': 'Copied successfully.',
  Disconnect: 'Disconnect',
  disconnected: 'disconnected',
  'Download File': 'Download File',
  'Kubeconfig File': 'Kubeconfig File',
  'KubeSphere Terminal': 'KubeSphere Terminal',
  'Launch kubectl': 'Launch kubectl',
  'Put this into': 'Put this into',

  KUBECONFIG_TIP: `
    <h2><a id="KubeConfig_Configuration_Method_0"></a>KubeConfig Configuration Method</h2>
    <p>Please refer to the <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_blank">official documentation</a> for more commands.</p>
  `,
  KUBECTL_TIP: `
    <h2><a id="KubeCtl_Common_Instructions_0"></a>KubeCtl Common Instructions</h2>
    <p>Please refer to the <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank">official documentation</a> for more commands.</p>
    <h3><a id="kubectl_output_format_4"></a>kubectl Output Format</h3>
    <ul>
    <li>Show more information about Pod</li>
    </ul>
    <p><code>kubectl get pod &lt;pod-name&gt; -o wide</code></p>
    <ul>
    <li>Display Pod details in yaml format</li>
    </ul>
    <p><code>kubectl get pod &lt;pod-name&gt; -o yaml</code></p>
    <h3><a id="kubectl_Operation_14"></a>kubectl Operation</h3>
    <h4><a id="1_Create_a_resource_object_16"></a>1. Create a resource object</h4>
    <ul>
    <li>Create service and rc one time according to yaml configuration file</li>
    </ul>
    <p><code>kubectl create -f my-service.yaml -f my-rc.yaml</code></p>
    <ul>
    <li>Create all .yaml, .yml, .json files in the directory</li>
    </ul>
    <p><code>kubectl create -f &lt;directory&gt;</code></p>
    <h4><a id="2_View_resource_objects_26"></a>2. View resource objects</h4>
    <ul>
    <li>View all Pod lists</li>
    </ul>
    <p><code>kubectl get pods</code></p>
    <ul>
    <li>View rc and service list</li>
    </ul>
    <p><code>kubectl get rc,service</code></p>
    <h4><a id="3_View_resource_details_36"></a>3. View resource details</h4>
    <ul>
    <li>Show Node details</li>
    </ul>
    <p><code>kubectl describe nodes &lt;node-name&gt;</code></p>
    <ul>
    <li>Display Pod details</li>
    </ul>
    <p><code>kubectl describe pods/&lt;pod-name&gt;</code></p>
  `,
}
