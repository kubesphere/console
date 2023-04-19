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
  HIDE_HELP_INFORMATION: '도움말 정보 숨기기',
  KUBECTL_TIP: `
    <h2><a id="KubeCtl_Common_Instructions_0"></a>명령어 사용팁</h2>
    <p>다음 kubcstl 명령을 참조할 수 있습니다. <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank">자세히 알아보기</a></p>
    <h3><a id="kubectl_output_format_4"></a>사용자 지정 출력</h3>
    <ul>
    <li>파드에 대한 자세한 정보 보기</li>
    </ul>
    <p><code>kubectl get pod &lt;pod-name&gt; -o wide</code></p>
    <ul>
    <li>YAML 형식으로 파드 세부 정보 보기</li>
    </ul>
    <p><code>kubectl get pod &lt;pod-name&gt; -o yaml</code></p>
    <h3><a id="kubectl_Operation_14"></a>운영</h3>
    <h4><a id="1_Create_a_resource_object_16"></a>리소스 생성</h4>
    <ul>
    <li>YAML 구성 파일을 사용하여 서비스 생성</li>
    </ul>
    <p><code>kubectl create -f my-service.yaml</code></p>
    <ul>
    <li>디렉토리에 있는 모든 YAML, YML 및 JSON 파일을 사용하여 리소스 생성</li>
    </ul>
    <p><code>kubectl create -f &lt;directory&gt;</code></p>
    <h4><a id="2_View_resource_objects_26"></a>리소스 보기</h4>
    <ul>
    <li>모든 파드 보기</li>
    </ul>
    <p><code>kubectl get pods</code></p>
    <ul>
    <li>모든 서비스 보기</li>
    </ul>
    <p><code>kubectl get services</code></p>
    <h4><a id="3_View_resource_details_36"></a>리소스 세부 정보 보기</h4>
    <ul>
    <li>노드 세부 정보 보기</li>
    </ul>
    <p><code>kubectl describe nodes &lt;node-name&gt;</code></p>
    <ul>
    <li>파드 세부 정보 보기</li>
    </ul>
    <p><code>kubectl describe pods &lt;pod-name&gt;</code></p>
  `,
  OPEN_TERMINAL_DESC: '프록시 서버의 웹 소켓 설정이 올바른지 확인합니다.'
};