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
  HIDE_HELP_INFORMATION: '隐藏帮助信息',
  KUBECTL_TIP: `
    <h2><a id="KubeCtl__0"></a>命令参考</h2>
    <p>您可以参考以下 kubectl 命令。<a href="https://kubernetes.io/zh/docs/reference/kubectl/overview/" target="_blank">了解更多</a></p>
    <h3><a id="kubectl__3"></a>自定义输出</h3>
    <ul>
    <li>查看容器组的更多信息</li>
    </ul>
    <p><code>kubectl get pod &lt;容器组名称&gt; -o wide</code></p>
    <ul>
    <li>查看 YAML 格式的容器组详情</li>
    </ul>
    <p><code>kubectl get pod &lt;容器组名称&gt; -o yaml</code></p>
    <h3><a id="kubectl__13"></a>执行操作</h3>
    <h4><a id="1__15"></a>创建资源</h4>
    <ul>
    <li>使用 YAML 配置文件创建服务</li>
    </ul>
    <p><code>kubectl create -f my-service.yaml</code></p>
    <ul>
    <li>使用目录下的所有 YAML、YML 和 JSON 文件创建资源</li>
    </ul>
    <p><code>kubectl create -f &lt;目录&gt;</code></p>
    <h4><a id="2__25"></a>查看资源</h4>
    <ul>
    <li>查看所有容器组</li>
    </ul>
    <p><code>kubectl get pods</code></p>
    <ul>
    <li>查看所有服务</li>
    </ul>
    <p><code>kubectl get services</code></p>
    <h4><a id="3__35"></a>查看资源详情</h4>
    <ul>
    <li>查看节点详情</li>
    </ul>
    <p><code>kubectl describe nodes &lt;节点名称&gt;</code></p>
    <ul>
    <li>查看容器组详情</li>
    </ul>
    <p><code>kubectl describe pods &lt;容器组名称&gt;</code></p>
  `,
  OPEN_TERMINAL_DESC: '确保代理服务器上的 Web Socket 设置正确。'
};