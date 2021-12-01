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
  GRAYSCALE_RELEASE: 'Grayscale Release',

  // Release Modes
  // Release Modes > Blue-Green Deployment > Create > Basic Information
  // Release Modes > Blue-Green Deployment > Create > Service Settings
  DESELECT: 'Deselect',
  SELECT: 'Select',

  // Release Modes > Blue-Green Deployment > Create > New Version Settings
  REPLICA: 'Replica',
  REPLICA_PL: 'Replicas',
  GRAYSCALE_REPLICAS_DESC: 'Pod replicas in the new version',

  // Release Modes > Blue-Green Deployment > Create > Strategy Settings
  // Release Modes > Canary Release > Create > Strategy Settings
  KEY_EQ_VALUE: 'Key=Value',

  // Release Modes > Traffic Mirroring > Create > Strategy Settings
  // Release Jobs
  TCP_INBOUND_TRAFFIC: 'TCP Inbound Traffic',
  TCP_OUTBOUND_TRAFFIC: 'TCP Outbound Traffic',
  NO_DATA_SCAP: 'No data',
  REPLICA_COUNT_LOW: 'replicas',

  // Release Jobs > Job Status
  // Release Jobs > Job Status > Edit
  EDIT_GRAYSCALE_RELEASE_JOB: 'Edit Grayscale Release Job',

  // Release Jobs > Canary Release > Traffic Distribution
  ADJUST_TRAFFIC_DISTRIBUTION: 'Adjust Traffic Distribution',
}
