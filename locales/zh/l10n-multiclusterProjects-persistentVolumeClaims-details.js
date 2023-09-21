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
  // Attributes
  // More > Edit Settings
  // More > Edit Settings > Volume Settings
  // More > Edit Settings > Cluster Differences
  // More > Edit YAML
  // More > Delete
  // Resource Status
  VOLUME_MONITORING_TIP:
    '存储系统需要具备真实的 volume quota 控制能力才可以输出真实准确的数据，基于 host path, local pv, 开源 nfs server 构建的存储系统通常不具备该能力。<a href="https://github.com/kubesphere/kubesphere/issues/2921" target="_blank">了解更多</a>',
  // Mount Information
  MOUNT_INFORMATION: '挂载信息',
}
