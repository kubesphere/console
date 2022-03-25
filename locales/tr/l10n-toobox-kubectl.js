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
  HIDE_HELP_INFORMATION: 'Yardım Bilgilerini Gizle',
  KUBECTL_TIP: `
<h2><a id="KubeCtl_Common_Instructions_0"></a>Komut İpuçları</h2>
    <p>Aşağıdaki kubestl komutlarına başvurabilirsiniz. <a href="https://kubernetes.io/docs/reference/kubectl/overview/" target="_blank">Daha Fazla Bilgi Edinin</a></p>
    <h3><a id="kubectl_output_format_4"></a>Özelleştirilmiş Çıktı</h3>
    <ul>
    <li>Bir kapsül hakkında daha fazla bilgi görüntüleyin</li>
    </ul>
    <p><code>kubectl pod &lt;pod-name&gt; -o geniş</code></p>
    <ul>
    <li>Bölme ayrıntılarını YAML biçiminde görüntüleyin</li>
    </ul>
    <p><code>kubectl pod &lt;pod-name&gt; -o yaml</code></p>
    <h3><a id="kubectl_Operation_14"></a>İşlemler</h3>
    <h4><a id="1_Create_a_resource_object_16"></a>Kaynak Oluştur</h4>
    <ul>
    <li>YAML yapılandırma dosyası kullanarak bir hizmet oluşturun</li>
    </ul>
    <p><code>kubectl -f my-service.yaml oluştur</code></p>
    <ul>
    <li>Bir dizindeki tüm YAML, YML ve JSON dosyalarını kullanarak kaynaklar oluşturun</li>
    </ul>
    <p><code>kubectl create -f &lt;directory&gt;</code></p>
    <h4><a id="2_View_resource_objects_26"></a>Kaynakları Görüntüle</h4>
    <ul>
    <li>Tüm bölmeleri görüntüle</li>
    </ul>
    <p><code>kubectl bölmeleri al</code></p>
    <ul>
    <li>Tüm hizmetleri görüntüleyin</li>
    </ul>
    <p><code>kubectl hizmet alın</code></p>
    <h4><a id="3_View_resource_details_36"></a>Kaynak Ayrıntılarını Görüntüle</h4>
    <ul>
    <li>Düğüm ayrıntılarını görüntüleyin</li>
    </ul>
    <p><code>kubectl düğümleri tanımlar &lt;düğüm-adı&gt;</code></p>
    <ul>
    <li>Bölme ayrıntılarını görüntüleyin</li>
    </ul>
    <p><code>kubectl bölmeleri tanımlar &lt;pod-name&gt;</code></p>  `
};