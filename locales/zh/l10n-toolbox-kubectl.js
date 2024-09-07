/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
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
  OPEN_TERMINAL_DESC: '确保代理服务器上的 Web Socket 设置正确。',
  COMMAND_REFERENCE: '命令参考',
  SWITCH_SHELL: '切换 shell',
  BASH_SHELL_HELP:
    '输入 /bin/bash 切换 shell 类型为 bash，可获得更好 shell 体验。（注意：有些容器不支持 bash）',
};
