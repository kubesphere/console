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
  // Command Tips
  HIDE_HELP_INFORMATION: 'Hide Help Information',
  KUBECTL_TIP: `
    <h2><a id="KubeCtl_Common_Instructions_0"></a>Command Tips</h2>
    <p>You can refer to the following kubestl commands. <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank">Learn More</a></p>
    <h3><a id="kubectl_output_format_4"></a>Customized Output</h3>
    <ul>
    <li>View more information about a pod</li>
    </ul>
    <p><code>kubectl get pod &lt;pod-name&gt; -o wide</code></p>
    <ul>
    <li>View pod details in YAML format</li>
    </ul>
    <p><code>kubectl get pod &lt;pod-name&gt; -o yaml</code></p>
    <h3><a id="kubectl_Operation_14"></a>Operations</h3>
    <h4><a id="1_Create_a_resource_object_16"></a>Create Resources</h4>
    <ul>
    <li>Create a service by using a YAML configuration file</li>
    </ul>
    <p><code>kubectl create -f my-service.yaml</code></p>
    <ul>
    <li>Create resources by using all YAML, YML, and JSON files in a directory</li>
    </ul>
    <p><code>kubectl create -f &lt;directory&gt;</code></p>
    <h4><a id="2_View_resource_objects_26"></a>View Resources</h4>
    <ul>
    <li>View all pods</li>
    </ul>
    <p><code>kubectl get pods</code></p>
    <ul>
    <li>View all services</li>
    </ul>
    <p><code>kubectl get services</code></p>
    <h4><a id="3_View_resource_details_36"></a>View Resource Details</h4>
    <ul>
    <li>View node details</li>
    </ul>
    <p><code>kubectl describe nodes &lt;node-name&gt;</code></p>
    <ul>
    <li>View pod details</li>
    </ul>
    <p><code>kubectl describe pods &lt;pod-name&gt;</code></p>
  `,
  OPEN_TERMINAL_DESC: 'Ensure that the web socket settings on the proxy server is correct.',
}
