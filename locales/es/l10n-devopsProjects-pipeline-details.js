/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Edit Information
  CODE_REPOSITORY: 'Repositorio de Código',
  // Attributes
  TASK_STATUS: 'Task Status',
  NOT_RUNNING: 'no ejecutar',
  QUEUED: 'Encolado',
  ABORTED: 'Aborted',
  UNSTABLE: 'Unstable',
  SKIPPED: 'Omitido',
  NOT_BUILT: 'Not built',
  SYNC_STATUS: 'Sync Status',
  DEVOPS_PROJECT: 'DevOps Project',
  // More > Edit Settings
  // More > Scan Repository
  SCAN_REPO_SUCCESSFUL: 'Escanear el repositorio correcto',
  // More > View Scan Logs
  VIEW_SCAN_LOGS: 'View Scan Logs',
  STARTED_BY_NAME: 'Comenzado por {name}',
  REPOSITORY_SCAN_LOGS: 'Escanear logs de repositorio',
  RESCAN: 'Reescanear',
  LOGS_OBTAINED_SUCCESSFULLY: 'Escanear registros correctos',
  // Health Status
  HEALTH_STATUS_SCAP: 'Health status',
  // Task Status
  PIPELINE_QUEUED_TITLE: 'La pipeline se inicializará pronto',
  INITIALIZING_PIPELINE: 'Inicialización de Pipeline',
  PIPELINE_PREPARE_DESC: 'El ambiente se está preparando. Habrá una pantalla gráfica más tarde.',
  INITIALIZING_PIPELINE_DESC: 'Please wait until the pipeline initialization is complete.',
  TASK_FAILED_NOT_OPERATIONAL: 'Tarea fallida, no operativa',
  NO_PIPELINE_CONFIG_FILE_TIP: 'Archivo de configuración de Pipeline no encontrado',
  // Task Status > Edit Pipeline
  EDIT_PIPELINE: 'Editar pipeline',
  JENKINS_UNAVAILABLE: 'Jenkins is unready.',
  AGENT_TYPE_DESC: `The agent section specifies
    where the entire Pipeline or a particular stage will be executed in the Jenkins environment,
    depending on where the Agent part is placed.
    This part must be defined at the top level within the pipeline block,
    but the stage level usage is optional. `,
  NOT_VALID_REPO: 'Code repo is not valid and cannot be created',
  CREATE_PIPELINE_DESC: 'Build, test and deploy with Pipelines',
  CI: 'Continuous Integration (CI)',
  CI_DESC:
    'Continuous integration (CI) is the process of automatically detecting, pulling, building, and (in most cases) unit testing after source code changes.',
  CICD: 'Continuous Integration & Delivery (CI/CD)',
  CICD_DESC:
    "Continuous deployment (CD) refers to the idea of automatically providing the release version in the continuous delivery pipeline to end users. According to the user's installation method, automatic deployment in the cloud environment, app upgrades (such as apps on mobile phones), website updates, or only the list of available versions.",
  CUSTOM_PIPELIEN: 'Custom Pipeline',
  CUSTOM_PIPELIEN_DESC:
    'You can select the tasks you need to customize the work content of the pipeline.',
  CC: 'CC',
  CREDENTIAL_NAME: 'ID de autentificación',
  REMOTE_REPOSITORY_URL: 'URL de repositorio remoto',
  SCM: 'SCM',
  INPUT_MESSAGE_DESC: 'Este mensaje se mostrará en el estado de ejecución de la canalización.',
  KUBERNETES_DEPLOY_DESC: `Deploy resources on a Kubernetes cluster.
    In a continuous integration or continuous deployment environment,
    only those resources that need to be updated regularly should be placed in the deployment step.
    Therefore, this step is mostly used to process the deployment of such resources.`,
  KUBERNETES_DEPLOY_DESC_MORE: `<br />
    <label>Este paso tiene las siguientes características principales:</label>
    <li> Distribución sin kubectl </li>
    <li> Sustitución variable en Jenkinsfile, es posible la implementación dinámica. </li>
    <li> Soporte para dibujar imágenes acoplables desde repositorios de imágenes privadas </li>
    <label> Actualmente, este paso admite los siguientes recursos:</label>
    <br />
    <li> Configuración </li>
    <li> Llave </li>
    <li> Desplegar </li>
    <li> Dave Process Set </li>
    <li> Enrutamiento de aplicaciones </li>
    <li> Namespace </li>
    <li> Tarea </li>
    <li> Servicio </li>
    <li> Conjunto de réplica </li>
    <li> Controlador de replicación
    (las actualizaciones continuas no son compatibles, use la implementación si desea usar actualizaciones continuas)
    </li>`,
  STAGE: 'Stage',
  KUBERNETES_DEPLOY_DEPRECATED_TIP:
    'This step will be deprecated in subsequent versions, and it is recommended that you consider other alternatives.',
  ORIGINAL_IMAGE_ADDRESS: 'Original Image Address',
  NEW_IMAGE_ADDRESS: 'New Image Address',
  NEW_IMAGE_TAG: 'New Image Tag',
  CD_STEP_DESC: 'Update image information using continuous deployment.',
  UPDATE_CD_TITLE: 'Continuous Deployment of Updates',
  // Task Status > Edit Jenkinsfile
  EDIT_JENKINSFILE: 'Editar Jenkinsfile',
  CLOSE_JENKINSFILE_EDITOR_TIP: '¿Estás seguro de cerrar este editor de jenkinsfile?',
  // Task Status > View Logs
  PIPELINE_RUN_LOGS: 'Registros de ejecución de Pipelines',
  VIEW_LOGS: 'Mostrar logs',
  DURATION_VALUE: 'Duration: {value}',
  DOWNLOAD_LOGS: 'Descargar Logs',
  // Task Status > View Logs > View Logs
  START_REAL_TIME_LOG: 'activar el registro de logs en tiempo real',
  STOP_REAL_TIME_LOG: 'desactivar el registro de logs en tiempo real',
  // Run Records
  RUN_RECORDS: 'Run Records',
  RUN: 'ejecutar',
  ACTIVITY_EMPTY_TIP: 'La pipeline actual aún no se está ejecutando',
  COMMIT: 'Commit',
  LAST_MESSAGE: 'Ultimo mensaje',
  RUN_ID: 'Run ID',
  STOP_PIPELINE_SUCCESSFUL: 'Parado de ejecución satisfactorio, se actualizará el estado después',
  INVALID_JENKINSFILE_TIP:
    'El Jenkinsfile actual no es un Jenkinsfile declarativo estándar y no se puedes mostrar gráficamente',
  PAUSED: 'Pausado',
  // Run Records > Run
  SET_PARAMETERS: 'Entrada de parámetros',
  PARAMS_DESC: `The following parameters are generated based on the pipeline settings or
     the parameters section of the Jenkinsfile, which are entered according to operational requirements.`,
  PIPELINE_RUN_START_SI: 'Starts to run the pipeline...',
  PIPELINE_RUN_START_PL: 'Starts to run the pipelines...',
  // Run Records > Run Record Details > Details
  // Run Records > Run Record Details > Task Status
  BREAK: 'Rotura',
  PROCEED: 'Continuar',
  WAITING_FOR_INPUT: 'Espere entrada interactiva',
  CANCELLED_IN_REVIEW: 'Cancelado en la revisión',
  STEPS_COMPLETE_TOTAL: 'Steps: {complete}/{total}',
  // Run Records > Run Record Details > Commits
  COMMIT_PL: 'Commits',
  AUTHOR: 'Author',
  NO_COMMIT_FOUND: 'Sin registros de commits',
  // Run Records > Run Record Details > Artifacts
  ARTIFACT_PL: 'Artefactos',
  NO_ARTIFACT_FOUND_TIP: 'No hay registro de artefactos.',
  SIZE: 'Tamaño',
  // Run Records > Run > Set Parameters
  // Branches
  BRANCH_SI: 'Branch',
  BRANCH_PL: 'Branches',
  SCAN_REPOSITORY: 'Escanear repositorio',
  PIPELINE: 'Pipeline',
  NO_BRANCHES_FOUND: 'No Branches Found',
  // Branches > Code Check
  CODE_CHECK: 'Código de calidad',
  BUG_PL: 'Bugs',
  VULNERABILITY_PL: 'Vulnerabilidad de código',
  CODE_SMELL_PL: 'Code Smells',
  CODE_LINE_COUNT: 'Líneas de código',
  COVERAGE: 'Cobertura',
  TEST_RESULTS: 'Resultado de la prueba',
  ISSUE_PL: 'Problemas',
  CRITICAL: 'Critical',
  MAJOR: 'Major',
  MINOR: 'Minor',
  DISPLAY_ALL: 'Mostrar todo',
  DISPLAY_ONLY_LAST_TEN: 'Mostrar solo los últimos 10',
  LINE_VALUE: 'Número de línea: {value}',
  PASSED: 'Pasado',
  // Pull Requests
  PULL_REQUEST_PL: 'Pull Requests',
  FAILED_CHECK_SCRIPT_COMPILE:
    'The check of script compile failed, if you want to bypass the step, please click the continue button',
};
