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
  EDGE_NODE_PL: 'Edge Nodes',
  EDGE_NODE_DESC: 'Edge nodes are servers deployed outside the KubeSphere cluster. You can add edge nodes to the KubeSphere cluster to manage them.',
  // Node Count
  // List
  EDGE_NODE_EMPTY_DESC: 'Please add an edge node to the cluster.',
  AGENT: 'Agent',
  EDGE: 'Edge node',
  // List > Add
  ADD: 'Add',
  ADD_EDGE_NODE: 'Add Edge Node',
  EDGENODE_CONFIG_COMMAND: 'Edge Node Configuration Command',
  ADD_EDGE_COMMAND: 'Run the above command on your edge node to configure it.',
  IN_USE_Node_IP: 'The IP address {ip} is in use. Please enter another IP address.',
  IN_USE_Node_NAME: 'The node name {name} already exists. Please enter another name.',
  EDGENODE_NAME_EMPTY_DESC: 'Please set a name for the edge node.',
  EDGENODE_CONFIG_COMMAND_TIP: 'Before running the command, you must install a container runtime such as Docker or containerd on your edge node. <a href="https://kubeedge.io/en/docs/" target="_blank">Learn More</a>',
  ADD_DEFAULT_TAINT: 'Add the default taint {params}',
  EDGE_NODE: 'Edge Node',
  INTERNAL_IP_ADDRESS: 'Internal IP Address',
  EDGENODE_INTERNAL_IP_DESC: 'Set the internal IP address of the edge node in the KubeSphere cluster.',
  EDGENODE_INTERNAL_IP_EMPTY_DESC: 'Please set the internal IP address of the edge node in the KubeSphere cluster.',
  COPY_SUCCESSFUL: 'Copied successfully.',
  // List > View Log
  LOGS: 'Logs',
  VIEW_LOG: 'View Log'
};