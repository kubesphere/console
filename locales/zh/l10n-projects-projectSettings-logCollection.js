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
  LOG_COLLECTION: '日志收集',
  DISK_LOG_COLLECTION_DESC: '日志收集功能允许系统收集保存在卷上的容器日志，并将日志发送到标准输出。',
  COLLECT_LOGS_ON_VOLUMES_Q: '如何收集卷上的日志？',
  COLLECT_LOGS_ON_VOLUMES_A: '如需收集卷上的日志，请为容器挂载读写模式的卷并设置容器将日志导出到卷。',
  // Collect Logs on Volumes
  COLLECT_LOGS_ON_VOLUMES: '收集卷上日志',
  DISABLE_LOG_COLLECTION: '停用日志收集',
  DISABLE_LOG_COLLECTION_TIP: '您确定停用日志收集吗？您需要重启容器组副本才能使修改生效。',
  LOG_COLLECTION_ENABLED_DESC: '启用或禁用此功能后，您需要重启容器组副本才能使修改生效。',
  DISABLED: '已禁用',
  ENABLED: '已启用'
};