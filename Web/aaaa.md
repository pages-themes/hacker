    sudo su
    
 

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

## Tipos de Usuarios.

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
  
  
    whoami
  
  
    sudo whoami


Como veis ``whoami`` nos reporta nuestro Usurio actual, en este caso el usurio normal, pero al utilizar el comando ``sudo``, podemos ver
como nos devuelve el resultado ``root`` cuando aún estamos como el Usuario normal. Esto se debe a que hemos ejecutado el comando ``whoami`` como
root pero sin tener que cambiar de usuario.

En las dos situaciones el sistema nos pedira una contraseña para confirmar que tenemos acceso.
  
## Superusuario o root:

Ser `root` en el sistema es como ser dios, nos permirita realizar cualquier tipo de cambio a nivel de sistema y por tanto, debemos de tener cuidado
con su uso. Es recomendable volver al usuario normal tras terminal las tareas realizadas como root al igual que establecer una contraseña segura.

Como veís, ``para poder realizar el cambio de usuario normal a usuario root, se necesitarán permisos de administración``, y se puede acceder ya sea proporcionando la contraseña del usuario root e iniciando sesión, o establecer una lista de usuarios que pueden tener acceso como administradores.

En términos de seguridad, es recomendable optar por establecer una lista de usuarios con permisos, debido a que compartir la contraseña del usuario
root con varias personas, implica el traspaso de información sensible y pone al sistema en una situación de vulnerabilidad.

# Gestión de Grupos:

Los grupos en Linux son usados principalmente para otorgar permisos sobre archivos y directorios. El sistema operativo ya trae incluido ciertos grupos predeterminados que cumplen con funciones específicas. Cada grupo creado en Linux tiene la característica de ser independiente de otros. Además, los grupos en Linux pueden tener contraseñas. Estos grupos pueden ser de tipo primario o secundario:

* ``Grupo principal``: Tiene la función de determinar quién será el grupo que posea los archivos creados por el usuario. El grupo primario es el que se le asocia a la cuenta por defecto, y al que se le asignarán los archivos y directorios desarrollados por el usuario. Además, el nombre del grupo suele ser el mismo nombre de usuario.

* ``Grupos secundarios``: Los grupos suplementarios son aquellos grupos adicionales a los que el usuario pertenezca.

# Comandos para la gestión de usuarios y grupos en Linux

* ``adduser`` o ``useradd``: Permite la creación de nuevos usuarios.
* ``usermod``, ``chfn``, ``chsh`` y ``chage``: Usados para la modificación de un usuario.
* ``deluser`` o ``userdel``: Comando para la eliminación de usuarios.
* ``passwd``: Para cambiar la contraseña de un usuario.
* ``addgroup`` o ``groupadd``: Usado para añadir un grupo.
* ``groupmod``: Permite modificar un grupo.
* ``groupdel`` o ``delgroup``: Se utiliza para eliminar un grupo.
* ``gpasswd``: Comando diseñado para cambiar la contraseña de un grupo.
* ``whoami``: Para saber qué usuario somos.
* ``groups``: Para obtener información de los grupos a los que pertenecemos.
* ``id``: Nos muestra tanto el usuario como los grupos.
* ``su``: Comando para cambiar de usuario.
* ``who`` o ``w``: Sirve para saber cuáles usuarios están conectados en la máquina en un determinado momento.
* ``write`` o ``wall``: Para enviar mensajes de al resto de usuarios logueados.

