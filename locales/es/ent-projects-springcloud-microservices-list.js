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
  SPRING_CLOUD: 'Spring Cloud',
  // Banner
  MICROSERVICE: 'Microservices',
  MICROSERVICE_PL: 'Microservice',
  MICROSERVICE_DESC: 'The service registry records the mapping between services and service addresses. In a distributed architecture, services will be registered here. When a service needs to call other services, it will find the address of the service and call it. ',
  WHAT_IS_SERVICE_REGISTRATION_CENTER_Q: 'What is a service registry?',
  WHAT_IS_SERVICE_REGISTRATION_CENTER_A: 'The service registry is the core functional component of Spring Cloud microservices. The service registry records the mapping relationship between services and service addresses. In a distributed architecture, services will be registered here. When a service needs to call other services, it will find the address of the service and call it. ',
  // Overview
  SERVICE_REGISTRATION_CENTER_ADDRESS: 'Service registry address',
  DOWNLOAD_SAMPLE_CONFIGURATIONS: 'Download sample configuration',
  ALL_SERVICE: 'All services',
  ALL_SERVICE_INSTANCE: 'All instances',
  HEALTHY_SERVICE_INSTANCE: 'Healthy instance',
  // List
  MICROSERVICE_INSTANCE_COUNT: 'Number of instances',
  MICROSERVICE_HEALTHY_INSTANCE_COUNT: 'Number of healthy instances',
  TRIGGER_FLAG: 'Trigger protection threshold',
  MICROSERVICE_EMPTY_DESC: 'The service registry is the core functional component of Spring Cloud microservices. The service registry records the mapping relationship between services and service addresses. In a distributed architecture, services will be <br>registered here. When a service needs to call other services, it will find the address of the service and call it. ',
  MICROSERVICEINSTANCES: 'Microservice instance',
  MICROSERVICEINSTANCES_EMPTY_DESC: 'No microservice instance records found',
  // Instances List
  MICROSERVICE_INSTANCE_STATUS_RUNNING: 'Running',
  MICROSERVICE_INSTANCE_STATUS_OFFLINE: 'Offline',
  EDIT_WEIGHT: 'Edit weight',
  // List > Create
  CREATE_MICROSERVICE_INSTANCE: 'Create instance'
};