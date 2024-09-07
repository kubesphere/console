/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  PROJECT_DESC:
    'Los proyectos se agruparán por sus recursos, que puedes ver y administrar por proyecto.',
  SYSTEM_PROJECTS: 'Proyectos de Sistema',
  USER_PROJECTS: 'Proyectos de usuario',
  // List
  EMPTY_WRAPPER: 'No se ha encontrado {resource}',
  TERMINATING: 'Terminating',
  ACTIVE: 'Activo',
  // List > Assign Workspace
  PROJECT_ADMINISTRATOR: 'Gestor de proyecto',
  PROJECT_ADMINISTRATOR_DESC:
    'Selecciona un usuario del espacio de trabajo como administrador del proyecto.',
  PROJECT_ASSIGN_DESC:
    'Una vez que el proyecto se asigna a un espacio de trabajo ya no se puedes cambiar.',
  // List > Create
  CREATE_PROJECT_DESC:
    'Un proyecto es un namespace de Kubernetes en KubeSphere, que proporciona un mecanismo para organizar los recursos en un espacio de trabajo.',
  PROJECT_NAME_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de caracteres se establece en 63.',
  PROJECT_NAME_INVALID_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de caracteres se establece en 63.',
  CANCEL: 'Cancelar',
  CREATE_NAME: 'Crear {name}',
  DESCRIPTION: 'Descripción',
  NAME_VALIDATION_FAILED:
    'Evite de crear nombre con el kube- del prefijo, puesto que es reservado para los namespaces del sistema de Kubernetes',
  PROJECT_NAME_EXIST_DESC:
    'The name already exists. Please enter another name. Project names must be unique on the entire platform.',
  NAME_EMPTY_DESC: 'Introduce el nombre',
  OK: 'Okay',
  NAME_DESC:
    'Solo puede contener letras minúsculas, números y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de carácteres se establece en 63.',
  DESCRIPTION_DESC:
    'La descripción se agregará al elemento como un comentario y se mostrará en los detalles de la aplicación. La descripción está limitada a 1000 caracteres.',
  ALIAS_DESC:
    'El alias puede estar compuesto de cualquier carácter para ayudar a distinguir mejor los recursos. La longitud máxima de carácteres se establece en 63.',
  // List > Edit Information
  EDIT_INFORMATION: 'Editar información',
  // List > Delete
  DELETE_TITLE_SI: '¿Seguro que deseas eliminar {type}?',
  DELETE_TITLE_PL: '¿Seguro que deseas eliminar {type}?',
  DELETE: 'Eliminar',
  PROJECT_LOW: 'project',
  DELETED_SUCCESSFULLY: 'Deleted successfully.',
  STOP_SUCCESS_DESC: 'Stopped successfully.',
  DELETE_RESOURCE_TYPE_DESC_SI:
    'Introduce el {type} nombre <strong>{resource}</strong> para asegurarte de comprender los riesgos asociados con la operación.',
  DELETE_RESOURCE_TYPE_DESC_PL:
    'Introduce el {type} nombre <strong>{resource}</strong> para asegurarte de comprender los riesgos asociados con la operación.',
  DELETE_RESOURCE_TYPE_DESC_GW:
    'Introduce el {type} nombre <strong>{resource}</strong> para asegurarte de comprender los riesgos asociados con la operación.',
};
