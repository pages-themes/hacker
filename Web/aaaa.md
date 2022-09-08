# Gestión de Usuarios y Grupos en Linux.

El sistema operativo Linux cuenta con un gran capacidad de gestión de usuarios y grupos que le permite realizar un uso óptimo
de su ``plataforma multiusuario``.

Quienes utilizan este servidor se identifican mediante un ``nombre de usuario``, y también debe contar con una ``contraseña`` para que pueda
realizar la verificación de credenciales y acceder al sistema.

Además, el acceso a determinados archivos, directorios y ficheros dependerá de los grupos a los que pertenezca el usuario del sistema.

# Usuarios en Linux.

Los usuarios son una de las piezas claves en cualquier sistema Linux ya que ``con ellos iniciamos sesión y podremos realizar tareas
en base a los permisos`` que han sido asignados ``(administración, lectura, escritura)`` y en base a ello estos usuarios tendrán cierta autoridad
en el sistema.

En los sistemas que toman por base la interfaz GNU/Linux o Unix existen dos tipos de usuarios: el ``administrador o root``, y los demás ``usuarios``:

* ``Usuario administrador o root:`` el usuario root tiene la posibilidad de realizar todo tipo de labores respecto a la administración del sistema. Los cambios o modificaciones realizados con este usuario pueden causar inconvenientes en la seguridad del sistema, por lo que debemos tener en cuenta como utilizar este root solo cuando sea estrictamente necesario llevar a cabo una tarea de administración, y cuando terminemos, debemos volver a trabajar con nuestro usuario normal. Además, se sugiere que para acceder al usuario administrador, primero se haya iniciado sesión a través de una cuenta de usuario normal, esta medida previene trabajar con root de manera predeterminada.

* ``Usuario Normal:`` los usuarios normales o no administradores, son aquellos que pueden utilizar las herramientas del sistema con normalidad, pero que no pueden ejecutar labores administrativas. Son aquellos con los que realizamos las tareas más comunes.


