/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

import StorageClasses from './StorageClasses/Embed/index';
import StorageClassesDetail from './StorageClasses/Embed/detail';
// import StorageClassesDetailVolumes from './StorageClasses/Detail/Volumes';

// import PV1 from './Volumes/PV';
// import PVDetail from './Volumes/PV/Detail';
import PVDetail from './Volumes/PV/Detail/Embed';
// import PVEvents from './Volumes/PV/Detail/Events';
// import PVMetaData from './Volumes/PV/Detail/MeData';
// import PVResourceStatus from './Volumes/PV/Detail/ResourceStatus';

import Volumes from './Volumes/index';
// import Volume from './Volumes/Volume';

import VolumesDetail from './Volumes/Volume/Detail/Embed';
// import VolumeEvents from './Volumes/Volume/Detail/Events';
// import VolumeMetaData from './Volumes/Volume/Detail/MetaData';
// import VolumeResourceStatus from './Volumes/Volume/Detail/ResourceStatus';
// import VolumeDetailSnapshots from './Volumes/Volume/Detail/Snapshots';

import VolumeSnapshotClasses from './VolumeSnapshotClasses/Embed';
import VSClassesDetail from './VolumeSnapshotClasses/Detail/Embed';

// import VolumeSnapshotClasses from './VolumeSnapshotClasses';
// import VSClassesDetail from './VolumeSnapshotClasses/Detail';
// import VSClassesDetailVolumeSnapshot from './VolumeSnapshotClasses/Detail/VolumeSnapshot';

// import VolumeSnapshots from './VolumeSnapshots';

// import SnapshotsContent from './VolumeSnapshots/SnapshotContent';
import VolumeSnapshots from './VolumeSnapshots/index';
import SnapshotsContentDetail from './VolumeSnapshots/SnapshotContent/Detail/Embed';
import SnapshotsDetail from './VolumeSnapshots/Snapshots/Detail/Embed';

// import SnapshotsContentDetail from './VolumeSnapshots/SnapshotContent/Detail';
// import SnapshotsContentDetailEvents from './VolumeSnapshots/SnapshotContent/Detail/Events';
// import SnapshotsContentDetailMetadata from './VolumeSnapshots/SnapshotContent/Detail/MeData';
// import SnapshotsContentDetailResourceStatus from './VolumeSnapshots/SnapshotContent/Detail/ResourceStatus';
// import Snapshots from './VolumeSnapshots/Snapshots';
// import VolumeSnapshotsDetail from './VolumeSnapshots/Snapshots/Detail';
// import VolumeSnapshotsDetailEvents from './VolumeSnapshots/Snapshots/Detail/Events';
// import VolumeSnapshotsDetailSource from './VolumeSnapshots/Snapshots/Detail/Source';

const PATH = '/clusters/:cluster';

const storageListRoutes: RouteObject[] = [
  {
    path: `${PATH}/volumes/Volumes`,
    element: <Volumes tab={'Volumes/Volumes'} />,
  },
  {
    path: `${PATH}/volumes/PV`,
    element: <Volumes tab={'Volumes/PV'} />,
  },
  {
    path: `${PATH}/volumes`,
    element: <Navigate to="./Volumes" replace />,
  },
  {
    path: `${PATH}/storageclasses`,
    element: <StorageClasses />,
  },
  {
    path: `${PATH}/volume-snapshots/snapshots`,
    element: <VolumeSnapshots tab={'snapshots'} />,
  },
  {
    path: `${PATH}/volume-snapshots/snapshot-content`,
    element: <VolumeSnapshots tab={'snapshot-content'} />,
  },
  {
    path: `${PATH}/volume-snapshots`,
    element: <Navigate to="./snapshots" replace />,
  },

  // {
  //   path: `${PATH}/volume-snapshots/snapshots`,
  //   element: <Snapshots />,
  // },
  // {
  //   path: `${PATH}/volume-snapshots/snapshot-content`,
  //   element: <SnapshotsContent />,
  // },
  {
    path: `${PATH}/volume-snapshots`,
    element: <Navigate to="./snapshots" replace />,
  },
  {
    path: `${PATH}/volume-snapshot-classes`,
    element: <VolumeSnapshotClasses />,
  },
];

const storageDetailRoutes: RouteObject[] = [
  {
    path: `${PATH}/projects/:namespace/volumes/:name`,
    element: <VolumesDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: `resource-status`,
        element: <VolumesDetail />,
      },
      {
        path: `metadata`,
        element: <VolumesDetail />,
      },
      {
        path: `events`,
        element: <VolumesDetail />,
      },
      {
        path: `snapshot`,
        element: <VolumesDetail />,
      },
    ],
  },
  {
    path: `${PATH}/pv/:name`,
    element: <PVDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: `resource-status`,
        element: <PVDetail />,
      },
      {
        path: `metadata`,
        element: <PVDetail />,
      },
      {
        path: `events`,
        element: <PVDetail />,
      },
    ],
  },
  {
    path: `${PATH}/storageclasses/:name`,
    element: <StorageClassesDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="volumes" replace />,
      },
      {
        path: `volumes`,
        element: <StorageClassesDetail />,
      },
    ],
  },
  {
    path: `${PATH}/projects/:namespace/volume-snapshots/:name`,
    element: <SnapshotsDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="source" replace />,
      },
      {
        path: `source`,
        element: <SnapshotsDetail />,
      },
      {
        path: `events`,
        element: <SnapshotsDetail />,
      },
      {
        path: `event`,
        element: <SnapshotsDetail />,
      },
    ],
  },
  {
    path: `${PATH}/volume-snapshot-content/:name`,
    element: <SnapshotsContentDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="resource-status" replace />,
      },
      {
        path: `resource-status`,
        element: <SnapshotsContentDetail />,
      },
      {
        path: `metadata`,
        element: <SnapshotsContentDetail />,
      },
      {
        path: `events`,
        element: <SnapshotsContentDetail />,
      },
    ],
  },
  {
    path: `${PATH}/volume-snapshot-classes/:name`,
    element: <VSClassesDetail />,
    children: [
      {
        index: true,
        element: <Navigate to="volume-snapshot" replace />,
      },
      {
        path: `volume-snapshot`,
        element: <VSClassesDetail />,
      },
    ],
  },
];

export { storageListRoutes, storageDetailRoutes };
