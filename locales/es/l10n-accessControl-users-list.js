/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

module.exports = {
  // Banner
  USER_DESC:
    'Este módulo permite al administrador del sistema administrar cuentas, como crear / actualizar / leer / eliminar una cuenta. El administrador también puedes administrar el rol de cada cuenta. Los usuarios pueden iniciar sesión en la plataforma a través de su nombre de cuenta o dirección de correo electrónico.',
  USER_PL: 'Usuarios',
  // List
  NOT_LOGIN_YET: 'Not Logged in yet',
  USER_EMPTY_DESC: 'Please create a user.',
  USER_ACTIVE: 'Activo',
  USER_AUTHLIMITEXCEEDED: 'Login Restricted',
  USER_PENDING: 'Pendiente',
  USER_DISABLED: 'Deshabilitado',
  LAST_LOGIN: 'Última hora de inicio de sesión',
  // List > Create
  USERNAME_DESC:
    'Solo puede contener letras minúsculas, números ,puntos y guiones ("-"), y debe comenzar con una letra minúscula y terminar con un número o letra minúscula. La longitud máxima de carácteres se establece en 32.',
  PASSWORD_DESC:
    'The password must contain at least one number, one lowercase letter, one uppercase letter, and one special character (~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? or space). The length must be 8 to 64 characters.',
  PASSWORD_INVALID_DESC:
    'Invalid password. The password must contain at least one number, one lowercase letter, and one uppercase letter. The length must be 8 to 64 characters.',
  PLATFORM_ROLE_DESC:
    'Los tipos de roles se clasifican en clúster y proyecto. La función de tipo de clúster se utiliza para administrar el clúster.',
  USER_SETTING_EMAIL_DESC: 'El correo electrónico se utiliza para iniciar sesión.',
  USERNAME_EXISTS: 'El ombre de usuario ya existe',
  USERNAME_EMPTY_DESC: 'Por favor introduce el nombre de usuario',
  PLATFORM_ROLE: 'Platform Role',
  CREATE_USER: 'Agregar usuario',
  EMAIL: 'Email',
  EMAIL_EXISTS: 'EL email ya existe',
  USERNAME_INVALID: 'Nombre de usuario no válido. {message}',
  USERNAME: 'Nombre de usuario',
  PASSWORD: 'Contraseña',
  // List > Edit
  EDIT_USER: 'editar usuario',
  // List > Delete
  USER_LOW: 'User',
  DELETING_CURRENT_USER_NOT_ALLOWED: 'The current user cannot be deleted.',
  // ListLayout -> NavTitle
  USER_AND_ROLE: 'Users and Roles',
};
