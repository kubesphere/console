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
  PIPELINE_PL: 'Pipelines',
  // List
  HEALTH: 'Health',
  PULL_REQUEST_COUNT: 'Pull Requests',
  MULTI_BRANCH_PIPELINE: 'Multi-branch Pipeline',
  HEALTHY: 'Healthy',
  SUB_HEALTHY: 'Sub-healthy',
  NO_STATUS: 'sin Estado',
  BRANCH_COUNT: 'Número de rama',
  PIPELINE_EMPTY_DESC: 'Please create a pipeline.',
  // List > Run
  BATCH_RUN_SUCCESS_SI: 'The pipeline was run successfully.',
  BATCH_RUN_SUCCESS_PL: 'The pipelines were run successfully.',
  BATCH_RUN_UNSUPPORTED_DESC: 'Multi-branch pipelines cannot run in a batch.',
  // List > Edit
  // List > Copy
  COPY: 'Copiar',
  COPY_PIPELINE: 'Copiar pipeline',
  PIPELINE_NAME_DESC: 'El nombre de la pipeline. Las pipelines en el mismo proyecto deben tener nombres diferentes.',
  PIPELINE_NAME_TIP: 'Por favor introduce el nombre de la pipeline',
  // List > Delete
  // List > Create
  CREATE_PIPELINE: 'Crear pipeline',
  // List > Create > Basic Information
  PIPELINE_TYPE: 'Pipeline Type',
  SELECT_CODE_REPOSITORY: 'Seleccionar repositorio de código',
  BRANCH_PIPELINE_DESC: 'Describe the software build process with visual orchestration or Jenkinsfile.',
  MULTI_BRANCH_PIPELINE_DESC: 'Create a series of pipelines for each branch detected in the source code management (SCM) repository.',
  PIPELINE_CREATE_DEVOPS_PROJECT_DESC: 'Select the DevOps project to which the pipeline belongs.',
  CODE_REPOSITORY_OPTIONAL: 'Repositorio de Código (Opcional)',
  CODE_REPOSITORY_REQUIRED: 'Repositorio de Código',
  CODE_REPOSITORY_REQUIRED_DESC: 'Please select a code repository.',
  GO_CREATE_REPO: 'No code repository is available. Please create a code repository.',
  CODE_REPO_EXISTS: 'code repository already exists',
  SELECT_CODE_REPO_DESC: 'Selecciona un repositorio de código como fuente de código para la pipeline.',
  RESELECT: 'Seleccionar de nuevo',
  // List > Create > Basic Information > Code Repository > GitHub
  CREDENTIAL_SI: 'Autentificación',
  CREDENTIAL: 'Autentificación',
  PIPELINE_CREDENTIAL_EMPTY_TIP: 'Please select a credential.',
  SELECT_CREDENTIAL_DESC: 'La obtención del código del repositorio puedes requerir credenciales. Selecciona una credencial existente o agregue una nueva.',
  GITHUB_CREDENTIAL_EMPTY: 'Introduce su token de acceso de GitHub.',
  INCORRECT_GITHUB_TOKEN_DESC: `Token incorrecto
    <a
      class="float-right"
      href="https://github.com/settings/tokens/new?scopes=repo,read:user,user:email,write:repo_hook"
      target="_blank"
    >
      Get Token
    </a>`,
  LOAD_MORE: 'Cargar más',
  NO_REPO_FOUND_DESC: 'No code repository is found.',
  // List > Create > Basic Information > Code Repository > GitLab
  GITLAB_SERVER_ADDRESS: 'GitLab Server',
  GITLAB_SERVER_EMPTY_TIP: 'Please enter the address of a GitLab server.',
  PROJECT_GROUP_OWNER: 'GitLab Project Owner',
  PROJECT_GROUP_OWNER_EMPTY_TIP: 'Please enter the name of a GitLab project group or project owner.',
  REPOSITORY_NAME: 'Nombre del repositorio',
  REPOSITORY_NAME_EMPTY_TIP: 'Please enter the name of a repository name.',
  // List > Create > Basic Information > Code Repository > Bitbucket
  BITBUCKET_SERVER_ADDRESS: 'Bitbucket Server Address',
  BITBUCKET_SERVER_EMPTY_TIP: 'Please enter the address of a Bitbucket server.',
  INCORRECT_USERNAME_OR_PASSWORD: 'Incorrect username or password.',
  BITBUCKET_SERVER_CREDENTIAL_EMPTY: 'Introduce la información de su cuenta de Bitbucket.',
  BITBUCKET_ADDRESS_EMPTY_TIP: 'Please enter the address of a Bitbucket server.',
  BITBUCKET_ADDRESS_INVALID_TIP: 'Invalid Bitbucket server address.',
  // List > Create > Basic Information > Code Repository > Git
  CODE_REPOSITORY_ADDRESS_DESC: 'Use a repository that contains Jenkinsfiles.',
  CODE_REPOSITORY_ADDRESS_EMPTY_TIP: 'Please enter the address of a code repository.',
  CODE_REPOSITORY_ADDRESS: 'URL del repositorio',
  // List > Create > Basic Information > Code Repository > SVN
  SINGLE_SVN: 'Svn único',
  SVN: 'SVN',
  BRANCH_EXCLUDED: 'Rama excluida',
  BRANCH_INCLUDED: 'Rama incluida',
  // List > Create > Advanced Settings
  DELETE_OUTDATED_BRANCHES: 'Descartar ramas anteriores',
  DELETE_OUTDATED_BRANCHES_TIP: 'Esto determinará cuándo se debe descartar la rama y todos los registros de compilación debajo de la rama. El registro de compilación incluye los artefactos de archivo de salida de la consola y otros metadatos relacionados con una compilación en particular. Mantener menos compilaciones ahorra espacio en disco utilizado por Jenkins. Proporcionamos dos opciones para determinar cuándo debe descartarse la rama anterior: 1. Número de días para conservar la rama: si la rama alcanza un cierto número de días, la rama se descarta. 2. Número de ramas reservadas: si ya existe un cierto número de ramas, se descarta la rama más antigua. Estas dos opciones pueden funcionar en la sucursal al mismo tiempo. Si se excede alguno de los límites, se eliminarán las ramas que excedan este límite.',
  BRANCH_SETTINGS: 'Configuración de ramas',
  BRANCH_RETENTION_PERIOD_DAYS: 'Días para mantener ramas',
  MAXIMUM_BRANCHES: 'Número máximo de ramas viejas a mantener',
  BRANCH_RETENTION_PERIOD_DAYS_DESC: 'Old branches are discarded after this number of days. The default value is 7.',
  MAXIMUM_BRANCHES_DESC: 'Old branches are discarded when the branch number exceeds the maximum number. The default value is 5.',
  ADD_STRATEGY: 'Add Strategy',
  DISCOVER_TAG_BRANCHES: 'Descubrir Tag ramas',
  DISCOVER_BRANCHES: 'Descubrir ramas',
  ALL_BRANCHES: 'Todas las ramas',
  ONLY_PR_BRANCHES: 'Solo las ramas que también se presentan como PR',
  EXCLUDE_PR_BRANCHES: 'Excluir las ramas que también se presentan como PRs',
  ENABLE_TAG_BRANCH_DISCOVERY: 'Habilitar descoberta de ramo de tag',
  DISABLE_TAG_BRANCH_DISCOVERY: 'Desativar a descoberta do ramo tag',
  PULL_STRATEGY: 'Estrategia de Pull',
  OPTIONS_PR_PARAMS_1: 'Versión del código fuente de PR fusionada con la rama de destino',
  OPTIONS_PR_PARAMS_2: 'Versión del código fuente del propio RP',
  OPTIONS_PR_PARAMS_3: 'Se crean dos pipelines cuando se descubre PR',
  REGEX: 'Filtro de expresiones regulares',
  FILTER_BY_REGEX: 'Filter by name (with regular expression)',
  FILTER_BY_REGEX_DESC: 'Habilite las expresiones regulares, ignorando los nombres que no coinciden con la expresión regular proporcionada (incluidas las ramas y PR, etc.)',
  SCRIPT_PATH: 'Ruta del script',
  SCRIPT_PATH_DESC: 'Especifique la ubicación del archivo Jenkinsfile en el repositorio de código fuente',
  SCAN_TRIGGER: 'Repository Scan Trigger',
  SCAN_PERIODICALLY: 'Scan regularly if not otherwise triggered',
  TIME_TRIGGER_DESC: 'Algunos tipos de elementos se volverán a indexar automáticamente cuando reciban un mensaje push externo. Sin embargo, en algunos casos, las notificaciones de mensajes pueden fallar. Esta opción verificará si el índice se ha ejecutado dentro del intervalo de tiempo especificado y, si no, activará el índice.',
  SCAN_INTERVAL: 'Intervalo de escaneo',
  SELECT_PIPELINE_SCAP: 'selecciona una pipeline',
  WHEN_DELETE_PIPELINE_DESC: 'Cuando se elimina una pipeline, las tareas en la pipeline especificada se activan automáticamente.',
  WHEN_CREATE_PIPELINE_DESC: 'Cuando se crea una nueva pipeline, las tareas en la pipeline especificada se activan automáticamente.',
  PIPELINE_EVENT_TRIGGER: 'Disparador de eventos de Pipelines',
  WHEN_CREATE_PIPELINE: 'Cuando crear pipeline',
  WHEN_DELETE_PIPELINE: 'Cuando eliminar pipeline',
  CLONE_SETTINGS: 'Opciones de clonación de Git',
  CLONE_TIMEOUT_PERIOD: 'Tiempo de espera de clonación de pipeline agotado (en minutos)',
  CLONE_DEPTH: 'profundidad de clonado',
  ENABLE_SHALLOW_CLONE: 'Enable shallow clone',
  WEBHOOK_PUSH_URL: 'Webhook Push URL',
  WEBHOOK_PUSH_DESC: 'Empuje un mensaje a esta URL para activar una reindexación del repositorio.',
  TRUSTED_USERS: 'Usuario de confianza',
  CONTRIBUTORS: 'Contribuidores',
  EVERYONE: 'Todo el mundo',
  NOBODY: 'Nadie',
  USERS_WITH_PERMISSION: 'De usuarios con permiso de administrador o de escritura',
  // List > Create > Advanced Settings (no repo specified)
  OPTIONS: 'Options',
  BUILD_SETTINGS: 'Configuración de compilación',
  DELETE_OUTDATED_BUILD_RECORDS: 'Descartar builds antiguas',
  DELETE_OUTDATED_BUILD_RECORDS_TIP: `Set the system to automatically delete outdated build records including console output, archived artifacts, and metadata to save disk space.`,
  BUILD_RECORD_RETENTION_PERIOD_DAYS: 'Días para mantener las build',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_DESC: 'Old builds are discarded after this number of days. The default value is 7.',
  BUILD_RECORD_RETENTION_PERIOD_DAYS_INVALID_TIP: 'The retention period must be a positive integer.',
  MAXIMUM_BUILD_RECORDS: 'Número máximo de compilaciones para mantener',
  MAXIMUM_BUILD_RECORDS_DESC: 'Old builds are discarded when the build number exceeds the maximum number. The default value is 10.',
  MAXIMUM_BUILD_RECORDS_INVALID_TIP: 'The maximum number of build records must be a positive integer.',
  NO_CONCURRENT_BUILDS: 'No hay builds concurrentes',
  NO_CONCURRENT_BUILD_DESC: 'Si marca esta opción, no podrá ejecutar varias compilaciones simultáneamente.',
  BUILD_PARAMETERS: 'Build parametrizado',
  BUILD_PARAMETERS_TIP: 'El proceso de compilación parametrizado le permite pasar uno o más parámetros cuando construye. Por ejemplo: puedes tener una pipeline para publicar software y desea cargar las notas de la versión juntas. Esto se puedes hacer agregando parámetros de texto aquí. Cada parámetro tiene un Nombre y un Valor y el valor del Valor depende del tipo de parámetro. Se puedes acceder a estos valores en la canalización mediante params.Name o Name. Esto significa que cada parámetro definido aquí debe tener un nombre único. Al parametrizar un proyecto, la compilación se reemplaza por una compilación parametrizada que solicita al usuario que introduce un valor para cada parámetro definido. Si eligen no ingresar nada, la compilación continúa con el valor predeterminado para cada parámetro. Si la compilación del proyecto se inicia automáticamente, por ejemplo, mediante un disparador temporizado, se disparará con el valor predeterminado del parámetro.',
  PARAMS_STRING: 'Cuerda',
  PIPELINE_PARAM_DEFAULT_DESC: 'The default value of the field. You can also change the default value before manually running a pipeline.',
  PARAMS_TEXT: 'Texto',
  PARAMS_TEXT_TCAP: 'Multi-line String',
  PARAMETER_DESCRIPTION_DESC: 'Descripción del parámetro.',
  PARAMS_BOOLEAN: 'Booleano',
  PARAMS_CHOICE: 'Elección',
  CHOICE_PARAM_OPTION_DESC: 'Enter one option per each line. La primera línea se usará como la opción predeterminada.',
  PARAMS_PASSWORD: 'Contraseña',
  BUILD_TRIGGER: 'Crear disparador',
  BUILD_PERIODICALLY: 'Build programada',
  BUILD_PERIODICALLY_TIP: 'It provides cron-like functionality to run this pipeline regularly.',
  PIPELINE_CRON_DESC: 'Habría corrido por última vez en {lastTime}; se ejecutará a las {nextTime}',
  PIPELINE_SCHEDULE_DESC: 'Enter a CRON expression to set a schedule. <a href="//jenkins.io/doc/book/pipeline/syntax/#cron-syntax" target="_blank">Learn More</a>',
  DEFAULT_VALUE: 'Valor por defecto',
  PARAMETER_NAME_EMPTY_DESC: 'Please set the parameter name.',
  SELECT_TEMPLATE: 'Select template',
  PARAMETER_CONFIG: 'Parameter configuration',
  PREVIEW: 'Preview',
  EMPTY_PARAMS_CONFIG: 'This operation does not require parameter configuration.',
  PIPELINE_VALIDATOR_DESC: 'Please select a pipeline template.'
};