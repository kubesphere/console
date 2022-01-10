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
  // List
  PROJECT_EMPTY_DESC: 'Please create a project.',
  // List > Projects > Create
  CREATE_PROJECT: 'Crear proyecto',
  // List > Multi-cluster Projects > Create
  CREATE_MULTI_CLUSTER_PROJECT: 'Crear proyecto de clúster múltiple',
  CREATE_MULTI_CLUSTER_PROJECT_DESC: 'Un proyecto multi-clúster se ejecuta sobre distintos clústers a la vez, lo que ayuda a que puedas construir un entorno de contenedores para una rápida iteración de aplicaciones y conseguir alta disponibilidad.',
  MULTI_CLUSTER_PROJECT_PL: 'Proyectos de clústeres múltiples',
  FED_HOST_NAMESPACE_TIP: 'Por favor, no manipules los recursos de este proyecto puesto que pertence a un proyecto multicluster',
  MULTI_CLUSTER_PROJECT: 'Proyecto de clúster múltiple',
  PROJECT_NAME_EXISTS_IN_HOST: 'The project name exists on the host cluster.',
  SELECT_CLUSTER_DESC: 'Selecciona el clúster para crear el proyecto.',
  CLUSTER_EMPTY_DESC: 'Selecciona un cluster, por favor.',
  PROJECT_NAME_EXISTS_IN_CLUSTER: 'El nombre existe en {cluster}',
  PROJECT_CLUSTER_SETTINGS_DESC: 'Selecciona el clúster para crear el proyecto. Cuando se seleccionan varios grupos, se creará un proyecto de múltiples grupos.',
  // List > Edit Information
  // List > Edit Quotas
  // List > Delete
  // List > Add Cluster
  FEDPROJECT_CANNOT_ADD_CLUSTER: 'Unable to add a new cluster'
};