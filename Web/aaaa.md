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

* ``Usuario administrador o root:`` El usuario root tiene la posibilidad de realizar todo tipo de labores respecto a la administración del sistema.

* ``Usuario Normal:`` Los usuarios normales o no administradores, son aquellos que pueden utilizar las herramientas del sistema con normalidad, pero que no pueden ejecutar labores administrativas. Son aquellos con los que realizamos las tareas más comunes.

Cuando ingresamos a un sistema Linux lo hacemos con un usurio normal y su contraseña, con este usuario es con el que trabajaremos normalmente, pero cuando
nos sea necesario realizar algún cambio en el sistema, como por ejemplo instalar un programa nuevo, lo tendremos que hacer a traves de un usuario 
Administrador o root.

Podemos realizar estos cambios del sistema de dos formas:

* La primera opción es convertirse en root, para ello utilizando el siguiente comando y proporcionando nuestra contraseña, nuestro usuario pasará
a ser root y por tanto tendrá los máximos privilegios del sistema.

    sudo su

* La segunda opción es ejecutar la acción como superusurio, pero sin dejar de ser un Usuario normal. Para ello,
  simplemente ejecutamos el comando ``sudo`` delante del comando que vamos a ejecutar como superusuario.
  
    sudo whoami

Como veis ``whoami`` nos reporta nuestro Usurio actual, en este caso el usurio normal, pero al utilizar el comando ``sudo``, podemos ver
como nos devuelve el resultado ``root`` cuando aún estamos como el Usuario normal. Esto se debe a que hemos ejecutado el comando ``whoami`` como
root pero sin tener que cambiar de usuario.

En las dos situaciones el sistema nos pedira una contraseña para confirmar que tenemos acceso.
  
